import * as users from "../files/Users.json";
import {User} from "../models/User";

export class UserService {

  public static getAllUsersList() {
    return users;
  }

  public static getUserArray() {
    return UserService.getAllUsersList().data
      .map(currentUser =>
        new User(
          currentUser.Email,
          currentUser.UserID,
          currentUser.name,
          currentUser.StatusID)
      );
  }

  public static getUserById(userId: number): User {
    return this.getUserArray().find(currentUser => currentUser.UserID === userId);
  }

  public static getUserName(user: User): string {
    return user.name["3"];
  }
}
