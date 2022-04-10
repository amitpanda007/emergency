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
} from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable()
export class ContactService {
  private allContacts: Contact[] = [];

  private contactCol!: CollectionReference;

  public contactsChanged = new Subject<Contact[]>();

  constructor(private firestore: Firestore) {}

  getContactCollection() {
    this.contactCol = collection(this.firestore, 'contacts');

    collectionSnapshots(this.contactCol).subscribe((data) => {
      data.forEach((colData) => {
        console.log(colData.data());
        this.allContacts.push(colData.data() as Contact);
      });
      this.contactsChanged.next([...this.allContacts]);
    });
  }
}
