import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'contact-list',
  templateUrl: 'contact-list.component.html',
  styleUrls: ['contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  public contactList: Contact[] = [
    {
      name: 'Police',
      description: 'Police Central Help Line',
      location: 'Bhubaneswar',
      number: '100',
    },
    {
      name: 'Fire Station',
      description: 'Fire Station',
      location: 'Bhubaneswar',
      number: '101',
    },
    {
      name: 'Ambulance',
      description: 'Ambulance Central Help Line',
      location: 'Bhubaneswar',
      number: '108',
    },
    {
      name: 'Ambulance ( Janani )',
      description: 'Ambulance ( Janani ) Help Line',
      location: 'Bhubaneswar',
      number: '102',
    },
    {
      name: 'Senior Citizen Helpline',
      description: '',
      location: 'Bhubaneswar',
      number: '1090',
    },
    {
      name: 'Traffic Control',
      description: '',
      location: 'Bhubaneswar',
      number: '1095',
    },
    {
      name: 'Child Help Line',
      description: '',
      location: 'Bhubaneswar',
      number: '1098',
    },
    {
      name: 'Coastal Helpline',
      description: '',
      location: 'Bhubaneswar',
      number: '1093',
    },
    {
      name: 'N.H.A.I Helpline',
      description: '',
      location: 'Bhubaneswar',
      number: '1093',
    },
    {
      name: 'Women Helpline',
      description: '',
      location: 'Bhubaneswar',
      number: '1091',
    },
    {
      name: 'Women Helpline',
      description: '',
      location: 'Bhubaneswar',
      number: '181',
    },
  ];
  ngOnInit(): void {}
}
