import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewLocation } from 'src/app/models/new-location';

@Component({
  selector: 'app-contact-report-dialog',
  templateUrl: './contact-report-dialog.component.html',
  styleUrls: ['./contact-report-dialog.component.scss'],
})
export class ContactReporttDialogComponent{
  public problemText!: string;

  constructor(
    public dialogRef: MatDialogRef<ContactReporttDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactReporttDialogData
  ) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submitRequest() {
    this.dialogRef.close({problemText: this.problemText, contactDetail: this.data});
  }
}

export interface ContactReporttDialogData {
  city: string;
  contactInfo : ContactInfo;
}

export interface ContactReporttDialogResult {
  problemText: string;
  contactDetail:  ContactReporttDialogData;
}

export interface ContactInfo {
  name: string;
  description: string;
  telephone: string;
}