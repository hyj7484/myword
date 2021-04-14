import React from 'react';
import { Link } from 'react-router-dom';

import "./css/Logo.css";

export default function Logo(props){
  const setMenu = props.setMenu;
  const getMenu = props.getMenu;
  const setWord = props.setWord;
  const clickMenu = () => {
    setMenu();
  }

  return (
    <div className="Logo_Main">
      <div className="Logo_MenuBtn Logo_div" >
        <a onClick={clickMenu}> Menu </a>
      </div>
      <div className="Logo_MainLogo Logo_div">
        <Link to='/' onClick={()=>{if(getMenu())setMenu()}}> My Word </Link>
      </div>
      <div className="Logo_Link Logo_div">
        <ul className="Logo_ul">
          <li> <Link to='/Word/input' onClick={()=>{if(getMenu())setMenu()}}> 단어추가 </Link> </li>
          <li> <a onClick={setWord}> 단어장추가 </a> </li>
        </ul>
      </div>
    </div>
  )
}
