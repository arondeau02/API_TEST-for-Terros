
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

let BasicToken = ''
let AdminToken = ''

test.group('test API User controller', async () => {

    test('Ensure route login works', async () => {
        await supertest(BASE_URL).post('/login')
            .field(
                {
                    email: "user@terros.io",
                    password: "password"
                })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                BasicToken = res.body.token
            })
            .expect(200)
    })

    test('Ensure route login works for admin', async () => {
        await supertest(BASE_URL).post('/login')
            .field(
                {
                    email: "admin@terros.io",
                    password: "password"
                })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                AdminToken = res.body.token
            })
            .expect(200)
    })
})
