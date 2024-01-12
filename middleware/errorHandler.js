const { constant } = require('../constants')
const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500
    switch(statusCode){
        case constant.VALIDATION_ERROR: 
        res.json({
            title: "Validation fail",
            message: err.message,
            stackTrace: err.stack
        });
        break;
        case constant.NOT_FOUND: 
        res.json({
            title: "Not found",
            message: err.message,
            stackTrace: err.stack
        })
        break;
        case constant.FORBIDDEN: 
        res.json({
            title: "Forbidden",
            message: err.message,
            stackTrace: err.stack
        })
        break;
        case constant.NOT_FOUND: 
        res.json({
            title: "Not found",
            message: err.message,
            stackTrace: err.stack
        })
        break;
        case constant.SERVER_ERR: 
        res.json({
            title: "Sever Error",
            message: err.message,
            stackTrace: err.stack
        })
        default:
            console.log('No Error, All good')
            break;
    }

}

module.exports = errorHandler