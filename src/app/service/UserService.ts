import * as users from "../files/Users.json";
import {User} from "../models/User";
import {Injectable} from "@angular/core";

@Injectable()
export class UserService {

  public getAllUsersList() {
    return users;
  }

  public getUserArray() {
    return this.getAllUsersList().data
      .map(currentUser =>
        new User(
          currentUser.Email,
          currentUser.UserID,
          currentUser.name,
          currentUser.StatusID)
      );
  }

  public getUserById(userId: number): User {
    return this.getUserArray().find(currentUser => currentUser.UserID === userId);
  }

  public getUserName(user: User): string {
    return user.name["3"];
  }
}
