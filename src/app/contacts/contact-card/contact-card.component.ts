import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'contact-card',
  templateUrl: 'contact-card.component.html',
  styleUrls: ['contact-card.component.scss'],
})
export class ContactCardComponent implements OnInit {
  @Input() contact: Contact | null = null;
  public contactNameWithNumber: string = '';
  ngOnInit(): void {
    this.contactNameWithNumber =
      this.contact?.name + ' ( ' + this.contact?.number + ' ) ';
  }

  call() {
    const callLink = document.createElement('a');
    callLink.href = `tel:${this.contact?.number}`;
    callLink.click();
  }

  report() {
    console.log('Reporting current contact');
  }
}
