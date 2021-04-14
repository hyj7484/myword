import React from 'react';
import {Link} from 'react-router-dom';
import "./css/menu.css";

export default function Menu(props){
  const setMenu = props.setMenu;
  const getMenu = props.getMenu;
  return (
    <div className="Menu_Main Menu">
      <div className="Menu_color Menu">
      <ul className="Menu_List Menu">
        <li> <Link to="/test" onClick={()=>{if(getMenu())setMenu()}}> 단어테스트 </Link> </li>
        <li> 2 </li>
        <li> 3 </li>
        <li> 4 </li>
        <li> 5 </li>
      </ul>
      </div>
    </div>
  )
}
