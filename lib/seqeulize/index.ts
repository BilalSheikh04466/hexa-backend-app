import { Sequelize } from 'sequelize-typescript';
import { sequelizeConfig } from '../../config';
import { User } from '../../models';

const sequelize = new Sequelize(sequelizeConfig);
sequelize.addModels([User]);
sequelize.sync({ alter: true });

export { sequelize };
