const supertest = require('supertest')

const app = require('./app')

const request = supertest(app)

test('retrieve user json ', async() => {
    // expect - 어떤 값이나 객체가 ~~이길 바란다 할때 씀
    // expect(1 + 2).toBe(3)
    const result =  await request.get('/users/15').accept('application/json')
    // body 시에는 무조건 json 형태로만 받아올수있음
    console.log(result.body)

    expect(result.body).toMatchObject({
        nickname: expect.any(String),
        
    })
})

test('retrieve user page', async()=> {
    const result =  await request.get('/users/15').accept('text/html')

    expect(result.text).toMatch(/^<html>.*<\/html>$/ )

})

test('update nickname' , async()=> {

    const newNickname = 'newNickname'

    const res = await request.post('/users/15/nickname').send({ nickname : newNickname })

    expect(res.status).toBe(200)

    const userResult = await request.get('/users/15').accept('application/json')
    expect(userResult.status).toBe(200)
    expect(userResult.body).toMatchObject({
        nickname: newNickname
    })

})