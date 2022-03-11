import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [
    CommonModule,
    MatCardModule
  ],
  declarations: [],
  providers: [],
})
export class SharedModule {}