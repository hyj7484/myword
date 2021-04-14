import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {WordBookList} from '../template'

export default function Test(props){
  useEffect(()=>{
    const url = "/api/wordBook/getWordBooks";
    const option = {
      user : props.user.id
    }
    axios.post(url, option)
    .then( req => console.log(req.data))
  })

  return (
    <div className="Test_Main">
      <div style={{width:"80%", margin:"20px auto"}}>
      <WordBookList user={props.user}/>
      </div>
    </div>
  )
}
