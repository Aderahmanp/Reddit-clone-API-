
const chai = require('chai')
const mocha = require('mocha')
const chaiHttp = require('chai-http')
const expect = chai.expect
const chaiLike = require('chai-like')
const chaiThings = require('chai-things')
const randomId = require('random-id')
const Topic = require('../models/topic')
const app = require('../app')

chai.use(chaiHttp)
chai.use(chaiLike)
chai.use(chaiThings)

let pattern = 'moovast'
let len = 30
const id = randomId(len, pattern)


mocha.describe('Topic Success Testing', () => {
    mocha.it(' Topic should be Create', (done) => {
        chai.request(app)
            .post(`/createTopic?id=${id}`)
            .send({ 'title': 'Coding' })
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(201)
                    expect(res.body.success).to.equal(true)
                    expect(res.body).to.have.property('data').to.be.an('array').that.contains.something.like({ title: 'Coding' })
                    expect(res.body).to.have.property('data').to.be.an('array').that.contains.something.like({ upVote: 0 })
                    expect(res.body).to.have.property('data').to.be.an('array').that.contains.something.like({ downVote: 0 })
                    done()
                }
            })
    })

    mocha.it('Topic should be upVoted', (done) => {
        chai.request(app)
            .put(`/upVote/${id}`)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(200)
                    expect(res.body.success).to.equal(true)
                    expect(res.body).to.have.property('data').to.have.property('title').to.be.equal('Coding')
                    expect(res.body).to.have.property('data').to.have.property('upVote').to.be.equal(1)
                    expect(res.body).to.have.property('data').to.have.property('downVote').to.be.equal(0)
                    done()
                }
            })
    })

    mocha.it('Topic should be downVoted', (done) => {
        chai.request(app)
            .put(`/downVote/${id}`)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(200)
                    expect(res.body.success).to.equal(true)
                    expect(res.body).to.have.property('data').to.have.property('title').to.be.equal('Coding')
                    expect(res.body).to.have.property('data').to.have.property('upVote').to.be.equal(1)
                    expect(res.body).to.have.property('data').to.have.property('downVote').to.be.equal(1)
                    done()
                }
            })
    })

    mocha.it('Show all topic', (done) => {
        chai.request(app)
            .get('/show')
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    console.log(res.body)
                    expect(res).to.have.status(200)
                    expect(res.body.success).to.equal(true)
                    expect(res.body).to.have.property('data').to.be.an('array').that.contains.something.like({ title: 'Coding' })
                    expect(res.body).to.have.property('data').to.be.an('array').that.contains.something.like({ upVote: 1 })
                    expect(res.body).to.have.property('data').to.be.an('array').that.contains.something.like({ downVote: 1 })
                    done()
                }
            })
    })

})



