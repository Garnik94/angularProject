import {User} from "../models/User";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../interfaces/UserInterface";
import {map, shareReplay} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  private _users$: Observable<User[]>

  constructor(public http: HttpClient) {
    this._users$ = this.http.get("/assets/data/Users.json")
      .pipe(
        map((data: any) => {
          return data.data.map((currentUser: UserInterface) =>
            new User(
              currentUser.Email,
              currentUser.UserID,
              currentUser.name,
              currentUser.StatusID)
          );
        }),
        shareReplay({bufferSize: 1, refCount: true})
      )
  }

  get users$(): Observable<User[]> {
    return this._users$;
  }

  public getUserById(userId: number, users: User[]): User {
    return users.find(currentUser => currentUser.UserID === userId);
  }

  public getUserName(userId: number, users: User[]): string {
    return this.getUserById(userId, users).name["3"];
  }

}
