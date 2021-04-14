import React from 'react';
import './css/wordList.css';

import FlipView from './FlipView';

export default function WordList(props){
  const words = props.words;

  const view_words = () => {
    return words != null ? words.map((l, index)=>{
      return (
        <div className="WordList_Word_Content" key={index}>
          <FlipView word={l}/>
        </div>
      )
    }) : null;
  }

  return (
    <div className="wordList_Main">
    {view_words()}
    </div>
  )
}
