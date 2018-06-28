'use strict';

const chai = require('chai');
const expect = chai.expect;
const config = require('config');
const supertest = require('supertest');

const request = supertest(config.get("apiUrl"));

const server = require('../helpers/server');
const db = require('../helpers/db');
const countrySeeds = require('../seeds/country');
const customerSeeds = require('../seeds/customer');
const userSeeds = require('../seeds/user');

describe('Resource', () => {

    before(done => {
        Promise.all([
            server.run(),
            db.create()
        ]).then(() => {
            return Promise.all([
                db.fillDb(countrySeeds),
                db.fillDb(customerSeeds),
                db.fillDb(userSeeds)
                ]);
        }).then(() => done()).catch(err => console.log(err))
    });

    describe('GET /api/resources?countries=api/countries', () => {

        it('should return 200 and list of all saved countries', done => {
            request.get(`/api/resources?countries=api/countries`)
                .end((err, res) => {
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(200);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('countries');
                    expect(res.body.countries).to.have.lengthOf(countrySeeds.data.length);

                    done();
                });
        });
    });

    describe('GET /api/resources?customers=api/customers', () => {

        it('should return 200 and list of all saved customers', done => {
            request.get(`/api/resources?customers=api/customers`)
                .end((err, res) => {
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(200);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('customers');
                    expect(res.body.customers).to.have.lengthOf(customerSeeds.data.length);

                    done();
                });
        });
    });

    describe('GET /api/resources?customer=api/customers/:customerId', () => {

        let customer = customerSeeds.data[0];

        it('should return 200 and customer data', done => {
            request.get(`/api/resources?customer=api/customers/${customer.id}`)
                .end((err, res) => {
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(200);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('customer');
                    expect(res.body.customer).to.be.an('object');
                    expect(res.body.customer).to.have.property('id');
                    expect(res.body.customer.id).to.equal(customer.id);
                    expect(res.body.customer).to.have.property('firstName');
                    expect(res.body.customer.firstName).to.equal(customer.firstName);
                    expect(res.body.customer).to.have.property('lastName');
                    expect(res.body.customer.lastName).to.equal(customer.lastName);

                    done();
                });
        });

        it('should return 404, customer with id 0 not found', done => {
            request.get(`/api/resources?customer=api/customers/0`)
                .end((err, res) => {
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(404);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');

                    done();
                });
        });

        it('should return 404', done => {
            request.get(`/api/resources?customer=api/customers/someStr`)
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

    describe('GET /api/resources?users=api/users', () => {

        it('should return 200 and array with all users', done => {
            request.get(`/api/resources?users=api/users`)
                .end((err, res) => {
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(200);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('users');
                    expect(res.body.users).to.have.lengthOf(userSeeds.data.length);

                    done();
                });
        });
    });

    describe('GET /api/resources?user=api/users/:userId', () => {

        let user = userSeeds.data[0];

        it('should return 200 and user data', done => {
            request.get(`/api/resources?user=api/users/${user.id}`)
                .end((err, res) => {
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(200);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('user');
                    expect(res.body.user).to.be.an('object');
                    expect(res.body.user).to.have.property('id');
                    expect(res.body.user.id).to.equal(user.id);
                    expect(res.body.user).to.have.property('firstName');
                    expect(res.body.user.firstName).to.equal(user.firstName);
                    expect(res.body.user).to.have.property('lastName');
                    expect(res.body.user.lastName).to.equal(user.lastName);

                    done();
                });
        });

        it('should return 404, user with id 0 not found', done => {
            request.get(`/api/resources?user=api/users/0`)
                .end((err, res) => {
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(404);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');

                    done();
                });
        });

        it('should return 404, user with id someStr not found', done => {
            request.get(`/api/resources?user=api/users/someStr`)
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

    describe('GET /api/resources?countries=api/countries&customers=api/customers&users=api/users', () => {

        it('should return 200 and object  with list of countries, customers & users', done => {
            request.get(`/api/resources?countries=api/countries&customers=api/customers&users=api/users`)
                .end((err, res) => {
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(200);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');

                    expect(res.body).to.have.property('countries');
                    expect(res.body.countries).to.have.lengthOf(countrySeeds.data.length);

                    expect(res.body).to.have.property('customers');
                    expect(res.body.customers).to.have.lengthOf(customerSeeds.data.length);

                    expect(res.body).to.have.property('users');
                    expect(res.body.users).to.have.lengthOf(userSeeds.data.length);

                    done();
                });
        });
    });

    describe('GET /api/resources?countries=api/countries&customer=api/customers/:customerId&users=api/users/:userId', () => {

        it('should return 200 and object with countries, customer & user', done => {
            let customer = customerSeeds.data[0];
            let user = userSeeds.data[0];

            request.get(`/api/resources?countries=api/countries&customer=api/customers/${customer.id}&user=api/users/${user.id}`)
                .end((err, res) => {
                    expect(res).to.have.property('statusCode');
                    expect(res.statusCode).to.equal(200);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');

                    expect(res.body).to.have.property('countries');
                    expect(res.body.countries).to.have.lengthOf(countrySeeds.data.length);
                    expect(res.body).to.have.property('customer');

                    expect(res.body.customer).to.have.property('id');
                    expect(res.body.customer.id).to.equal(customer.id);
                    expect(res.body.customer).to.have.property('firstName');
                    expect(res.body.customer.firstName).to.equal(customer.firstName);
                    expect(res.body.customer).to.have.property('lastName');
                    expect(res.body.customer.lastName).to.equal(customer.lastName);

                    expect(res.body.user).to.have.property('id');
                    expect(res.body.user.id).to.equal(user.id);
                    expect(res.body.user).to.have.property('firstName');
                    expect(res.body.user.firstName).to.equal(user.firstName);
                    expect(res.body.user).to.have.property('lastName');
                    expect(res.body.user.lastName).to.equal(user.lastName);

                    done();
                });
        });
    });

    describe('GET /api/resources?countries=api/countries&customer=api/customers/:customerId&users=api/users/:userId', () => {

        it('should return 404, not existing customer', done => {
            let user = userSeeds.data[0];

            request.get(`/api/resources?countries=api/countries&customer=api/customers/0&user=api/users/${user.id}`)
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

    describe('GET /api/resources?countries=api/countries&customer=api/customers/:customerId&users=api/users/:userId', () => {

        it('should return 404, not existing user', done => {
            let customer = customerSeeds.data[0];

            request.get(`/api/resources?countries=api/countries&customer=api/customers/${customer.id}&user=api/users/someNonExistId`)
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