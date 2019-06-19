import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public http: HttpClient) { }
  /* https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY */
  // getGoogleAddress(value) {
  //   return this.http.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/output?parameters')
  // }

  getGoogleAddress(value?) {
    return this.http.get('https://ipapi.co/{ip}/{format}/')
  }
}
