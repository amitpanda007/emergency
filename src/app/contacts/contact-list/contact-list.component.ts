import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-list',
  templateUrl: 'contact-list.component.html',
  styleUrls: ['contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
    public contactList = [1, 2, 3, 4, 5];
    ngOnInit(): void {}
}
