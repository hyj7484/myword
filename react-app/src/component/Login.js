import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './css/login.css';
import axios from 'axios';

const data = {
  id : "",
  pw : ""
}
const handleId = (event) =>{
  data.id = event.target.value;
}
const handlePw = (event) => {
  data.pw = event.target.value;
}


function Login(props){
  const history = useHistory();
  const setUser = props.setUser;
  const [chkView, setChkView] = useState(false);

  const clickLogin = () => {
    const url = "/api/user/sign/login";
    axios.post(url, data)
    .then(req => {
      req.data ? setUser({id : req.data.id, userId : req.data.userId, name : req.data.userName}) : setChkView(true);
    })
  }
  const moveSign = () => {
    history.push("/sign");
  }

  return (
    <div className="Login_Main">
      {chkView &&
        <div className="Login_Fail_Main">
        <div className="Login_Fail">
          <div style={{marginTop:"20px", color:"black"}}> Login Fail </div>
          <hr />
          <div style={{margin:"50px auto"}}><span> {data.id == "" ? <>아이디를 입력해 주세요.</> : data.pw == "" ? <>비밀번호를 입력해 주세요.</> : <>아이디 또는 비밀번호가 틀렸습니다.</> } </span></div>
          <hr />
          <button style={{width:"50px", height:"30px", marginTop:"10px", backgroundColor:"rgb(222, 149, 186)"}} onClick={()=>{setChkView(false)}}> 확인 </button>
        </div>
        </div>
      }
      <div className="Login_Content">
        <table className="Login_Table">
          <thead className="Login_Thead">
            <tr>
              <td colSpan="2" className="Login_Head_td">
                <div className="Login_Head_Bar"> <h1> Login </h1> </div>
              </td>
            </tr>
          </thead>
          <tbody className="Login_Tbody">
            <tr>
              <td className="Login_Body_td_left">
                <span> ID </span>
              </td>
              <td className="Login_Body_td_right">
                <input type="text" className="Login_body_Input" onChange={handleId}/>
              </td>
            </tr>
            <tr>
              <td className="Login_Body_td_left">
                <span> PW </span>
              </td>
              <td className="Login_Body_td_right">
                <input type="password" className="Login_body_Input" onChange={handlePw}/>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="Login_Btn_Div">
          <button className="Login_Btn" onClick={clickLogin}> Login </button>
          <button className="Login_Btn" onClick={moveSign}> Sign </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Login);
