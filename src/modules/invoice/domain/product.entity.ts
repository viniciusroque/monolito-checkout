import Id from "../../@shared/domain/value-object/id.value-object";

type productProps = {
  id?: string;
  name: string;
  price: number
}
export default class Product {
  private _id: Id;
  private _name: string;
  private _price: number;

  constructor(props: productProps){
    this._id = new Id(props.id);
    this._name = props.name;
    this._price = props.price;

    this.validate();
  }

  validate(): void {
    if (this._name.length === 0){
      throw new Error("Name is required.");
    }

    if (this._price < 0) {
      throw new Error("Price must been greater than 0.");

    }
  }
  get id(): Id {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}