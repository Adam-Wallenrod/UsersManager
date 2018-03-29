import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { UserAddComponent } from './user-add/user-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserAddComponent,
    UserDetailsComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {
        dataEncapsulation: false,
        passThruUnknownUrl: true,
        put204: false
      }
    ),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
