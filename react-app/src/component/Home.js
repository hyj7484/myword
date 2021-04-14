import React from 'react';
import './css/home.css';
import { WordBookList, Papago } from "../template";

export default function Home(props){
  console.log(props);
  return (
    <div className="Home_Main">
      <div className="Home_Content">
        <div className="Home_wordSearch">
          <Papago />
        </div>
        <div className="Home_Contet_select">
          <div className="Home_WordBookList">
            <WordBookList user={props.user} word={props.data}/>
          </div>
        </div>
      </div>
    </div>
  )
}
