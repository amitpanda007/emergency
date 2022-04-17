export interface Contact {
  location: string;
  contactInfos: ContactInfo[];
}

export interface ContactInfo {
  name: string;
  description: string;
  telephone: string;
}
