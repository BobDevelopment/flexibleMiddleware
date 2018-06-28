'use strict';

const chai = require('chai');
const expect = chai.expect;
const config = require('config');
const supertest = require('supertest');

const request = supertest(config.get("apiUrl"));

const server = require('../helpers/server');
const db = require('../helpers/db');
const seeds = require('../seeds/country');

describe('Country', () => {

    before(done => {
        Promise.all([
            server.run(),
            db.create()
        ]).then(() => {
            return db.fillDb(seeds)
        }).then(() => done()).catch(err => console.log(err))
    });

    describe('GET /api/countries', () => {

        it('should return 200 and list of all saved countries', done => {
            request.get(`/api/countries`)
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
});