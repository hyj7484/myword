import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Logo from './template/Logo';
import Menu from './template/Menu';

import { Home, Login } from './component';
import './App.css';

function App() {
  const [view, setView] = useState({
    menu : false,
  });
  const [user, setUser] = useState({
    name : null,
  })
  useEffect(()=>{
    console.log("use Effect");
  }, []);
  useEffect(()=>{
    console.log(view.menu);
  }, [view]);

  const setMenu = () => {
    setView({
      ...view,
      menu : !view.menu
    })
  }

  console.log("Call");
  return (
    <div className="App">
      <Router>
        {user.name != null && <Logo view={setMenu}/>}
        {view.menu && <Menu />}
        <div className="Content">
          {user.name != null ? <Home /> : <Login />}
        </div>
      </Router>
    </div>
  );
}

export default App;
