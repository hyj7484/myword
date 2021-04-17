import React, {useState} from 'react';
import ReactCardFlip from 'react-card-flip';
import axios from 'axios';
import './css/FlipView.css';


export default function FlipView(props){
  const [isFlipped, setIsFlipped] = useState(false);
  const style = props.style
  const textStyle = props.textStyle
  const word = props.word;
  const handleClick_Card = () => {
    setIsFlipped(!isFlipped);
  }

  const deletWord = () => {
    const url = "/api/word/delete"
    const option = {
      id : word.id
    }
    axios.post(url, option)
    .then(req => {
      if(req.data){
        props.getWord();
      }
    })
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" containerStyle={style}>
      <div className="FlipView_word_Content" onClick={handleClick_Card}>
        <div className="FlipView_delete"> <button className="FlipView_delete_Btn" onClick={deletWord}> 삭제 </button> </div>
        <div className="FlipView_word_kor FlipView_word_text" style={textStyle}>  {word.kor}  </div>
      </div>
      <div className="FlipView_word_Content" onClick={handleClick_Card}>
        <div className="FlipView_delete"> <button className="FlipView_delete_Btn" onClick={deletWord}> 삭제 </button> </div>
        <div className="FlipView_word_jp1 FlipView_word_text" style={textStyle}>  {word.jp1} <br/> {word.jp2}  </div>
      </div>
    </ReactCardFlip>
  )
}
