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
  relevance: string;
  observation: string;
  star: boolean;

  constructor(title?: string) {
    this.title = title;
  }
}
