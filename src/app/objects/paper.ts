/* eslint-disable @typescript-eslint/naming-convention */
export class Paper{
  id: number;
  title: string;
  authors: string;
  publication_title: string;
  publication_year: string;
  volume: string;
  start_page: string;
  end_page: string;
  abstract: string;
  issn: string;
  isbn: string;
  doi: string;
  link: string;
  keywords: string;
  search_terms: string;

  paper_review: number;
  status: number;
  issue: string;
  relevanceText: string;
  relevance: string;
  observation: string;
  lenguage: string;
  star: boolean;
  techinique: string;
  approach: string;
  features: string;
  goals: string;
  hypothesis: string;
  research_methodology: string;
  algorithm_comolexity: string;
  future_work: string;
  main_contribuition: string;
  datasets: string;
  languages: string;
  baselines: string;
  evaluation_metrics: string;
  codelink: string;



  constructor(title?: string) {
    this.title = title;
  }
}
