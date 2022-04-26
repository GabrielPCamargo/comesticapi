import Sequelize, { Model } from 'sequelize';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      phone_number: Sequelize.INTEGER,
      address: Sequelize.STRING,
    }, {
      sequelize,
    });

    return this;
  }
}
