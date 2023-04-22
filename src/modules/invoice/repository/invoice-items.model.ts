import { Model, PrimaryKey, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript"
import InvoiceModel from "./invoice.model";

@Table({
  tableName: "invoice_items",
  timestamps: false
})
export default class InvoiceItemModel extends Model {

  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false, field: "invoice_id" })
  declare invoiceId: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;

  @Column({ allowNull: false, field: "created_at" })
  declare createdAt: Date;

  @Column({ allowNull: false, field: "updated_at" })
  declare updatedAt: Date;
}