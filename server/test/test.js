const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../server')
const should = chai.should()

chai.use(chaiHttp)

describe('API: Register', () => {
    it('it should register a user', (done) => {
        let user = {
            registrationfirstName: "userabc",
            registrationemail: "userabb@gmail.com",
            registrationpassword: "Qwerty_123"
        }
        chai.request(server)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})


describe('API: Login', () => {
    it('it should login a user', (done) => {
        let user = {
            email: "userabc@gmail.com",
            password: "Qwerty_123"
        }
        chai.request(server)
            .post('/api/users/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})

describe('API: Get Products by Access token', () => {
    it('it should return list of products', (done) => {
        chai.request(server)
            .get('/api/dashboard/products')
            .set("access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzMzYjJiZjQtNTliYy00Y2IyLWFlY2EtZTViYzg2YWQ4M2I5In0sImlhdCI6MTY0NzgyOTQxMiwiZXhwIjoxNjQ3ODMzMDEyfQ.rXuODk7eHSN6NezWkzLsNhd1sF83JB58oSydAuCriBU")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})

describe('API: GEt User auth by Access token', () => {
    it('it should user details', (done) => {
        chai.request(server)
            .post('/api/users/auth')
            .set("access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzMzYjJiZjQtNTliYy00Y2IyLWFlY2EtZTViYzg2YWQ4M2I5In0sImlhdCI6MTY0NzgyOTQxMiwiZXhwIjoxNjQ3ODMzMDEyfQ.rXuODk7eHSN6NezWkzLsNhd1sF83JB58oSydAuCriBU")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})

describe('API: GEt all cart items from user id', () => {
    it('it should return cart items', (done) => {
        let user = {
            userId:"733b2bf4-59bc-4cb2-aeca-e5bc86ad83b9"
        }
        chai.request(server)
            .post('/api/order/cart-items')
            .set("access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzMzYjJiZjQtNTliYy00Y2IyLWFlY2EtZTViYzg2YWQ4M2I5In0sImlhdCI6MTY0NzgyOTQxMiwiZXhwIjoxNjQ3ODMzMDEyfQ.rXuODk7eHSN6NezWkzLsNhd1sF83JB58oSydAuCriBU")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})