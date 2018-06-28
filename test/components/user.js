'use strict';

const chai = require('chai');
const expect = chai.expect;
const config = require('config');
const supertest = require('supertest');

const request = supertest(config.get("apiUrl"));

const server = require('../helpers/server');
const db = require('../helpers/db');
const seeds = require('../seeds/user');

describe('User', () => {

    before(done => {
        Promise.all([
            server.run(),
            db.create()
        ]).then(() => {
            return db.fillDb(seeds)
        }).then(() => done()).catch(err => console.log(err))
    });

    describe('GET /api/users', () => {

        it('should return 200 and list of all saved users', done => {
            request.get(`/api/users`)
                .end((err, res) => {
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(200);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf(seeds.data.length);

                    done();
                });
        });
    });

    describe('GET /api/users/:usersId', () => {
        let user = seeds.data[0];

        it('should return 200 and user data', done => {
            request.get(`/api/users/${user.id}`)
                .end((err, res) => {
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(200);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id');
                    expect(res.body.id).to.equal(user.id);
                    expect(res.body).to.have.property('firstName');
                    expect(res.body.firstName).to.equal(user.firstName);
                    expect(res.body).to.have.property('lastName');
                    expect(res.body.lastName).to.equal(user.lastName);

                    done();
                });
        });

        it('should return 404, user with id 0 not found', done => {
            request.get(`/api/user/0`)
                .end((err, res) => {
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(404);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');

                    done();
                });
        });
    });
});