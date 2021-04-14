import React, { useState } from 'react';
import "./css/addWordBook.css";
import axios from 'axios';

const data = {
   wordbook : null,
   user : null,
}
const handleWord = (event) => {
  data.wordbook = event.target.value;
}

export default function AddWordBook(props){
  const setWordBook = props.setWordBook;
  data.user = props.user.id;

  const clickAddbook = () => {
    const url = '/api/wordbook/addWordBook';
    const option = data;
    console.log(option);
    axios.post(url, option)
    .then(req => {
      if(req.data) ;
        setWordBook(data.wordbook);
    })
  }

  return (
    <div className="addWordBook">
      <div style={{width:"100%", height:"50px"}}>
        <div style={{display:"block", float:"right", width:"50px"}}> <button style={{width:"50px"}} onClick={setWordBook}> 닫기 </button>  </div>
      </div>
      <div style={{width:"100%", textAlign:"center"}}>
        <table style={{width:"50%", margin : "0 auto"}}>
          <thead>
            <tr style={{height:"80px"}}>
              <td colSpan="2"> 단어장 추가 </td>
            </tr>
          </thead>
          <tbody>
            <tr className="addWordBook_content">
              <td>
                단어장
              </td>
              <td>
                <input type="text" onChange={handleWord}/>
              </td>
            </tr>
            <tr className="addWordBook_content">
              <td colSpan="2"> <button onClick={clickAddbook}> 추가하기 </button> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
