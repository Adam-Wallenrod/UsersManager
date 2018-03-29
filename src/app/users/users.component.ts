import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [ UsersService ],
  styleUrls: ['./users.component.less']

})
export class UsersComponent implements OnInit {
  users: User[];
  editUser: User;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
  }

  add(name: string): void {
    this.editUser = undefined;
    name = name.trim();
    if (!name) { return; }

    // The server will generate the id for this new user
    const newUser: User = { name } as User;
    this.usersService.addUser(newUser)
      .subscribe(user => this.users.push(user));
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.usersService.deleteUser(user.id).subscribe();
    /*
    // oops ... subscribe() is missing so nothing happens
    this.usersService.deleteUser(user.id);
    */
  }

  edit(user) {
    this.editUser = user;
  }

  search(searchTerm: string) {
    this.editUser = undefined;
    if (searchTerm) {
      this.usersService.searchUsers(searchTerm)
        .subscribe(users => this.users = users);
    }
  }

  update() {
    if (this.editUser) {
      this.usersService.updateUser(this.editUser)
        .subscribe(user => {
          // replace the user in the users list with update from server
          const ix = user ? this.users.findIndex(h => h.id === user.id) : -1;
          if (ix > -1) { this.users[ix] = user; }
        });
      this.editUser = undefined;
    }
  }
}
