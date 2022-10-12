import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'JceUser', timestamps: false })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id?: number;
  @Column({ type: DataType.STRING })
  name: string;
  @Column({ type: DataType.STRING })
  lastName: string;
}
