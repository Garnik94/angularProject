import {User} from "../models/User";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, shareReplay} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  private _users$: Observable<User[]>

  constructor(public http: HttpClient) {
    this._users$ = this.http.get("/assets/data/Users.json")
      .pipe(
        map((data: any) => data.data),
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
