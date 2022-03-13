import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  declarations: [],
  providers: [],
})
export class SharedModule {}
