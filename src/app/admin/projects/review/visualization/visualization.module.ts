import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationComponent } from './visualization.component';
import { WordRankingComponent } from './word-ranking/word-ranking.component';
import { UiModule } from 'src/app/ui/ui.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MenuVisualizationComponent } from './menu-visualization/menu-visualization.component';



@NgModule({
  declarations: [
    VisualizationComponent,
    MenuVisualizationComponent,
    WordRankingComponent,],
  imports: [
      CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    UiModule,
    PipesModule,
  ],
  exports: [VisualizationComponent],
  entryComponents:[MenuVisualizationComponent, WordRankingComponent]
})
export class VisualizationModule { }
