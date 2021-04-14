import React, {useState} from 'react';
import axios from 'axios';

const data = {
  type : "ko",
  content : null,
}
const handleChk = (event) => {
  data.type = event.target.value;
}
const handleSearch = (event) => {
  data.content = event.target.value;
}

export default function Papago(){
  const [word, setWord] = useState({content : null})

  const exitPapago = () => {
    setWord({
      ...word,
      content : null,
    })
  }

  const searchBtn = () => {
    const url = `api/naverapi/search/${data.type}`;
    const option = {
      content : data.content,
    };
    console.log(option);
    axios.post(url, option)
    .then(req => {
      setWord({
        ...word,
        content : (
          <div className="Home_papago_result">
            <div style={{width:"100%", height:"30px"}}> <button onClick={exitPapago} style={{float:"right", width:"60px",height:"30px"}}> 닫기 </button> </div>
            <div className="Home_papago_result_content">
              <div className="Home_papago_result_content_left" style={{float:"left", width:"50%", height:"100%", borderRight:"1px solid black"}}>
                <div style={{paddingTop:"20px"}}>
                  <span className="Home_papgo_result_text"> {data.content} </span>
                </div>
              </div>
              <div className="Home_papago_result_content_right" style={{float:"left", width:"48%", height:"100%"}}>
                <div style={{paddingTop:"20px"}}>
                  <span className="Home_papgo_result_text"> {req.data.translatedText} </span>
                </div>
              </div>
            </div>
          </div>
        )
      })
    })
  }

  return (
    <>
    <div className="Home_wordSearch_top">
      <label style={{float:"left", paddingLeft:"30px"}}>
        <input type="radio" name="type" onChange={handleChk} value="ko"checked /> <span style={{fontSize : "20px"}}> 한국어 </span>
        <input type="radio" name="type" onChange={handleChk} value="ja" /> <span style={{fontSize : "20px"}}> 일본어 </span>
      </label>
      <span> 검색 : </span> <input className="Home_wordSearch_input" type="text" onChange={handleSearch}/>
      <button onClick={searchBtn} style={{marginLeft : "10px", width : "50px", height : "30px"}}> 검색 </button>
    </div>
    {word.content != null &&
    <div className="Home_wordSearch_bottom">
        {word.content}
    </div>
    }
    </>
  )
}
