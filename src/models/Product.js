import Sequelize, { Model } from 'sequelize';

import appConfig from '../config/appConfig';

export default class Product extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false,
        unique: {
          msg: 'Já existe um produto com este nome',
        },
        validate: {
          len: {
            args: [2, 255],
            msg: 'O titulo deve ter entre 2 e 255 caracteres',
          },
        },
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        get() {
          const url = `${appConfig.url}/images/${this.getDataValue('image')}`;
          return this.getDataValue('image') ? url : '';
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'A descricao deve ter entre 2 e 255 caracteres',
          },
        },
      },
      price: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'É necessário definir um preço',
          },
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'É necessário definir uma quantidade',
          },
        },
      },
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
