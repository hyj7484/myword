import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { FlipView, Test } from '../template';
import axios from 'axios'

import './css/word.css';

export default function Word(props) {
  const wordbookId = useRouteMatch("/word/look/:wordbookId").params.wordbookId;
  const [words, setWords] = useState(null)
  const [test, setTest] = useState(null)
  const [msg, setMsg] = useState(null)
  const history = useHistory();

  const clickExit = () => {
    setTest(null)
  }

  useEffect(()=>{
    if(props.user == null){
      history.push('/');
    }else{
      const url = "/api/word/get"
      const option = {
        id : props.user.id,
        wordbookId : wordbookId
      }
      axios.post(url, option)
      .then(req => req.data && setWords(req.data))
    }
  }, [])


  const getWord = () => {
    const url = "/api/word/get"
    const option = {
      id : props.user.id,
      wordbookId : wordbookId
    }
    axios.post(url, option)
    .then(req => req.data && setWords(req.data))
  }

  const words_view = () => {
    const view = words ? words.map((list, index) => {
      const style = {
        width : "220px",
        height : "120px",
        fontSize : "20px",
        float : "left",
        margin : "15px 20px",
      }
      const textStyle = {
        border:"1px solid black",
        backgroundColor : "rgba(255, 255, 255, 0.5)"
      }
      return (
        <div key={index}>
        <FlipView word={list} style={style} textStyle={textStyle} getWord={getWord}/>
        </div>
      )
    })
    : null

    return view
  }

  const clickWordTest = () => {
    const data = {
      data : null,
      text : null,
      list : [],
      question : null,
      answer : null,
      asnwerData : "",
    }
    const handleAnswer = (e) => {
      data.answer = e.target.value;
      if(data.answer != null || data.question != null){
        document.getElementById('word_test_text_selectErr').value = ""
        return
      }
    }
    const handleQuestion = (e) => {
      data.question = e.target.value;
      if(data.answer != null || data.question != null){
        document.getElementById('word_test_text_selectErr').value = ""
        return
      }
    }


    const clickSelectEnter = () => {
      const handleInput_Answer = (e) =>{
        data.answerData = e.target.value
      }
      const handleInput_KeyEnter = (e) => {
        if(e.key === "Enter"){
          clickEnterQuestion();
        }
      }
      const clickEnterQuestion = () => {
        if(data.list[0][data.answer] == data.answerData) {
          console.log("O")
        }else{
          console.log("X")
        }
      }
      if(data.answer == null || data.question === null){
        document.getElementById('word_test_text_selectErr').value = "두가지 모두 선택해 주세요."
        return
      }else if(data.answer === data.question){
        document.getElementById('word_test_text_selectErr').value = "두가지 항목을 다른 항목을 선택해 주세요."
        return
      }else{
        setTest(
          <>
            <Test Exit={clickExit} words={data.list} option={data}/>
          </>
        )
      }
    }
    const clickEnter = () => {
      if(data.data === ""){
        return;
      }
      data.list = []
      const num = []
      for(let i = 0; i < data.data; i++){
        const number = Math.floor(Math.random() * words.length);
        if(num.indexOf(number) != -1){
          console.log(num)
          console.log(data.list)
          console.log(i)
          i--;
        }else{
          num.push(number)
          data.list.push(words[number])
        }
      }
      setTest(
        <div className="word_test_Main">
          <div className="word_test_content">
            <div className="Exit_Div" style={{backgroundColor:"rgba(221, 105, 219, 0.5)"}}> <button className="Exit" onClick={clickExit}> X </button> </div>
            <h2> 테스트할 단어 유형을 선택해 주세요. </h2>
            <h3> 테스트할 단어개수 : {data.data} </h3>
            <div className="word_test_select">
              <h4> 문제 유형 </h4>
              <label><input type="radio" name="question" onChange={handleQuestion} className="word_test_select_question" value="kor"/> 한국어 </label>
              <label><input type="radio" name="question" onChange={handleQuestion} className="word_test_select_question" value="jp1"/> 한자 </label>
              <label><input type="radio" name="question" onChange={handleQuestion} className="word_test_select_question" value="jp2"/> 요미가나 </label>
            </div>
            <div className="word_test_select">
              <h4> 정답 작성 유형 </h4>
              <label> <input type="radio" name="answer" onChange={handleAnswer} className="word_test_select_answer" value="kor"/> 한국어 </label>
              <label> <input type="radio" name="answer" onChange={handleAnswer} className="word_test_select_answer" value="jp1"/> 한자 </label>
              <label> <input type="radio" name="answer" onChange={handleAnswer} className="word_test_select_answer" value="jp2"/> 요미가나 </label>
            </div>
            <div>
              <button className="word_test_Btn" onClick={clickSelectEnter}> 확인 </button>
              <input type="text" id="word_test_text_selectErr" className="word_test_text_err" disabled />
            </div>
          </div>
        </div>
      )

    }
    const handleInput = (e) => {
      if(e.target.value * 1 > words.length){
        e.target.value = words.legnth;
        const dom = document.getElementById('word_test_text')
        dom.value = words.length + "(등록된 단어수) 보다 적은수를 입력해 주세요."
      }else{
        data.text = null;
      }
      data.data = e.target.value * 1
    }
    const handleKey = (e) => {
      if(e.key === "Enter" && e.target.value != ""){
        clickEnter()
      }
    }
    setTest(
      <div className="word_test_Main">
        <div className="word_test_content">
          <div className="Exit_Div" style={{backgroundColor:"rgba(221, 105, 219, 0.5)"}}> <button className="Exit" onClick={clickExit}> X </button> </div>
          <div className="word_test_content_div">
             <h2> 테스트 할 단어 갯수를 입력해 주세요. </h2> <br/>
             <h4> 단어 갯수 : {words.length} </h4>
            <input type="number" className="word_test_text_input" onChange={handleInput} onKeyPress={handleKey}/> <br/>
            <input type="text" id="word_test_text" className="word_test_text_err"disabled/> <br/>
            <button className="word_test_Btn" onClick={clickEnter}> 확인 </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="Word_Main">
      {test}
      <div className="Word_Top">
        <button className="Word_Btn" onClick={clickWordTest}> 단어 테스트 </button>
      </div>
      <div className="Word_Content">
      {words_view()}
      </div>
    </div>
  )
}
