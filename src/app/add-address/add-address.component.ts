import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { CommonService } from '../common.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})

export class AddAddressComponent implements OnInit {
  @ViewChild('search')
  public serachElementRef: ElementRef
  addressTypeList = ['Home Address', 'Work Address', 'Other Address'];
  addressForm: FormGroup;
  addressLine1 = [];
  latLongs = [];
  latitude: number;
  longitude: number;
  zoom: number;
  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAddressComponent>,
    public commonService: CommonService,
    private mapsAPILoader: MapsAPILoader,
    private zone: NgZone) {
    this.addressForm = this.fb.group({
      addressType: '',
      addressLine1: '',
      addressLine2: '',
    })

  }
  private geoCoder;
  ngOnInit() {
    this.longitude
    // =38.8282;
    this.latitude
    //  =-98.5795;
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      const autocomplete = new google.maps.places.Autocomplete(this.serachElementRef.nativeElement, {
        types: ["address"],
        componentRestrictions: { 'country': 'IN' }
      });
      autocomplete.addListener('place_changed', () => {
        this.zone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.addressForm.controls['addressLine1'].setValue(place.name)
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        })
      })
    })
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      })
    }
  }

  saveAddress() {
    var localData = {
      addressLine1: this.addressForm.controls['addressLine1'].value,
      latitude: this.latitude,
      longitude: this.longitude
    }
    let item = {
      addressType: this.addressForm.controls['addressType'].value,
      addressLine1: localData,
      addressLine2: this.addressForm.controls['addressLine2'].value,
    }
    this.dialogRef.close(item);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
