const jwt = require('jsonwebtoken');


const generateToken = (email)=>{

  const accessToken = jwt.sign({email:email},process.env.ACCESS_TOKEN_KEY,{expiresIn:'7d'})

  return accessToken;

}

module.exports = generateToken;