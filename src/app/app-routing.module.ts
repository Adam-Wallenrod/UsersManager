import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAddComponent }   from './user-add/user-add.component';
import { UsersComponent }  from './users/users.component';
import { UserDetailsComponent }   from './user-details/user-details.component';

// import { NotFoundComponent }  from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'user-add', component: UserAddComponent },
  { path: 'user-edit/:id', component: UserAddComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: '**',  component: UsersComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
