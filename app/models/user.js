'use strict';

module.exports = function (db, DataTypes) {
    const User = db.define("user", {
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: "last_name"
        }
    }, {
        underscored: true,
        freezeTableName: true,
    });

    return User;
};