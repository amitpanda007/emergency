import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from './models/location';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'emergency';
  public isSearching: boolean = false;
  public citySearch!: string;
  public locationList: Location[] = [];

  constructor(
    private _snackBar: MatSnackBar,
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

    this.locationService.locationChanged.subscribe((locations: any) => {
      console.log(locations);
      this.locationList = locations;
    });
  }

  chnageLocation() {
    console.log('Set Location');
    this.isSearching = !this.isSearching;
  }

  cityInputChanged() {
    // console.log(this.citySearch);
    const term = this.citySearch.trim();
    if (term.length > 2) {
      console.log('Start Searching Firebase');
      this.locationService.getContactCollection(term);
    }
  }
}
