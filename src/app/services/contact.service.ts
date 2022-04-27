import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  CollectionReference,
  getDocs,
  query,
  addDoc,
} from '@angular/fire/firestore';
import { where } from '@firebase/firestore';
import { enableIndexedDbPersistence } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { ContactReporttDialogData } from '../contacts/contact-report/contact-report-dialog.component';
import { Contact } from '../models/contact';

@Injectable()
export class ContactService {
  private allContacts!: Contact;

  private contactColRef!: CollectionReference;

  public contactsChanged = new Subject<Contact>();

  constructor(private firestore: Firestore) {}

  async getContactCollection(location: string) {
    console.log(location);
    const contactColRef = collection(this.firestore, 'contacts');
    const q = query(
      contactColRef,
      where('location', 'array-contains-any', [location])
    );

    const querySnapshot = await getDocs(q);
    const firstDocument = querySnapshot.docs[0];

    if (firstDocument) {
      this.allContacts = firstDocument.data() as Contact;
      this.contactsChanged.next(this.allContacts);
    } else {
      this.contactsChanged.next();
    }
  }

  async reportContact(
    contactDetail: ContactReporttDialogData,
    problemText: string
  ) {
    await addDoc(collection(this.firestore, 'reports'), {
      problemText: problemText,
      dateCreated: new Date(),
      contactDetail: contactDetail,
    });
  }
}
