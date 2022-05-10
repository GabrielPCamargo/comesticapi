import multer from 'multer';
import { get } from 'lodash';

import Product from '../models/Product';
import User from '../models/User';

import multerConfig from '../config/multer';

const upload = multer(multerConfig).single('image');
class ProductController {
  async index(req, res) {
    const offset = Number(get(req, 'query.offset', '0'));
    const limit = Number(get(req, 'query.limit', Number.MAX_SAFE_INTEGER));

    try {
      const products = await Product.findAll({
        limit,
        offset,
      });
      res.json(products);
    } catch (err) {
      res.status(404).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.json({
          error: err.code,
        });
      }

      const image = get(req, 'file.filename', '');
      const user_id = req.userId;

      try {
        const product = await Product.create({
          ...req.body,
          image,
          user_id,
        });
        res.json(product);
      } catch (e) {
        res.json({
          errors: e.errors.map((error) => error.message),
        });
      }
    });
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: ['Id não enviado'],
      });
    }

    try {
      const product = await Product.findByPk(id, {
        include: [{
          model: User,
          as: 'user',
          attributes: ['name', 'email', 'phone_number', 'address'],
        }],
      });
      if (!product) {
        return res.status(400).json({
          errors: ['Produto não encontrado'],
        });
      }

      res.json(product);
    } catch (err) {
      console.log(err);

      res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async update(req, res) {
    return upload(req, res, async (err) => {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Id não enviado'],
        });
      }

      try {
        const product = await Product.findByPk(id);
        if (!product) {
          return res.status(400).json({
            errors: ['Produto não encontrado'],
          });
        }

        if (err) {
          return res.status(400).json({
            error: err.code,
          });
        }

        const user_id = req.userId;
        const image = get(req, 'file.filename', '');

        let args = {};

        if (image) {
          args = {
            ...req.body,
            image,
            user_id,
          };
        } else {
          args = {
            ...req.body,
            user_id,
          };
        }

        const updatedProduct = await product.update(args);
        res.json(updatedProduct);
      } catch (e) {
        res.status(400).json({
          errors: e.errors.map((error) => error.message),
        });
      }
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: ['Id não enviado'],
      });
    }

    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(400).json({
          errors: ['Produto não encontrado'],
        });
      }

      await product.destroy();

      res.json({
        msg: 'Produto deletado com sucesso',
      });
    } catch (err) {
      res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new ProductController();
