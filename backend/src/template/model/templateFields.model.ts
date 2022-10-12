import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'JceTemplateFields', timestamps: false })
export class TemplateFields extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  field_id?: number;
  @Column({ type: DataType.STRING })
  field_name: string;
}
