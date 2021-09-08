/* eslint-disable @typescript-eslint/prefer-for-of */
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
  article_citation_count: string;
  publisher: string;
  relationship_level: number;
  type: string;



  constructor(title?: string) {
    this.title = title;
  }
}


export class PaperHeader{
  title: string;
  position: number;

  constructor(title: string, position?: number) {
    this.title = title;
    this.position = position;
  }

  static checkLoadedCol(base: number) {
    const iee: number[] = [null,3,1, 0, 5, 6,12, 13, 8, 9, 10, 11, 15, 22, 29];
    const springLink: number[] = [10,1,6, 0,7, 3, 5,8];
    const scopus: number[] = [16,null , 0, 1, 2, 3, 10, 11, 6, 7, 12, 13, 14, 9, 19, 15];
    const bases: any[][] = [iee, springLink, scopus];
    const header: PaperHeader[] = [
      new PaperHeader('type'),
      new PaperHeader('publication_title'),
      new PaperHeader('authors'),
      new PaperHeader('title'),
      new PaperHeader('year'),
      new PaperHeader('volume'),
      new PaperHeader('doi'),
      new PaperHeader('link'),
      new PaperHeader('start page'),
      new PaperHeader('end page'),
      new PaperHeader('abstract'),
      new PaperHeader('issn'),
      new PaperHeader('isbn'),
      new PaperHeader('article citation count'),
      new PaperHeader('publisher'),
      new PaperHeader('language'),
    ];
    base--;

    const response: PaperHeader[] = [];
    let cont = 0;
    bases[base].filter(h => {
      if (h!=null) {
        header[cont].position = h;
        response.push(header[cont]);
      }
      cont++;
    });

    return response.sort((a, b) => (a.position < b.position ? -1 : 1));

  }
}
