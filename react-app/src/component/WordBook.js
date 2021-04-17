import React, {useState, useEffect} from 'react';
import { useRouteMatch } from 'react-router-dom';
import axios from 'axios';


const data = {
  wordbook : null,
  user : null,
}

export default function WordBook(props){
  const [word, setWord] = useState(null);
  const wordbook = useRouteMatch("/word/look/:wordbook").params.wordbook;
  data.user = props.user.id
  data.wordbook = wordbook;
  useEffect(()=>{
    const url = '/api/word/get';
    const option = data;
    axios.post(url, option)
    .then(req => {
      setWord(req.data);
    })
  }, []);
  useEffect(()=>{
    console.log(word);
  }, [word])

  return (
    <div>
      
    </div>
  )
}
