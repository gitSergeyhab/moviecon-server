import { UserRegisterData } from "../../types/user";
import { UserModel, UserTypeWithId } from "../../models/user";

export class UserService {
  static async create(
    userData: Omit<UserRegisterData, "repeatPassword">
  ): Promise<UserTypeWithId> {
    const createdUser = await UserModel.create(userData);
    return createdUser.toObject();
  }

  static async findByEmail(email: string): Promise<UserTypeWithId> {
    return await UserModel.findOne({ email });
  }

  static async findById(id: string): Promise<UserTypeWithId> {
    return await UserModel.findById(id);
  }

  static async findByName(name: string): Promise<UserTypeWithId> {
    return await UserModel.findOne({ name });
  }
}
