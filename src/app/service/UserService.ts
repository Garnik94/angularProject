import {User} from "../models/User";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../interfaces/UserInterface";
import {map} from "rxjs/operators";

@Injectable()
export class UserService {

  users: User[] = [];

  constructor(private http: HttpClient) {
  }

  public getUsers() {
    return this.http.get("/assets/data/Users.json")
      .pipe(
        map((data: any) => {
          return data.data.map((currentUser: any) =>
            new User(
              (currentUser as UserInterface).Email,
              (currentUser as UserInterface).UserID,
              (currentUser as UserInterface).name,
              (currentUser as UserInterface).StatusID)
          );
        })
      )
  }

  public getUserById(userId: number): User {
    return this.users.find(currentUser => currentUser.UserID === userId);
  }

  public getUserName(userId: number): string {
    return this.getUserById(userId).name["3"];
  }
}
