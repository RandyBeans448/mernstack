const express = require('express');
const morgan = require('morgan');
const router = express.Router();

//aysncHandler
function asyncHandler(callback){
    return async(req, res, next) => {
      try {
        await callback(req, res, next)
      } catch(error){
        next(error)
        console.log(error)
      }
    } 
  };

  module.exports = router;
