import { Component, Input, OnInit } from '@angular/core';
import { Contact, ContactInfo } from 'src/app/models/contact';

@Component({
  selector: 'contact-card',
  templateUrl: 'contact-card.component.html',
  styleUrls: ['contact-card.component.scss'],
})
export class ContactCardComponent implements OnInit {
  @Input() contact: ContactInfo | null = null;
  public contactNameWithNumber: string = '';
  ngOnInit(): void {
    this.contactNameWithNumber =
      this.contact?.name + ' ( ' + this.contact?.telephone + ' ) ';
  }

  call(contactInfo: ContactInfo) {
    const callLink = document.createElement('a');
    callLink.href = `tel:${contactInfo?.telephone}`;
    callLink.click();
  }

  report(contactInfo: ContactInfo) {
    console.log('Reporting current contact');
  }
}
