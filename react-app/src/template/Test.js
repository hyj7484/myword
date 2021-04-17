import React, {useState, useEffect} from 'react';
import './css/test.css'

const answer = {
  answer : "",
}
const handleAnswer = (e) => {
  answer.answer = e.target.value;
}

const falseAnswer = []

export default function Test(props){
  const [msg, setMsg] = useState(null);
  const [view, setView] = useState(null);
  const [gage, setGage] = useState(false);
  const [endView, setEndView] = useState(null);
  const words = props.words;
  const option = props.option;
  const exit = props.Exit;

  const endQuestion = () => {
    const reTestData = []
    const clickEndEnter = () => {
      setEndView(null)
      exit()
    }
    console.log(falseAnswer)
    setEndView(
      <div className="Test_End_Main">
        <div className="Test_End_Content">
          <div className="Test_End_FailWords">
            {falseAnswer.map((list, index) => {
              return (
                <div className="Test_End_word">
                  <h4> 문제 : {list[option.question]} </h4>
                  <h4> 정답 : {list[option.answer]} </h4>
                  <h4> 입력한 정답 : {list.inputAnswer} </h4>
                </div>
              )
            })}
          </div>
          <div>
            <button onClick={clickEndEnter}> 확인 </button>
          </div>
        </div>
      </div>
    )
  }

  const handleKeyEnter = (e) => {
    if(e.key === "Enter"){
      onClickEnter()
    }
  }

  const onClickEnter = () => {
    let time = 3;
    const timmer = setInterval(()=>{
      time--;
      if(time == 0){
        clearInterval(timmer)
        if(words.length > 1){
          words.splice(0, 1)
        }else{
          endQuestion()
        }
        setGage(false)
        setMsg(null)
      }
    }, 1000)
    setGage(true)
    if(answer.answer == words[0][option.answer]){
      setMsg(<> 정답입니다. </>)
    }else {
      console.log(words[0])
      const addData = {...words[0], inputAnswer : answer.answer}
      falseAnswer.push(addData)
      console.log(falseAnswer)
      setMsg(<> 틀렸습니다. <br/> 정답 : {words[0][option.answer]} </>)
    }
  }
  return (
    <div className="Test_Main">
      {endView}
      <div className="Test_Content">
        <div className="Test_Top">
          <div className="Exit_Div" style={{backgroundColor:"rgba(221, 105, 219, 0.5)"}}> <button className="Exit" onClick={exit}> X </button> </div>
        </div>
        <h2> 문제 </h2>
        <div className="Test_play_question">
          <h3> {words[0][option.question]} </h3>
        </div>
        <div className="Test_play_answer">
          <input type="text" onChange={handleAnswer} onKeyPress={handleKeyEnter}/>
        </div>
        <div className="Test_play_Btn_Dev">
          <button className="Test_play_Btn" onClick={onClickEnter}> 확인 </button>
        </div>
        <div className="Test_play_Msg">
          {msg}
        </div>
        {gage &&
          <div className="Gage_Test">
            <div className="Gage_Test_Bar"> </div>
          </div>
        }
      </div>
    </div>
  )


}
