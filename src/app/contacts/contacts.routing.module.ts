
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactCardComponent } from "./contact-card/contact-card.component";
import { ContactListComponent } from "./contact-list/contact-list.component";

const routes: Routes = [
  {
    path: "contacts",
    component: ContactListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {
  static components = [ContactListComponent , ContactCardComponent];
}