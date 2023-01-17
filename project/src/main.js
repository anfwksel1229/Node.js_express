// @ts-check

const express = require('express')
const fs = require('fs')

const app = express()

const PORT = 5000

// 미들웨어는 위에서부터 정의된것대로 순차적으로 내려옴
app.use('/',  async (req, res, next) => {
  console.log('Middleware 1')

  const fileContent = await fs.promises.readFile('test.txt')
  const requestedAt = new Date()

  req.requestedAt = requestedAt
  req.fileContent = fileContent
  next()
})

/* 수많은 middleware들 .. */

app.use((req, res) => {
  console.log('Middleware 2')
  // res.send(`Hello, express !: Requested at ${req.requestedAt}`)
  res.send(`Requested at ${req.requestedAt} , fileContent at ${req.fileContent}`)
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port : ${PORT}`)
})