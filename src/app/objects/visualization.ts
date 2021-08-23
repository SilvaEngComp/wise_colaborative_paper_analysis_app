export class WordCaount{
  word: string;
  ocorrency: number;

  constructor(word: string, ocorrency: number) {
    this.word = word;
    this.ocorrency = ocorrency;
  }
}
export class VisualizationCols {
  title: boolean;
  approach: boolean;
  issue: boolean;
  technique: boolean;
  year: boolean;
  relevance: boolean;
  observation: boolean;

  constructor() {
    this.title = true;
    this.relevance = true;
    this.issue = true;
    this.year = true;
    this.observation = false;
    this.technique = false;
    this.approach = false;
  }
}
