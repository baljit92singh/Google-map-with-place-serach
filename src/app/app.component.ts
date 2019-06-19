import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AddAddressComponent } from './add-address/add-address.component';

export interface Address {
  addressLine1: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'map-serach';
  addressCtrl = new FormControl();
  filteredAddress: Observable<Address[]>;
  addresses: Address[] = [];
  // lat = 22.7196;
  // lng = 75.8577;
  lat;
  lng;
  zoom: number;
  locationChosen = false;
  viewType = 'roadmap'
  constructor(public dialog: MatDialog) {
    let result = JSON.parse(localStorage.getItem('addressLine1'))
    this.addresses.push(result)
    this.filteredAddress = this.addressCtrl.valueChanges
      .pipe(
        startWith(''),
        map(address => address ? this._filterStates(address) : this.addresses.slice())
      );
    this.setCurrentLocation();
  }

  private _filterStates(value: string): Address[] {
    const filterValue = value.toLowerCase();

    return this.addresses.filter(address => address.addressLine1.toLowerCase().indexOf(filterValue) === 0);
  }

  openAddressDialog() {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      width: '400px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        // this.lat = 
        // this.lng = 
        this.addresses.push(result.addressLine1)
        localStorage.setItem("addressLine1", JSON.stringify(this.addresses));
        //...
        // var storedNames = JSON.parse(localStorage.getItem("names"));
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

  selectionFunction(event){
    console.log(event)
  }
}

