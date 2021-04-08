import React from 'react';
import { Link } from 'react-router-dom';

import "./css/Logo.css";

export default function Logo(props){
  const setMenu = props.view;
  const clickMenu = () => {
    setMenu();
  }

  return (
    <div className="Logo_Main">
      <div className="Logo_MenuBtn Logo_div" >
        <a onClick={clickMenu}> Menu </a>
      </div>
      <div className="Logo_MainLogo Logo_div">
        <Link to="/Home"> My Word </Link>
      </div>
      <div className="Logo_Link Logo_div">
        <ul className="Logo_ul">
          <li> <Link to='/Word/input'> 단어추가 </Link> </li>
          <li> <Link to='/Word/View'> 단어보기 </Link> </li>
        </ul>
      </div>
    </div>
  )
}
