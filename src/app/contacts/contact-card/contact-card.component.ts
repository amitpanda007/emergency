import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ContactInfo } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';
import { ContactPopUpDialogComponent } from '../contact-popup/contact-popup-dialog.component';
import {
  ContactReporttDialogComponent,
  ContactReporttDialogResult,
} from '../contact-report/contact-report-dialog.component';

@Component({
  selector: 'contact-card',
  templateUrl: 'contact-card.component.html',
  styleUrls: ['contact-card.component.scss'],
})
export class ContactCardComponent implements OnInit {
  @Input() contact: ContactInfo | null = null;
  public contactNameWithNumber: string = '';

  constructor(
    private dialog: MatDialog,
    private contactService: ContactService
  ) {}

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
    const city = window.localStorage.getItem('city');

    const dialogRef = this.dialog.open(ContactReporttDialogComponent, {
      width: '450px',
      data: {
        contactInfo: contactInfo,
        city: city,
      },
    });

    dialogRef.afterClosed().subscribe((result: ContactReporttDialogResult) => {
      if (!result) {
        return;
      }

      if (result.problemText) {
        this.contactService.reportContact(
          result.contactDetail,
          result.problemText
        );
      }
    });
  }

  cardSelect() {
    const dialogRef = this.dialog.open(ContactPopUpDialogComponent, {
      width: '450px',
      data: {
        contact: this.contact,
      },
    });
  }
}
