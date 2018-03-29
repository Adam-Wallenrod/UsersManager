import { Component, OnInit } from '@angular/core';
import { User } from '../users/user';
import { UsersService } from '../users/users.service';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { CountryService } from './country.service';
import { Country } from './country';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.less'],
  providers: [ UsersService, CountryService ]
})
export class UserAddComponent implements OnInit {

  formdata;
  users: User[];
  countries: Country[];
  editUser: User;
  id :number;

  constructor(
    private usersService: UsersService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.getUsers();
    this.getCountries();
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([
         Validators.required,
         Validators.minLength(5)
      ])),
      surname: new FormControl("", Validators.compose([
         Validators.required,
         Validators.minLength(2)
      ])),
      sex: new FormControl("", Validators.compose([
         Validators.required,
     ])),
       city: new FormControl("", Validators.compose([
          Validators.required,
      ])),
      country: new FormControl("", Validators.compose([
         Validators.required,
     ])),

    });


    if(this.id == 0){
      console.log('adding new');
    }else{

      console.log('edditing');
      this.usersService.searchUserById(this.id)
        .subscribe(data => {this.editUser = data;

        this.formdata.setValue({
          name: data.name,
          surname: data.surname,
          sex: data.sex,
          city: data.city,
          country: data.country});
        });
    }
  }

  getUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
  }

  getCountries(): void {
    this.countryService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  addOrUpdate(name: string, surname: string, sex: string, city: string, country: string):void{
    if(this.id == 0){
      this.add(name, surname, sex, city, country);
    }else{
      this.update(this.id, name, surname, sex, city, country);
    }

    this.router.navigate(['users'], {});

 }

 deleteUser(): void {

   if(this.id != 0){
     this.usersService.deleteUser(this.id).subscribe();
   }

   this.router.navigate(['users'], {});
 }


  update(id: number, name: string, surname: string, sex: string, city: string, country: string): void {

    this.editUser.name = name;
    this.editUser.surname = surname;
    this.editUser.sex = sex;
    this.editUser.city = city;
    this.editUser.country = country;

    this.usersService.updateUser(this.editUser).subscribe();
  }

  add(name: string, surname: string, sex: string, city: string, country: string): void {
    this.editUser = undefined;

    name = name.trim();
    if (!name) { return; }

    surname = surname.trim();
    if (!surname) { return; }

    sex = sex.trim();
    if (!sex) { return; }

    city = city.trim();
    if (!city) { return; }

    country = country.trim();
    if (!country) { return; }


    const newUser: User = { name, surname, sex, city, country } as User;
    this.usersService.addUser(newUser)
      .subscribe(user => this.users.push(user));
  }

  onClickSave(data) {
    this.addOrUpdate( data.name, data.surname, data.sex, data.city, data.country);
  }

  get name() {
      return this.formdata.get('name');
  }

  get surname() {
      return this.formdata.get('surname');
  }

  get sex() {
      return this.formdata.get('sex');
  }

  get city() {
      return this.formdata.get('city');
  }

  get country() {
      return this.formdata.get('country');
  }
}
