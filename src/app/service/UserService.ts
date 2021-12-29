import {User} from "../models/User";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../interfaces/UserInterface";
import {map} from "rxjs/operators";

@Injectable()
export class UserService {

  users: User[] = [];

  constructor(public http: HttpClient) {
    this.http.get("/assets/data/Users.json")
      .pipe(
        map((data: any) => {
          return data.data.map((currentUser: UserInterface) =>
            new User(
              currentUser.Email,
              currentUser.UserID,
              currentUser.name,
              currentUser.StatusID)
          );
        })
      ).subscribe(users => this.users = users);
  }

  public getUserById(userId: number): User {
    return this.users.find(currentUser => currentUser.UserID === userId);
  }

  public getUserName(userId: number): string {
    return this.getUserById(userId).name["3"];
  }
}
