import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  collection,
  onSnapshot,
  DocumentReference,
  docSnapshots,
  CollectionReference,
  collectionSnapshots,
  where,
  query,
  getDocs,
  startAt,
} from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable()
export class LocationService {
  private filterLocation: Location[] = [];

  private locationCol!: CollectionReference;

  public locationChanged = new Subject<Location[]>();

  constructor(private firestore: Firestore) {}

  async getContactCollection(partialCity: string) {
    this.locationCol = collection(this.firestore, 'locations');

    const searchTerm = this.capitalizeFirstLetter(partialCity);
    const q = query(this.locationCol, where("name", ">", searchTerm));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((locData) => {
      console.log(locData.id, ' => ', locData.data());
      this.filterLocation.push(locData.data() as Location);
    });
    this.locationChanged.next([...this.filterLocation]);
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
