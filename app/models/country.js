'use strict';

module.exports = function (db, DataTypes) {
    const Country = db.define("country", {
        code: {
            type: DataTypes.STRING(2)
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
        underscored: true,
        freezeTableName: true,
    });

    return Country;
};