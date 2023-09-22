import { CreatedAt, Model, UpdatedAt } from 'sequelize-typescript';

export default class BaseModel<T extends Model<T>> extends Model<T> {
  @CreatedAt createdAt: Date;

  @UpdatedAt updatedAt: Date;
}
