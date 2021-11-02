import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaperSelectedComponent } from './paper-selected.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PaperSelectedComponent],
  imports: [
     CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [PaperSelectedComponent]
})
export class PaperSelectedModule { }
