import { UserInputModel } from "../models/user.model";
// import { userModel, allUsersModel } from "src/models/user.model";
import User from "../repository/user.repository";

const userRepository = new User();

class UserService {
  addUser = async (user: UserInputModel) => {
    return await userRepository.addUser(user);
  };

  takeAllUsers = async () => {
    return await userRepository.takeAllUsers();
  };

  takeOneUser = async (userId: string) => {
    return await userRepository.takeOneUser(userId);
  };

  deleteUser = async (userId: string) => {
    return await userRepository.deleteUser(userId);
  };
}

export default new UserService();
