import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact';
import { NewLocation } from 'src/app/models/new-location';
import { ContactService } from 'src/app/services/contact.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { LocationService } from 'src/app/services/location.service';
import {
  LocationRequestDialogComponent,
  LocationRequestDialogResult,
} from '../location-request/location-request-dialog.component';

@Component({
  selector: 'contact-list',
  templateUrl: 'contact-list.component.html',
  styleUrls: ['contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  @ViewChild('contentCardOneRef') contentCardOneRef!: ElementRef;

  public isLoading: boolean = false;
  public contactList!: Contact;
  public isLocationSet: boolean = false;
  public isExpandedOne: boolean = false;
  public isExpandedTwo: boolean = false;
  public isExpandedThree: boolean = false;

  constructor(
    private contactService: ContactService,
    private locationService: LocationService,
    private dialog: MatDialog,
    private renderer: Renderer2
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    const currentCity = this.checkCurrentCity();
    this.locationService.locationChanged.subscribe((location) => {
      this.contactService.getContactCollection(location);
    });

    this.contactService.getContactCollection(currentCity);
    this.contactService.contactsChanged.subscribe((contacts) => {
      this.contactList = contacts;
      this.isLoading = false;
      this.checkCurrentCity();
    });
  }

  checkCurrentCity(): string {
    const currentCity: string = window.localStorage.getItem('city') as string;
    if (currentCity != null) {
      this.isLocationSet = true;
    } else {
      this.isLoading = false;
      this.isLocationSet = false;
    }
    return currentCity;
  }

  requestNewCity() {
    let dislogRef = this.dialog.open(LocationRequestDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dislogRef.afterClosed().subscribe((result: LocationRequestDialogResult) => {
      if (!result) {
        return;
      }
      const newCity: NewLocation = result.newCity;
      this.locationService.requestToAddNewLocation(newCity);
    });
  }

  collapseExpand(data: string) {
    if (data == 'one') {
      this.isExpandedOne = !this.isExpandedOne;
      
    } else if (data == 'two') {
      this.isExpandedTwo = !this.isExpandedTwo;
    } else if (data == 'three') {
      this.isExpandedThree = !this.isExpandedThree;
    }
  }
}
