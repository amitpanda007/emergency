import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from './models/location';
import { LocationService } from './services/location.service';
import {MatDialog} from '@angular/material/dialog';
import { LocationSearchDialogComponent } from './contacts/location-search/location-search-dialog.component';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'emergency';
  public locationChanged = new BehaviorSubject("");
  public isSearching: boolean = false;
  public locationList: Location[] = [];
  public currentLocation!: string;

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    if ((navigator as any).standalone == false) {
      // This is an iOS device  and we are in browser
      this._snackBar.open('You cna add this PWA to the Home Screen', '', {
        duration: 3000,
      });
    }

    if ((navigator as any).standalone == undefined) {
      // It's not iOS
      if (window.matchMedia('(display-mode: browser').matches) {
        // We are in the browser
        window.addEventListener('beforeinstallprompt', (event) => {
          event.preventDefault();
          const sb = this._snackBar.open(
            'Do you want to install this App?',
            'install',
            { duration: 5000 }
          );
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then((result: any) => {
              if (result.outcome == 'dismissed') {
                //TODO: Track on installation
              } else {
                //TODO: It was installed
              }
            });
          });
          return false;
        });
      }
    }

    const city = window.localStorage.getItem('city');
    this.currentLocation = city ? city : "Set Location";
    this.locationChanged.subscribe(cityChanged => {
      if(cityChanged != "") {
        this.currentLocation = cityChanged;
      }else {
        this.currentLocation = "Set Location";
      }
    });
  }

  ngOnDestroy() {
    this.locationChanged.unsubscribe();
  }

  chnageLocation() {
    console.log('Set Location');
    this.isSearching = !this.isSearching;
    const dialogRef = this.dialog.open(LocationSearchDialogComponent, {
      width: '450px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.selectedCity) {
        this.locationChanged.next(result.selectedCity);
        window.localStorage.setItem('city', result.selectedCity);
      }
    });
  }

  removeLocation() {
    this.locationChanged.next("");
    window.localStorage.removeItem('city');
  }
}
