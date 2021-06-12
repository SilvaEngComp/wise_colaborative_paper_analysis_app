/* eslint-disable @typescript-eslint/naming-convention */
export class Paper{
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
  inspec_controlled_terms: string;
  not_inspec_controlled_terms: string;
  mesh_terms: string;

  constructor(title?: string) {
    this.title = title;
  }
}
