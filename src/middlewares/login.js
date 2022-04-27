import jwt from 'jsonwebtoken';

import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Token expirado'],
    });
  }

  const [, token] = authorization.split(' ');
  console.log(authorization);

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({
      id, email,
    });

    if (!user) {
      res.status(401).json({
        errors: ['Token inválido'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (err) {
    res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
    console.log(err);
  }

  return 1;
};
