import { UserRegisterData } from "../../../types/user";
import { User, UserType, UserTypeWithId } from "../../models/user";

export class UserService {
  static async create(
    userData: Omit<UserRegisterData, "repeatPassword">
  ): Promise<UserTypeWithId> {
    const createdUser = await User.create(userData);
    return createdUser.toObject();
  }
  static async findByEmail(email: string): Promise<UserTypeWithId> {
    return await User.findOne({ email });
  }
  static async findById(id: string): Promise<UserTypeWithId> {
    return await User.findById(id);
  }

  static async findByName(name: string): Promise<UserTypeWithId> {
    return await User.findOne({ name });
  }
}
