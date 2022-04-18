import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  collection,
  CollectionReference,
  where,
  query,
  getDocs,
  addDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { Contact } from '../models/contact';
import { NewLocation } from '../models/new-location';

@Injectable()
export class LocationService {
  public locationChanged = new BehaviorSubject('');

  private filterLocation: Location[] = [];

  private locationCol!: CollectionReference;

  public locationDataChanged = new Subject<Location[]>();

  constructor(private firestore: Firestore) {}

  async getContactCollection(partialCity: string) {
    this.filterLocation = [];
    this.locationCol = collection(this.firestore, 'locations');

    const searchTerm = this.capitalizeFirstLetter(partialCity);
    const q = query(this.locationCol, where('name', '>', searchTerm));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((locData) => {
      console.log(locData.id, ' => ', locData.data());
      this.filterLocation.push(locData.data() as Location);
    });
    this.locationDataChanged.next([...this.filterLocation]);
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async requestToAddNewLocation(location: NewLocation) {
    await addDoc(collection(this.firestore, "requests"), {
      cityName: location.cityName,
      stateName: location.stateName,
      pin: location.pin
    });
  }
}
