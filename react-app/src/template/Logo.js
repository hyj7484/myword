import React, {useState, useEffect} from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios';

import "./css/Logo.css";



export default function Logo(props){
  const [addData, setAddData] = useState(null);
  const [errView, setErrView] = useState(null);
  const [selectWordBook, setSelectWordBook] = useState(null);

  const setMenu = props.setMenu;
  const getMenu = props.getMenu;
  const wordBooks = props.wordBooks;

  const setWordBooks = props.setWordBooks;
  const history = useHistory();
  const clickLogout = () => {
    localStorage.setItem('user', null);
    props.setUser(null)
    setMenu();
    history.push('/')
  }

  const addWord = () => {
    if(wordBooks.length == 0){
      addWordBook_View();
      return
    }

    if(selectWordBook == null && wordBooks.length != 0){
      setSelectWordBook(wordBooks[0].id)
    }
    const wordData = {
      id : props.user.id,
      wordbookId : selectWordBook == null ? wordBooks[0].id : selectWordBook,
      kor : "",
      jp1 : "",
      jp2 : "",
    }
    console.log(wordData)
    const handlewordBook = (e) => {
      setSelectWordBook(e.target.value)
      wordData.wordbookId = e.target.value;
    }
    const handleKor = (e) => {
      wordData.kor = e.target.value;
    }
    const handleJp1 = (e) => {
      wordData.jp1 = e.target.value;
    }
    const handleJp2 = (e) => {
      wordData.jp2 = e.target.value;
    }
    const clickExit = () => {
      setAddData(null);
    }

    const clickAdd = () => {
      console.log(wordData)
      if(wordData.id != null){
        if(wordData.kor == "" || wordData.jp1 == "" || wordData.jp2 == ""){
          const clickErr = () => {
            setErrView(null)
          }
          setErrView(
            <div className="Err_Main" >
              <div className="Err_Content">
                <div className="Err_Text">
                  <div style={{color:"red", margin:"10px auto"}}> 빈칸을 채워주세요. </div>
                  <button onClick={clickErr}> 확인 </button>
                </div>
              </div>
            </div>
          )
          return;
        }
        const url = "/api/word/add";
        axios.post(url, wordData)
        .then(req => setAddData(null))
      }
    }

    const wordList_View = () => {
      const view = wordBooks.map((list, index)=>{
        return (
          <option value={list.wordbook} key={index} selected={list.wordbook == selectWordBook}> {list.wordbook} </option>
        )
      })
      return view;
    }

    setAddData(
      <div className="Logo_AddWord_Main">
      <div className="Exit_Div" style={{backgroundColor:"rgb(202, 136, 222)"}}> <button className="Exit" onClick={clickExit}> X </button> </div>
        <div className="Logo_AddWord_Content">
          <div>
          <table style={{width:"60%",margin:"0 auto"}}>
            <thead>
              <tr>
                <td colSpan="2" style={{textAlign:"center", height:"100px"}}> <h2> 메모추가 </h2> </td>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td className="Logo_AddWord_Info"> <span> 단어장 </span> </td>
              <td className="Logo_AddWord_Data">
                <select onChange={handlewordBook}>
                  {wordList_View()}
                </select>
              </td>
            </tr>
            <tr>
              <td className="Logo_AddWord_Info"> <span> 한국어 </span> </td>
              <td className="Logo_AddWord_Data" onChange={handleKor}> <input type="text" className="Logo_AddWord_Input"/> </td>
            </tr>
            <tr>
              <td className="Logo_AddWord_Info"> <span> 한자 </span></td>
              <td className="Logo_AddWord_Data" onChange={handleJp1}> <input type="text" className="Logo_AddWord_Input"/> </td>
            </tr>
            <tr>
              <td className="Logo_AddWord_Info"> <span> 요미가나 </span> </td>
              <td className="Logo_AddWord_Data" onChange={handleJp2}> <input type="text" className="Logo_AddWord_Input"/> </td>
            </tr>
            </tbody>
          </table>
          <div className="Logo_AddWord_Btn_Div">
            <button className="Logo_AddWord_Btn" onClick={clickAdd}> 추가하기 </button>
          </div>
          </div>
        </div>
      </div>
    )

  }

  const addWordBook_View = () => {
    const text = null
    const wordBookData = {
      id : props.user.id,
      wordbook : "",
    }
    const handleAddWordBook = (e) => {
      wordBookData.wordbook = e.target.value;
    }
    const clickExit = () => {
      setAddData(null);
    }
    const sendWordBook = () => {
      if(wordBookData.id != null){
        if(wordBookData.wordbook == ""){
          const clickErr = () => {
            setErrView(null)
          }
          setErrView(
            <div className="Err_Main" >
              <div className="Err_Content">
                <div className="Err_Text">
                  <div style={{color:"red", margin:"10px auto"}}> 빈칸을 채워주세요. </div>
                  <button onClick={clickErr}> 확인 </button>
                </div>
              </div>
            </div>
          )
          return;
        }
        const url = "/api/wordbook/addWordBook";
        axios.post(url, wordBookData)
        .then(req => {
          const url2 = "/api/wordbook/getWordBooks";
          const option = {
            id : props.user.id
          }
          axios.post(url2, option)
          .then(reqs => {
            reqs.data ? setWordBooks(reqs.data) : console.log(reqs.data)
            setAddData(null)
          })
        })
      }
    }
    setAddData(
      <div className="Logo_AddWordBook_Main">
        <div className="Exit_Div" style={{backgroundColor:"rgb(202, 136, 222)"}}> <button className="Exit" onClick={clickExit}> X </button> </div>
        <div style={{textAlign:"center", width:"100%", color:"red"}}> {text} </div>
        <div className="Logo_AddWordBook_Content">
          <h2> 단어장 추가 </h2>
          <input type="text"  className="Logo_AddWordBook_Input" onChange={handleAddWordBook}/> <br/>
          <button className="Logo_AddWordBook_Btn" onClick={sendWordBook}> 추가하기 </button>
        </div>
      </div>
    )
  }

  return (
    <div className="Logo_Main">
      {errView}
      {addData}
      <div className="Logo_MenuBtn Logo_div" >
        <a onClick={clickLogout}> Logout </a>
      </div>
      <div className="Logo_MainLogo Logo_div">
        <Link to='/' onClick={()=>{if(getMenu())setMenu()}}> My Word </Link>
      </div>
      <div className="Logo_Link Logo_div">
        <ul className="Logo_ul">
          <li> <a onClick={addWord}> 단어추가 </a> </li>
          <li> <a onClick={addWordBook_View}> 단어장추가 </a> </li>
        </ul>
      </div>
    </div>
  )
}
