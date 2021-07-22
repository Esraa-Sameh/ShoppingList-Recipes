export class User {
  constructor(
    public email: string,
    private _id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get id() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._id;
  }
}
