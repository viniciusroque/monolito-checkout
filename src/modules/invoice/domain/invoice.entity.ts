import BaseEntity from "../../@shared/domain/entity/base.entity"
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Product from "./product.entity";
import Address from "../value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";

type InvoiceProps = {
  id?: string;
  name: string;
  document: string;
  items: Product[];
  address: Address;
}

export default class Invoice extends BaseEntity implements AggregateRoot {

  private _name: string;
  private _document: string;
  private _items: Product[];
  private _address: Address;

  constructor(props: InvoiceProps){
    super(new Id(props.id));
    this._name = props.name;
    this._document = props.document;
    this._items = props.items;
    this._address = props.address;

    this.validate();
  }

  validate(): void {
    if (this._name.length === 0){
      throw new Error("Name is required.");
    }

    if (this._document.length === 0) {
      throw new Error("Document is required.");
    }

    if (this._items.length === 0){
      throw new Error("Items must have at least 1 item.");
    }

  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get items(): Product[] {
    return this._items;
  }

  get address(): Address {
    return this._address;
  }

  get total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }

  get createdAt(): Date {
    return this._createdAt;
  }

}