import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-search-dialog',
  templateUrl: './location-search-dialog.component.html',
  styleUrls: ['./location-search-dialog.component.scss'],
})
export class LocationSearchDialogComponent implements OnInit {
  private locationSearchSubscription!: Subscription;
  public citySearch!: string;
  public locationList!: Array<Location>;

  constructor(
    public dialogRef: MatDialogRef<LocationSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LocationDialogData,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    // this.locationSearchSubscription =
    //   this.locationService.locationDataChanged.subscribe((locations: any) => {
    //     console.log(locations);
    //     this.locationList = locations;
    //   });

    this.locationSearchSubscription =
      this.locationService.locationSearchData.subscribe((locations: any) => {
        this.locationList = locations;
      });
  }

  ngOnDestroy(): void {
    this.locationSearchSubscription.unsubscribe();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  cityInputChanged() {
    // console.log(this.citySearch);
    const term = this.citySearch.trim();
    if (term.length > 2) {
      console.log('Start Searching Firebase');
      // this.locationService.getContactCollection(term);
      this.locationService.getCountryByName(term);
    }
  }

  selectLocation(cityName: string): void {
    console.log(cityName);
    this.dialogRef.close({ selectedCity: cityName });
  }
}

export interface LocationDialogData {
  message: string;
}

export interface LocationDialogResult {
  selectedCity: string;
}
