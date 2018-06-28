'use strict';

require('../db');
const models = require('../app/models/index');

let fillCountries = (transaction) => {
    return models.country.bulkCreate(
        [
            {code: 'CA', name: 'Canada'},
            {code: 'DE', name: 'Germany'},
            {code: 'JP', name: 'Japan'},
            {code: 'GB', name: 'United Kingdom'},
            {code: 'US', name: 'United States'}
        ], {transaction: transaction}
    ).then(() => {
        console.log('Countries successfully created')
    }).catch(error => {
        console.error(`Error occurred during creation of countries ${error.message}`);
        throw error;
    });
};

let fillCustomers = (transaction) => {
    return models.customer.bulkCreate(
        [
            {firstName: 'Laverne', lastName: 'Abele'},
            {firstName: 'Trisha', lastName: 'Body'},
            {firstName: 'Karan', lastName: 'Bresler'},
            {firstName: 'Lilian', lastName: 'Keith'},
            {firstName: 'Belle', lastName: 'Oglesby'},
            {firstName: 'Shaquana', lastName: 'Boedeker'},
            {firstName: 'Vern', lastName: 'Culbreth'},
            {firstName: 'Ellsworth', lastName: 'Moller'},
            {firstName: 'Domitila', lastName: 'Nolen'},
            {firstName: 'Suzy', lastName: 'Cai'}
        ], {transaction: transaction}
    ).then(() => {
        console.log('Customers successfully created')
    }).catch(error => {
        console.error(`Error occurred during customers creation ${error.message}`);
        throw error;
    });
};

let fillUsers = (transaction) => {
    return models.user.bulkCreate(
        [
            {firstName: 'Cathi', lastName: 'Bruner'},
            {firstName: 'Andrea', lastName: 'Heyward'},
            {firstName: 'Curtis', lastName: 'Delapp'},
            {firstName: 'Cecelia', lastName: 'Pollitt'},
            {firstName: 'Kyong', lastName: 'Harman'},
            {firstName: 'Agustin', lastName: 'Buskey'},
            {firstName: 'Marlena', lastName: 'Kincannon'},
            {firstName: 'Melba', lastName: 'Swayze'},
            {firstName: 'Dimple', lastName: 'Forshey'},
            {firstName: 'Sena', lastName: 'Garceau'},
        ], {transaction: transaction}
    ).then(() => {
        console.log('Users successfully created')
    }).catch(error => {
        console.error(`Error occurred during user creation ${error.message}`);
        throw error;
    });
};

let fillData = () => {
    let sharedData = {};

    return models.database.transaction({autocommit: false}).then(transaction => {
        sharedData.transaction = transaction;
        return Promise.all([
            fillCountries(transaction),
            fillCustomers(transaction),
            fillUsers(transaction)
        ]);
    }).then(() => {
        return sharedData.transaction.commit();
    }).then(() => {
        console.log('All data successfully saved')
    }).catch(error => {
        console.error(`Error occurred during saving of data: ${error.message}`);
        sharedData.transaction.rollback();
    });
};
module.exports = fillData;