import React, {useState} from 'react';
import './css/login.css';

const data = {
  id : null,
  pw : null
}
const handleId = (event) =>{
  data.id = event.target.value;
}
const handlePw = (event) => {
  data.pw = event.target.value;
}
const loginClick = () => {
  console.log(data)
}

function Login(props){

  return (
    <div className="Login_Main">
      <div className="Login_Content">

        <table className="Login_Input">
          <thead>
            <tr>
            <td colSpan="2">
              <div className="Login_Bar" style={{marginBottom : "50px", fontSize : "30px"}}> Login </div>
            </td>
            </tr>
          </thead>
          <tbody className="Login_Input">
          <tr>
            <td className="Login_Input_text"> ID </td>
            <td> <input tpye="text" name="id" defaultValue="" onChange={handleId}/> </td>
          </tr>
          <tr>
            <td className="Login_Input_text"> PW </td>
            <td> <input type="password" name="pw" defaultValue="" onChange={handlePw}/> </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button className="Login_Btn" onClick={loginClick}> Login </button>
              <button className="Login_Btn"> Sign </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default React.memo(Login);
