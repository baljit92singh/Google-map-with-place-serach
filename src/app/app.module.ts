import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddAddressComponent } from './add-address/add-address.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './other/filter';

@NgModule({
  declarations: [
    AppComponent,
    AddAddressComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_API_KEY',
      libraries: ['places']
    }),
    HttpClientModule,
  ],
  providers: [],
  entryComponents: [AddAddressComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
