import { Model, PrimaryKey, Table, Column, HasMany } from "sequelize-typescript"
import InvoiceItemModel from "./invoice-items.model";

@Table({
  tableName: "invoices",
  timestamps: false
})
export default class InvoiceModel extends Model {

  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare document: string;

  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false })
  declare number: string;

  @Column({ allowNull: true })
  declare complement: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare state: string;

  @Column({ allowNull: false, field: "zip_code" })
  declare zipCode: string;

  @Column({ allowNull: false, field: "created_at" })
  declare createdAt: Date;

  @Column({ allowNull: false, field: "updated_at" })
  declare updatedAt: Date;

  @HasMany(() => InvoiceItemModel)
  declare items: InvoiceItemModel[];
}