import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact';
import { NewLocation } from 'src/app/models/new-location';
import { PlaceLocation } from 'src/app/models/placelocation';
import { ContactService } from 'src/app/services/contact.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { LocationService } from 'src/app/services/location.service';
import { LocationRequestDialogComponent, LocationRequestDialogResult } from '../location-request/location-request-dialog.component';

@Component({
  selector: 'contact-list',
  templateUrl: 'contact-list.component.html',
  styleUrls: ['contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {

  public contactList!: Contact;
  public isLocationSet: boolean = false;

  constructor(
    private geolocation: GeolocationService,
    private contactService: ContactService,
    private locationService: LocationService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    // this.geolocation.requestLocation((location: PlaceLocation) => {
    //   if (location) {
    //     console.log(location.latitude);
    //     console.log(location.longitude);
    //     const url = this.geolocation.getMapLink(location);
    //     console.log(url);
    //   }
    // });

    const currentCity: string = window.localStorage.getItem('city') as string;
    if(currentCity != null) {
      this.isLocationSet = true;
    }
    this.locationService.locationChanged.subscribe((location) => {
      this.contactService.getContactCollection(location);
    });

    this.contactService.getContactCollection(currentCity);
    this.contactService.contactsChanged.subscribe((contacts) => {
      console.log(contacts);
      this.contactList = contacts;
    });
  }

  requestNewCity() {
    let dislogRef = this.dialog.open(LocationRequestDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dislogRef.afterClosed().subscribe((result: LocationRequestDialogResult) => {
      const newCity: NewLocation = result.newCity;
      this.locationService.requestToAddNewLocation(newCity);
    });

    
  }
}
