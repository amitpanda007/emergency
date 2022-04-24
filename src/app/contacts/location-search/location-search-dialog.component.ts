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
  public selectedCity!: string;

  constructor(
    public dialogRef: MatDialogRef<LocationSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LocationDialogData,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.locationSearchSubscription =
      this.locationService.citySearchData.subscribe((locations: Location[]) => {
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
      setTimeout(() => {
        this.locationService.getCityByName(term.toLocaleLowerCase());
      }, 300);
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
