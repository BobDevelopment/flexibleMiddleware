'use strict';

class BaseController {
    constructor() {

        this.sendResult = function (req, res, next) {
            res.send(res.locals);
        };
    }
}

module.exports = BaseController;