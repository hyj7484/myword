import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './css/sign.css';
import axios from 'axios';

export default function Sign(){
  const [data, setData] = useState({
    id : "",
    pw : "",
    pw2 : "",
    name : "",
  });
  const [state, setState] = useState(null)
  const history = useHistory();
  const handleId = (event) => {
    setData({
      ...data,
      id : event.target.value
    })
  }
  const handlePw1 = (event) => {
    setData({
      ...data,
      pw : event.target.value
    })
  }
  const handlePw2 = (event) => {
    setData({
      ...data,
      pw2 : event.target.value
    })
  }
  const handleName = (event) => {
    setData({
      ...data,
      name : event.target.value
    })
  }
  useEffect(()=>{
    if(data.id != "" || data.pw != "" || data.pw1 != "" || data.name != ""){
      setState(null)
    }
  }, [data])

  const onClickSign = () => {
    if(data.pw != data.pw2){
      return;
    }
    if(data.id == "" || data.pw == "" || data.name == ""){
      setState(<> 비워진 칸을 채워주세요. </>)
      return;
    }
    const url = 'api/user/sign/add';
    const option = data;
    axios.post(url, option)
    .then( res => {
      res.data ? history.push('/') : setState(<> 아이디가 존재합니다. </>)
    })
  }
  const onClickBack = () => {
    history.push('/');
  }

  return (
    <div className="Sign_Main">
      <div className="Sign_Content">
        <table className="Sign_Table">
          <thead>
            <tr>
              <td colSpan="2" style={{height:"100px", fontSize:"30px"}}> Sign </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="Sign_Info_text"> ID </td>
              <td className="Sign_Input_td"> <input type="text" className="Sign_Input_text" onChange={handleId} /> </td>
            </tr>
            <tr>
              <td className="Sign_Info_text"> PW </td>
              <td className="Sign_Input_td"> <input type="password" className="Sign_Input_text" onChange={handlePw1} /> </td>
            </tr>
            <tr>
              <td className="Sign_Info_text"> PW확인 </td>
              <td className="Sign_Input_td"> <input type="password" className="Sign_Input_text" onChange={handlePw2} /> </td>
            </tr>
            <tr>
              <td className="Sign_Info_text"> Name </td>
              <td className="Sign_Input_td"> <input type="text" className="Sign_Input_text" onChange={handleName} /> </td>
            </tr>
          </tbody>
        </table>
        <div className="Sign_PwChk">
        {data.pw != data.pw2 &&
          <div className="Sing_PwChk_Content"> 비밀번호가 일치하지 않습니다. </div>
        }
        {state}
        </div>
        <div>
          <button className="Sign_Btn" onClick={onClickSign}> 회원가입 </button>
          <button className="Sign_Btn" onClick={onClickBack}> 뒤로가기 </button>
        </div>
      </div>
    </div>
  )
}
