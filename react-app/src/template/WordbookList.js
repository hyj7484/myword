import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './css/WordBookList.css';


export default function WordBookList(props){
  const [word, setWord] = useState({wordbook : null});
  useEffect(()=>{
    const url = '/api/wordbook/getWordBooks';
    const option = {
      user : user.id,
    }
    axios.post(url, option)
    .then(req => {
      setWord({wordbook : req.data})
    })
  }, [])
  if(props.word != null){
    word.wordbook.append(props.word)
  }

  const view_wordbook = () => {

    if(word.wordbook != null){
      let a = false;
      console.log(typeof word.wordbook)
      return (
        <div>
          {word.wordbook.map((list, index) => {
            if( list == props.word){
              a = true;
            }
            return ( <div className="WordBookList_BookList" key={index} onClick={()=>{moveWordBook(list.wordbook)}}> {list.wordbook} </div> )
          })}
        </div>
      )
      console.log("chkchkchk");
      if(!a && props.word != null){
        let appendWord = word.wordbook;
        appendWord.append(props.word)
        setWord({
          ...word,
          wordbook : appendWord,
        })
      }
    }else{
      return null;
    }
  }

  const user = props.user;
  const history = useHistory();
  const moveWordBook = (argUrl) => {
    const url = '/word/look/' + argUrl;
    history.push(url);
  }

  return (
    <div className="WordBookList_Main" style={{width:"100%", height:"100%"}}>
      <div className="WordBookList_Content">
        {view_wordbook()}
      </div>
    </div>
  )
}
