import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AddAddressComponent } from './add-address/add-address.component';

// export class marker {
//   addressLine1: string
//   latitude: number
//   longitude: number
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'map-serach';
  addressLocalForm: FormGroup
  addressCtrl = new FormControl();
  addressList = []
  //  = [
  //   {
  //     addressLine1: "",
  //     latitude: "",
  //     longitude: ""
  //   }
  // ];
  // lat = 22.7196;
  // lng = 75.8577;
  lat;
  lng;
  zoom: number;
  locationChosen = false;
  viewType = 'roadmap'
  searchData = [];
  constructor(public dialog: MatDialog, public fb: FormBuilder) {
    this.addressLocalForm = this.fb.group({
      addressCtrl: new FormControl("")
    })
    this.addressList = JSON.parse(localStorage.getItem('addressList'))
    this.setCurrentLocation();
  }


  openAddressDialog() {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      width: '400px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.addressList.push(result)
        localStorage.setItem("addressLine1", JSON.stringify(this.addressList));
      }
    });
  }

  onChoseLocation(event) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }

  capture() {
    // this.viewType
  }

  tarrain() {
    this.viewType = 'terrain'
  }

  satellite() {
    this.viewType = 'satellite'
  }

  road() {
    this.viewType = 'roadmap'
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  selectionFunction(event) {
    console.log(event.source.value)
  }
}

