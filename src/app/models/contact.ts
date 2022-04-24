export interface Contact {
  location: Array<string>;
  contactInfos: ContactInfos;
}

export interface ContactInfos {
  centralNumbers: ContactInfo[];
  majorHelplines: ContactInfo[];
  userProvidedNumbers: ContactInfo[];
}

export interface ContactInfo {
  name: string;
  description: string;
  telephone: string;
}
