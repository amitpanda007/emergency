import { Injectable } from '@angular/core';
import { Firestore, doc, collection, onSnapshot, DocumentReference, docSnapshots, CollectionReference, collectionSnapshots } from '@angular/fire/firestore';

@Injectable()
export class ContactService {
    postCol!: CollectionReference;

    constructor(private firestore: Firestore) {}

    getPostCollection() {
        this.postCol = collection(this.firestore, 'posts');
        
        collectionSnapshots(this.postCol).subscribe(data => {
            data.forEach(colData => {
                console.log(colData.data());
            })
        });
    }

}