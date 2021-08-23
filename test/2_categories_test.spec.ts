
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

let AdminToken = ''
let BasicToken = ''

test.group('test API categories controller', async () => {

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

    test('Ensure route create category work', async () => {
        await supertest(BASE_URL).post('/admin/categories')
        .auth(AdminToken, { type: 'bearer' })
            .field(
                {
                    title: "New Category",
                })
            .expect(200)
    })

    test('Ensure route update category work', async () => {
        await supertest(BASE_URL).put('/admin/categories/1')
        .auth(AdminToken, { type: 'bearer' })
            .field(
                {
                    title: "Category",
                })
            .expect(200)
    })

    test('Ensure categories is a json array', async () => {
        await supertest(BASE_URL).get('/admin/categories')
            .auth(AdminToken, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                if (!res.body)
                    throw Error('Error : res.body empty')
                if (typeof res.body != 'object')
                    throw Error('Bad Type')
                let categories = Object(res.body)
                if (Object.prototype.toString.call(categories) !== '[object Array]')
                    throw Error('Not an array')
                return
            })
    })

    test('Ensure category is a json object', async () => {
        await supertest(BASE_URL).get('/admin/categories/1')
            .auth(AdminToken, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                if (!res.body)
                    throw Error('Error : res.body empty')
                if (typeof res.body != 'object')
                    throw Error('Bad Type')
                return
            })
    })
})
