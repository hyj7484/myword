import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import './css/sign.css';
import axios from 'axios';

const data = {
  id : null,
  pw : null,
  pw2 : null,
  name : null,
}

const handleId = (event) => {
  data.id = event.target.value;
}
const handlePw1 = (event) => {
  data.pw = event.target.value;
}
const handlePw2 = (event) => {
  data.pw2 = event.target.value;
}
const handleName = (event) => {
  data.name = event.target.value;
}

export default function Sign(){

  const [state, setState] = useState({view : null});
  const history = useHistory();
  const back = () => {
    history.push('/');
  }
  const signClick = () => {
    console.log(data);
    if(data.pw !== data.pw2){
      setState({view : <p style={{color:"red"}}> 비밀번호가 일치하지 않습니다. </p>});
      return;
    }else if(data.id == null && data.pw == null && data.name == null){
      setState({view : <p style={{color:"red"}}> 비워진 칸이 있습니다. </p>});
      return;
    }
    const url = 'api/user/sign/add';
    const option = data;
    axios.post(url, option)
    .then( res => {
      res.data ? history.push('/') : setState({view : <p style={{color:"red"}}> 아이디가 존재합니다. </p>})
    })
  }

  return (
    <div className="Sign_Main">
      <div className="Sign_Content">
        <table className="Sign_Input">
          <thead>
            <tr>
            <td colSpan="2">
              <div className="Sign_Bar" style={{marginBottom : "50px", fontSize : "30px"}}> Sign </div>
              {state.view}
            </td>
            </tr>
          </thead>
          <tbody className="Sign_Input">
          <tr>
            <td className="Sign_Input_text"> ID </td>
            <td> <input tpye="text" name="id" defaultValue="" onChange={handleId}/> </td>
          </tr>
          <tr>
            <td className="Sign_Input_text"> PW </td>
            <td> <input type="password" name="pw" defaultValue="" onChange={handlePw1}/> </td>
          </tr>
          <tr>
            <td className="Sign_Input_text"> PW 확인 </td>
            <td> <input type="password" name="pw" defaultValue="" onChange={handlePw2}/> </td>
          </tr>
          <tr>
            <td className="Sign_Input_text"> Name </td>
            <td> <input type="text" name="pw" defaultValue="" onChange={handleName}/> </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button className="Sign_Btn" onClick={signClick}> 회원가입 </button>
              <button className="Sign_Btn" onClick={back}> 뒤로가기 </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
