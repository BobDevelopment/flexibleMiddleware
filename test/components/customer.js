'use strict';

const chai = require('chai');
const expect = chai.expect;
const config = require('config');
const supertest = require('supertest');

const request = supertest(config.get("apiUrl"));

const server = require('../helpers/server');
const db = require('../helpers/db');
const seeds = require('../seeds/customer');

describe('Customer', () => {

    before(done => {
        Promise.all([
            server.run(),
            db.create()
        ]).then(() => {
            return db.fillDb(seeds)
        }).then(() => done()).catch(err => console.log(err))
    });

    describe('GET /api/customer', () => {

        it('should return 200 and list of all saved customers', done => {
            request.get(`/api/customers`)
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

    describe('GET /api/customers/:customerId', () => {
        let customer = seeds.data[0];

        it('should return 200 and customer data', done => {
            request.get(`/api/customers/${customer.id}`)
                .end((err, res) => {
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(200);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id');
                    expect(res.body.id).to.equal(customer.id);
                    expect(res.body).to.have.property('firstName');
                    expect(res.body.firstName).to.equal(customer.firstName);
                    expect(res.body).to.have.property('lastName');
                    expect(res.body.lastName).to.equal(customer.lastName);

                    done();
                });
        });

        it('should return 404, customer with id 0 not found', done => {
            request.get(`/api/customers/0`)
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