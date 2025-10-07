const errorHandler = (error,req,res,next) => {

  const statusCode = error.statusCode || 500
  const message = error.message || 'server error'
  res.status(statusCode).json({message:message});
};

module.exports = errorHandler;
