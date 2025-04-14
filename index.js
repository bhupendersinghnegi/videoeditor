import express from 'express';
import * as child from 'child_process';
// const express = require('express')
const app = express()
app.use(express.static('public'));

app.post('/run-command', (req, res) => {
  child.exec('node video-module/index.js', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    } 
    console.log(`stdout: ${stdout}`);
  });

  res.send('Command is running');
});




app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.listen(5000, () => {
  console.log(`Server start http://localhost:5000/`);
})



