import jwt from 'jsonwebtoken';


const generateToken = async payload => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
  console.log(token); 
  return token;
};

export { generateToken };