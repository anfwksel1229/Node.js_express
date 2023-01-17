// @ts-check

const express = require('express')

const bodyParser = require('body-parser')

const userRouter = express.Router()

const app = express()

// app.use(bodyParser.json())
app.use(express.json())

// 스태틱 파일 서빙
app.use(express.static('src/public'))

// 원하는 폴더를 지정해줄수있음 // pug 세팅
app.set('views', 'src/views')
app.set('view engine', 'pug')

const PORT = 5000

// app.get('/', (req , res)=> {
//     res.send('Root - GET')
// })

// 1. ?가 바로앞에있는것을 적용
// app.get('/ab?cd', (req , res)=> {
//     res.send('Root - GET')
// })

// 2. + 앞에 토큰이 몇번이나 배치가되어도 된단걸 뜻함
// app.get('/ab+cd', (req , res)=> {
//     res.send('Root - GET')
// })

// 3. 경로 자리에 무엇이들어와도 된다는걸 뜻함
// app.get('/ab*cd', (req , res)=> {
//     res.send('Root - GET')
// })

// 4. 
// app.get('/a(bc)?d', (req , res)=> {
//     res.send('Root - GET')
// })

// 5. 무조건 abcd 로만 끝나야함 , 앞에 무엇이들어있는 abcd 만 포함하면됨
// app.get(/abcd$/, (req , res)=> {
//     res.send('Root - GET')
// })

// // 6. 배열형태 , abc , xyz 로 출력해도 나옴
// app.get(['/abc' , '/xyz'], (req , res)=> {
//     res.send('Root - GET')
// })

const USERS = {
  15: {
    nickname: 'foo',
  },
  156: {
    nickname: 'Hyun',
  },
}

userRouter.get('/', (req, res) => {
  res.send('User list')
})

userRouter.param('id', (req, res, next, value) => {
  console.log('value 값임 ㅋㅋ', value)
  console.log(':id parameter', value)
  req.user = USERS[value]
  next()
})


// /users/15
userRouter.get('/:id', (req, res) => {
  const resMimeTpye = req.accepts(['json', 'html'])

  if(resMimeTpye === 'json' ){
    
      console.log('userRouter get ID ')
      // res.send('User info with ID')
      res.send(req.user)
  }
  else if(resMimeTpye === 'html'){
    res.render('index' , {
      // nickname: "hyun,"
      nickname: req.user.nickname,
    })
  }
})

userRouter.post('/', (req, res) => {
  // Register user
  res.send('User registerd')
})

userRouter.post('/:id/nickname', (req, res) => {
  // req.body: {"nickname": "bar"}
  const {
    user
  } = req
  const {
    nickname
  } = req.body

  user.nickname = nickname

  res.send(`User nickname updated: ${nickname}`)
})

app.use('/users', userRouter)

app.get('/', (req, res) => {
  res.render('index', {
    message: 'Hello Pug',
  })
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port : ${PORT}`)
})