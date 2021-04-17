import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './css/WordBookList.css';


export default function WordBookList(props){
  const wordBooks = props.wordBooks;
  const setWordBooks = props.setWordBooks;
  const history = useHistory();
  const getMenu = props.getMenu;
  const setMenu = props.setMenu;
  useEffect(() => {
    const url = "/api/wordbook/getWordBooks";
    const option = {
      id : props.user.id
    }
    axios.post(url, option)
    .then(req => {
      req.data ? setWordBooks(req.data) : console.log(req.data)
    })
  }, [])

  const setWordBook_View = () => {
    const view = wordBooks != null ? wordBooks.map( (list, index) => {
      const onClickWordBook = () => {
        if(getMenu()) { setMenu() }
        history.push(props.wordurl || '/word/look/'+list.wordbook);
      }
      return (
        <div onClick={onClickWordBook}
          key = {index}
          style={{
            width:"200px",
            height:"100px",
            border:"1px solid black",
            margin : "10px 10px",
            float : "left",
            lineHeight : "100px",
            textAlign : "center",
          }}>
          {list.wordbook}
        </div>)
    }) : null;

    return view;
  }

  return (
    <div className="WordBookList_Main">
      {setWordBook_View()}
    </div>
  )
}
