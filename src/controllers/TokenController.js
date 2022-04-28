import jwt from 'jsonwebtoken';

import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
      return;
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        res.status(401).json({
          errors: ['Email inválido'],
        });
        return;
      }

      if (!(await user.passwordIsValid(password))) {
        res.status(401).json({
          errors: ['Email inválido'],
        });
        return;
      }

      const { id } = user;

      const token = jwt.sign(
        { id, email },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION },
      );

      res.json({ token });
    } catch (err) {
      res.json({
        errors: ['Não foi possível realizar a autenticacao'],
      });
    }
  }
}

export default new TokenController();
