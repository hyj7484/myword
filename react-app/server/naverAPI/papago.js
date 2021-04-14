const express = require('express');
const app = express();


app.post('/search/:type', (req, res) => {
  const apiId = '0YVI5tBKrq_fPit1BYua';
  const apiPw = 'EWHzmNgniR';
  const url = 'https://openapi.naver.com/v1/papago/n2mt';
  const source = req.params.type;
  const target = req.params.type === "ko" ? "ja" : "ko";
  const request = require('request');

  if(req.params.type != null && req.body.content != null){
    console.log(source)
    console.log(target);
    const option = {
      url : url,
      form : { 'source' : source, 'target' : target, 'text' : req.body.content },
      headers : {'X-Naver-Client-Id' : apiId, 'X-Naver-Client-Secret' : apiPw}
    };
    request.post(option, (err, response, body) => {
      if(!err && response.statusCode == 200){
        const data = JSON.parse(body).message;
        console.log(data.result)
        res.json(data.result)
      }else{
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  }else{
    res.json(false);
  }

});

module.exports = app;
