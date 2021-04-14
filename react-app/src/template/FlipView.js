import React, {useState} from 'react';
import ReactCardFlip from 'react-card-flip';


export default function FlipView(props){
  const [isFlipped, setIsFlipped] = useState(false);
  const word = props.word;
  const handleClick_Card = () => {
    setIsFlipped(!isFlipped);
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div className="word_Content" onClick={handleClick_Card}>
        <div className="word_kor word_text"> {word.kor} </div>
      </div>
      <div className="word_Content" onClick={handleClick_Card}>
          <div className="word_jp1 word_text"> {word.jp1} </div>
          <div className="word_jp2 word_text"> {word.jp2} </div>
      </div>
    </ReactCardFlip>
  )
}
