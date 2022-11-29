const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const indomain=require('./pwddomain.js');
const cors=require("cors");
app.use(express.json());
app.use(cors({origin:"*"}));

const users = []

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})

app.post('/users/dp', async (req, res) => {
  if (req.body.domain == null) {
    return res.status(400).send('Something went wrong')
  }
  try {
    var _result;
    await indomain.pwddomain(req.body).then(res=>{
      console.log(res);
      _result=res;
    });
    if(_result.acknowledged==true){
      res.status(200).send(req.body);
    }
    else{
      res.status(400).send("Nothing is inserted");
    }


  } catch {
    res.status(500).send();
  }
})

app.get('/users/getdp', async (req, res) => {
  try {
    var _result;
    await indomain.getpwddomain().then(res=>{
      console.log(res);
      _result=res;
    });
    if(_result){
      res.status(200).send(_result);
    }
    else{
      res.status(400).send("Nothing is inserted");
    }


  } catch {
    res.status(500).send();
  }
})


app.listen(3004)