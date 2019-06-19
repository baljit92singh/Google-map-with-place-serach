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

  ngOnInit() {
    this.longitude 
    // =38.8282;
    this.latitude
    //  =-98.5795;
    this.addressForm.controls['addressLine1'].valueChanges
      .subscribe(res => {

        console.log(res);
      })
    this.mapsAPILoader.load().then(() => {
      console.log(this.serachElementRef.nativeElement);
      const autocomplete = new google.maps.places.Autocomplete(this.serachElementRef.nativeElement, {
        types: [],
        componentRestrictions: { 'country': 'IN' }
      });
      console.log(autocomplete);
      autocomplete.addListener('place_changed', () => {
        this.zone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          const latlong = {
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng
          }
          this.latLongs.push(latlong)
          console.log(this.latLongs)
        })
      })
    })
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      })
    }
  }

  saveAddress() {
    let item = {
      addressType: this.addressForm.controls['addressType'].value,
      addressLine1: this.addressForm.controls['addressLine1'].value,
      addressLine2: this.addressForm.controls['addressLine2'].value,
    }
    this.dialogRef.close(item);
    console.log(item)
  }
}
