const routers = [];
const fs = require('fs');
const path = require('path');


let paths = fs.readdirSync(__dirname)
    .filter(file => fs.statSync(path.join(__dirname, file)).isDirectory());

paths.forEach(item => routers.push(require(`./${item}/routes.js`)));

module.exports = {
    getRouters: function() {
        return routers;
    }
};