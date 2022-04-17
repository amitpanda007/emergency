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
  getDocs,
  query,
} from '@angular/fire/firestore';
import { where } from '@firebase/firestore';
import { Subject } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable()
export class ContactService {
  private allContacts!: Contact;

  private contactColRef!: CollectionReference;

  public contactsChanged = new Subject<Contact>();

  constructor(private firestore: Firestore) {}

  async getContactCollection(location: string) {
    const contactColRef = collection(this.firestore, 'contacts');
    const q = query(contactColRef, where('location', '==', location));

    const querySnapshot = await getDocs(q);
    const firstDocument = querySnapshot.docs[0];

    if (firstDocument) {
      this.allContacts = firstDocument.data() as Contact;
      this.contactsChanged.next(this.allContacts);
    }
  }
}
