import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Logo, Menu, AddWordBook} from './template';
import { Home, AddWord, Login, Sign, WordBook, Test } from './component';

import './App.css';

function App(props) {
  const [menuBar, setMenuBar] = useState(false);
  const [user, setUser] = useState(null)

  const setMenu = () => {
    setMenuBar(!menuBar);
  }


  return (
    <div className="App">
      <Router>
        <Switch>
          {user != null && <Logo user={user} setMenu={setMenu}/>}
          <Route path="/sign" exact>
            <Sign />
          </Route>
          <Route path="/" exact>
            {user != null ? <Home user={user}/> : <Login setUser={setUser}/> }
          </Route>
          <Route path="*">
            No Page
          </Route>
        </Switch>
      </Router>
    </div>
  )
  //
  // const [view, setView] = useState({
  //   menu : false,
  //   wordBook : false,
  //   word : null,
  // });
  // useEffect(()=>{
  //   console.log(view);
  //   console.log("useEffect");
  // }, []);
  // useEffect(()=>{
  //   console.log("view change");
  // }, [view]);
  //
  // const addUser = (data) => {
  //   setUser(data);
  // }
  // const setWordBook = (argWord) => {
  //   const word = typeof argWord === "string" ? argWord : null;
  //
  //   setView({
  //     ...view,
  //     wordBook : !view.wordBook,
  //     word : word
  //   })
  // }
  // const setMenu = () => {
  //   setView({
  //     ...view,
  //     menu : !view.menu
  //   })
  // }
  // const getMenu = () => {
  //   return view.menu
  // }
  //
  // return (
  //   <div className="App">
  //     <Router>
  //       {user.name != null && <Logo setMenu={setMenu} setWord={setWordBook} getMenu={getMenu}/>}
  //       {view.menu && <Menu setMenu={setMenu} getMenu={getMenu}/>}
  //       <div className="Content">
  //       {view.wordBook && <AddWordBook user={user} setWordBook={setWordBook}/>}
  //       <Switch>
  //         <Route path="/sign" exact>
  //           <Sign />
  //         </Route>
  //         <Route path="/" exact>
  //           {user.name != null ? <Home user={user} data={view.word}/> : <Login setUser={addUser}/>}
  //         </Route>
  //         <Route path="/Word/input" exact>
  //           <AddWord user={user} setWordBook={setWordBook}/>
  //         </Route>
  //         <Route path="/word/look/:wordbook" exact>
  //           <WordBook user={user}/>
  //         </Route>
  //         <Route>
  //           <Test user={user}/>
  //         </Route>
  //         <Route path="*" >
  //           Null
  //         </Route>
  //       </Switch>
  //       </div>
  //     </Router>
  //   </div>
  // );
}

export default App;
