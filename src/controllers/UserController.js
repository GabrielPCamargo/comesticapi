import User from '../models/User';

class UserController {
  async index(req, res) {
    //
  }

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
        errors: err,
      });
      console.log(err);
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
}

export default new UserController();
