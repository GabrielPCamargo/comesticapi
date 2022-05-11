import get from 'lodash';

import User from '../models/User';
import Product from '../models/Product';

class UserController {
  async store(req, res) {
    try {
      const user = await User.create(req.body);
      const {
        id, name, email, phone_number, address,
      } = user;
      res.json({
        id, name, email, phone_number, address,
      });
    } catch (err) {
      res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      const {
        id, name, email, phone_number, address,
      } = user;
      res.json({
        id, name, email, phone_number, address,
      });
    } catch (err) {
      res.status(400).json({
        errors: (err.errors ? err.errors.map((error) => error.message) : err),
      });
    }
  }

  async update(req, res) {
    const user = await User.findByPk(req.params.id);
    const updatedUser = await user.update(req.body);
    const {
      id, name, email, phone_number, address,
    } = updatedUser;
    res.json({
      id, name, email, phone_number, address,
    });
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      await user.destroy();
      res.json({ msg: 'Usuário deletado com sucesso' });
    } catch (err) {
      res.status(400).json({
        errors: (err.errors ? err.errors.map((error) => error.message) : err),
      });
    }
  }

  async products(req, res) {
    const offset = Number(get(req, 'query.offset', '0'));
    const limit = Number(get(req, 'query.limit', Number.MAX_SAFE_INTEGER));
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: ['É necessário enviar um ID de usuario'],
      });
    }

    const products = await Product.findAndCountAll({
      where: {
        user_id: id,
      },
      offset,
      limit,
    });

    if (products.length === 0) {
      return res.status(400).json({
        errors: ['Não foi encontrado nenhum produto para o usuario indicado'],
      });
    }

    res.json(products);
  }
}

export default new UserController();
