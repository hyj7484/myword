import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Logo } from './template';
import { Home, Login, Sign, Word } from './component';

import './App.css';

function App(props) {
  const [menuBar, setMenuBar] = useState(false);
  const [user, setUser] = useState(null)
  const [wordBooks, setWordBooks] = useState(null);
  const setMenu = () => {
    setMenuBar(!menuBar);
  }
  const getMenu = () => {
    return menuBar
  }
  useEffect(()=>{
    localStorage.getItem('user') && setUser(JSON.parse(localStorage.getItem('user')));
  }, [])
  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(user));
  }, [user])
  return (
    <div className="App">
      <Router>
      {user != null && <Logo user={user} setUser={setUser} getMenu={getMenu} setMenu={setMenu} setWordBooks={setWordBooks} wordBooks={wordBooks}/>}
      <div className="App_Content">
        <Switch>
          <Route path="/sign" exact>
            <Sign />
          </Route>
          <Route path="/word/look/:wordbook" exact>
            <Word user={user}/>
          </Route>
          <Route path="/" exact>
            {user != null ?
              <Home user={user} wordBooks={wordBooks} setWordBooks={setWordBooks} getMenu={getMenu} setMenu={setMenu}/>
              :
              <Login setUser={setUser}/>}
          </Route>
          <Route path="*">
            No Page
          </Route>

        </Switch>
      </div>
      </Router>
    </div>
  )
}

export default App;
