import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './css/login.css';
import axios from 'axios';

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


function Login(props){
  const history = useHistory();
  const setUser = props.setUser;

  const clickLogin = () => {
    const url = "/api/user/sign/login";
    axios.post(url, data)
    .then(req => {
      req.data && setUser({id : req.data.id, name : req.data.name})
    })
  }

  return (
    <div className="Login_Main">
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
                <input type="text" className="Login_body_Input"/>
              </td>
            </tr>
            <tr>
              <td className="Login_Body_td_left">
                <span> PW </span>
              </td>
              <td className="Login_Body_td_right">
                <input type="text" className="Login_body_Input"/>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="Login_Btn_Div"> <button className="Login_Btn"> Login </button> </div>
      </div>
    </div>
    // <div className="Login_Main">
    //   <div className="Login_Content">
    //     <table className="Login_Input">
    //       <thead>
    //         <tr>
    //         <td colSpan="2">
    //           <div className="Login_Bar" style={{marginBottom : "50px", fontSize : "30px"}}> Login </div>
    //         </td>
    //         </tr>
    //       </thead>
    //       <tbody className="Login_Input">
    //       <tr>
    //         <td className="Login_Input_text"> ID </td>
    //         <td> <input tpye="text" name="id" defaultValue="" onChange={handleId}/> </td>
    //       </tr>
    //       <tr>
    //         <td className="Login_Input_text"> PW </td>
    //         <td> <input type="password" name="pw" defaultValue="" onChange={handlePw}/> </td>
    //       </tr>
    //       <tr>
    //         <td colSpan="2">
    //           <button className="Login_Btn" onClick={clickLogin}> Login </button>
    //           <Link to="/sign"><button className="Login_Btn"> Sign </button> </Link>
    //         </td>
    //       </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  )
}

export default React.memo(Login);
