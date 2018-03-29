import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../users/user';
import { UsersService } from '../users/users.service';
import { WeatherService } from './weather.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less'],
  providers: [ UsersService, WeatherService]
})
export class UserDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private usersService: UsersService,
    private weatherService: WeatherService) { }

  id :number;
  user: User;
  humidity: object;
  temperature: object;

  ngOnInit() {

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.usersService.searchUserById(this.id)
      .subscribe(user => {this.user = user;

        this.weatherService.getHumidity(this.user.city)
         .subscribe(data => this.humidity = data );

        this.weatherService.getTemperature(this.user.city)
          .subscribe(data => this.temperature = data );
      });
  }

}
