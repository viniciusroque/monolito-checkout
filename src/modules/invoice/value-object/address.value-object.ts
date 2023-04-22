import ValueObject from "../../@shared/domain/value-object/value-object.interface";

type AddressProps = {
  street: string;
  number: string;
  complement?: string;
  zipCode: string;
  city: string;
  state: string;
}

export default class Address implements ValueObject {

  private _street: string;
  private _number: string;
  private _complement?: string;
  private _zipCode: string;
  private _city: string;
  private _state: string;

  constructor(props: AddressProps){

    this._street = props.street;
    this._number = props.number;
    this._complement = props.complement;
    this._zipCode = props.zipCode;
    this._city = props.city;
    this._state = props.state;

    this.validate();
  }

  validate(): void {
    if (this._street.length === 0){
      throw new Error("Street is required.");
    }

    if (this._number.length === 0){
      throw new Error("Number is required.");
    }

    if (this._zipCode.length === 0){
      throw new Error("ZipCode is required.");
    }

    if (this._city.length === 0){
      throw new Error("City is required.");
    }

    if (this._state.length === 0){
      throw new Error("State is required.");
    }

  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get complement(): string {
    return this._complement;
  }

  getAddress() {
    return {
      street: this._street,
      number: this._number,
      complement: this._complement,
      city: this._city,
      state: this._state,
      zipCode: this._zipCode
    }
  }
}