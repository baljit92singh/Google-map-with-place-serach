import { Component, OnInit } from '@angular/core';
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

export class AppComponent implements OnInit {
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


    this.setCurrentLocation();
  }


  openAddressDialog() {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      width: '400px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let response = result.addressLine1
        this.addressList.push(response)
        localStorage.setItem("addressLine1", JSON.stringify(this.addressList));
        this.addressLocalForm.controls['addressCtrl'].setValue(result.addressLine1.addressLine1)
        this.lat = result.addressLine1.latitude;
        this.lng = result.addressLine1.longitude;
      }
    });
  }

  onChoseLocation(event) {
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
    this.lat = event.source.value.latitude;
    this.lng = event.source.value.longitude;
    this.addressLocalForm.controls['addressCtrl'].setValue(event.source.value.addressLine1)
  }
  ngOnInit() {
    if (JSON.parse(localStorage.getItem('addressLine1'))) {
      this.addressList = JSON.parse(localStorage.getItem('addressLine1'))
    } else {
      console.log("there is noting in local storage.")
    }
  }
}

