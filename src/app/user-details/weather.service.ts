import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Injectable()
export class WeatherService {

  hostUrl = 'https://query.yahooapis.com/v1/public/';


  constructor(private http: HttpClient) {}

  getHumidity(city : string) : Observable<Object> {

    const humidityUrl = this.hostUrl+'yql?q=select%20atmosphere.humidity%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+city+'%22)%20and%20u%3D%22c%22%20&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    return this.http.get(humidityUrl)
  }

  getTemperature(city : string) : Observable<Object> {

      const temperatureUrl = this.hostUrl+'yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+city+'%22)%20and%20u%3D%22c%22%20&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
      return this.http.get(temperatureUrl)
  }

}
