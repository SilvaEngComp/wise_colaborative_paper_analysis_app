export class WordCaount{
  word: string;
  ocorrency: number;

  constructor(word: string, ocorrency: number) {
    this.word = word;
    this.ocorrency = ocorrency;
  }
}
export class VisualizationCols {
  title: string;
  show: boolean;


  constructor(title: string, show: boolean) {
    this.title = title;
    this.show = show;
  }
}
