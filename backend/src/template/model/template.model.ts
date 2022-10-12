import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'JceTemplate', timestamps: false })
export class Template extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  temp_id?: number;
  @Column({ type: DataType.STRING })
  temp_header: string;
  @Column({ type: DataType.TEXT })
  temp_text: string;
}
