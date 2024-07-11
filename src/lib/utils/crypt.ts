import bcrypt from "bcryptjs";

const SALT = 8;

export class Crypt {
  static hash(value: string) {
    return bcrypt.hashSync(value, SALT);
  }

  static compare(testValuer: string, controlValue: string) {
    return bcrypt.compareSync(testValuer, controlValue);
  }
}
