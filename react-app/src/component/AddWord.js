import React, {useState, useEffect} from 'react';
import "./css/addword.css";
import axios from 'axios';

const data = {
  kor : null,
  jp1 : null,
  jp2 : null,
  user : null,
  wordbook : null,
}
const dom = {
  kor : null,
  jp1 : null,
  jp2 : null,
}

const handleKor = (event) => {
  data.kor = event.target.value;
  if(dom.kor == null)
    dom.kor = event.target;
}
const handleJp1 = (event) => {
  data.jp1 = event.target.value;
  if(dom.jp1 == null)
    dom.jp1 = event.target;
}
const handleJp2 = (event) => {
  data.jp2 = event.target.value;
  if(dom.jp2 == null)
    dom.jp2 = event.target;
}
const handleWord = (event) => {
  data.wordbook = event.target.value;
}

export default function AddWord(props){
  const [wordBook, setWordBook] = useState(null);
  useEffect(()=>{
    const url = '/api/wordbook/getWordBooks';
    const option = {
      user : user.id
    }
    axios.post(url, option)
    .then(req => {
      data.wordbook = req.data[0].wordbook;
      setWordBook(req.data);
    })
  },[]);
  useEffect(()=>{
  },[wordBook]);

  const user = props.user;
  const setWordBookState = props.setWordBook;

  const addClick = () => {
    const url = '/api/word/add';
    const option = {
      ...data,
      user : user.id
    };

    axios.post(url, option)
    .then(req => {
      dom.kor.value = null;
      dom.jp1.value = null;
      dom.jp2.value = null;
    })
  }

  const view_wordBook = () => {
    if(wordBook != null){
      return (
        <>
        <td> 단어장 </td>
        <td>
        <select onChange={handleWord} style={{width:"150px"}}>
          {wordBook.map((list, index) => {
            return <option value={list.wordbook} key={index}> {list.wordbook} </option>
          })}
        </select>
        </td>
        </>
      )
    }
    return
      <td colSpan="2">
      <span style={{color:"red"}}> 단어장을 추가해 주세요. </span>
      <button onClick={setWordBookState}> 추가 </button>
      </td>;
  }

  return (
    <div className="word_Main" style={{paddingTop:"50px"}}>
      <div className="word_Table" style={{width:"60%", height:"300px", margin : "0 auto", border : "1px solid black"}}>
        <table style={{width:"50%", margin:"0 auto", paddingTop:"30px", textAlign:"center"}}>
          <thead>
            <tr style={{height:"50px"}}>
              <td colSpan="2"> 단어추가 </td>
            </tr>
          </thead>
          <tbody>
            <tr className="word_content">
              {view_wordBook()}
            </tr>
            {wordBook != null &&
              <>
            <tr className="word_content">
              <td> 한글 </td>
              <td> <input className="word_Add_Input" type="text" onChange={handleKor} /> </td>
            </tr>
            <tr className="word_content">
              <td> 한자 </td>
              <td> <input className="word_Add_Input" type="text" onChange={handleJp1} /> </td>
            </tr>
            <tr className="word_content">
              <td> 요미가나 </td>
              <td> <input className="word_Add_Input" type="text" onChange={handleJp2} /> </td>
            </tr>
            <tr style={{height:"30px"}}>
              <td colSpan="2"> <button onClick={addClick}> 추가하기 </button> </td>
            </tr>
            </>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
