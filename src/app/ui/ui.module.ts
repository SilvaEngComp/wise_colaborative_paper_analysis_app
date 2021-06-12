import { FinishActionComponent } from "./finish-action/finish-action.component";
import { PopUpComponent } from "./pop-up/pop-up.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { InfoComponent } from "./info/info.component";
import { MySelectListComponent } from "./my-select-list/my-select-list.component";
import { MySearchBarComponent } from "./my-search-bar/my-search-bar.component";

@NgModule({
  declarations: [
    SearchBarComponent,
    InfoComponent,
    MySelectListComponent,
    PopUpComponent,
    MySearchBarComponent,
    FinishActionComponent,
  ],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [
    SearchBarComponent,
    InfoComponent,
    MySelectListComponent,
    PopUpComponent,
    MySearchBarComponent,
  ],
  entryComponents: [PopUpComponent, FinishActionComponent],
})
export class UiModule {}
