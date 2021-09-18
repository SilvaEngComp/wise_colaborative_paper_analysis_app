import { Paper } from 'src/app/objects/paper';
/* eslint-disable @typescript-eslint/naming-convention */



export class PaperCSV{
    id: string;
    main_contribuition: string;
    title: string;
    research_methodology: string;
    approach: string;
    evaluation_metrics: string;
    codelink: string;
    hypothesis: string;
    techinique: string;
    future_work: string;
    issue: string;
    goals: string;
  imposto_total: string;
  open_works: string;
  languages: string;
  baselines: string;
  datasets: string;
  algorithm_comolexity: string;
  observation: string;
  doi: string;


    constructor(paper: Paper, id: string) {

        if (paper) {
            this.id = id;

            if (paper.doi) {
                this.doi = paper.doi;
            }
            if (paper.title) {
                this.title = paper.title;
            }

            if (paper.issue) {
                this.issue = paper.issue;
            }

            if (paper.goals) {
                this.goals = paper.goals;
            }


            if (paper.research_methodology) {
                this.research_methodology = paper.research_methodology;
            }

            if (paper.approach) {
                this.approach = paper.approach;
          }
           if (paper.main_contribuition) {
                this.main_contribuition = paper.main_contribuition;
            }

            if (paper.techinique) {
              this.techinique = paper.techinique;
            }

            if (paper.future_work) {
              this.future_work = paper.future_work;
            }

            if (paper.hypothesis) {
              this.hypothesis = paper.hypothesis;
            }

            if (paper.evaluation_metrics) {
              this.evaluation_metrics = paper.evaluation_metrics;
            }

            if (paper.codelink) {
              this.codelink = paper.codelink;
            }
            if (paper.algorithm_comolexity) {
              this.algorithm_comolexity = paper.algorithm_comolexity;
          }

          if (paper.baselines) {
              this.baselines = paper.baselines;
            }
          if (paper.datasets) {
              this.datasets = paper.datasets;
          }

          if (paper.languages) {
              this.languages = paper.languages;
          }

          if (paper.open_works) {
              this.open_works = paper.open_works;
          }

          if (paper.observation) {
              this.observation = paper.observation;
            }

        }

  }

  static organize(text: string) {
    const z = text.split(';');
    let y = '';

    z.filter(x => {
      y += ' - ' + x ;
    });
  return y;
  }

  static getTable(csvHeader: CsvHeader[], relatorio: PaperCSV[]): any[][] {

        const csvtable: any[][] = [];

    const headerAux: string[] = [];
    console.log(csvHeader);
        csvHeader.filter(
            (h) => {
                if (h.checked) {
                    headerAux.push(h.name);
                }
            }
        );
        csvtable.push(headerAux);
        relatorio.filter(
            (r) => {
                const relatorioList: any[] = [];
                csvHeader.filter(
                    c => {
                        if (c.name === 'doi' && c.checked) {
                            if (r.doi) {
                            relatorioList.push(r.doi);
                            } else {
                                relatorioList.push('');
                            }
                        }
                        else if (c.name === 'id' && c.checked) {
                              if (r.id) {
                            relatorioList.push(r.id);
                            } else {
                                relatorioList.push('');
                            }
                        }
                        else if (c.name === 'main_contribuition' && c.checked) {
                              if (r.main_contribuition) {
                            relatorioList.push(PaperCSV.organize(r.main_contribuition));
                            } else {
                                relatorioList.push('');
                            }
                        }
                        else if (c.name === 'open_works' && c.checked) {
                             if (r.open_works) {
                             relatorioList.push(PaperCSV.organize(r.open_works));
                            } else {
                                relatorioList.push('');
                            }
                        }
                        else if (c.name === 'research_methodology' && c.checked) {
                              if (r.research_methodology) {
                             relatorioList.push(PaperCSV.organize(r.research_methodology));
                            } else {
                                relatorioList.push('');
                            }
                        }
                        else if (c.name === 'approach' && c.checked) {
                              if (r.approach) {
                             relatorioList.push(PaperCSV.organize(r.approach));
                            } else {
                                relatorioList.push('');
                            }
                        }
                        else if (c.name === 'evaluation_metrics' && c.checked) {
                              if (r.evaluation_metrics) {
                            relatorioList.push(PaperCSV.organize(r.evaluation_metrics));
                            } else {
                                relatorioList.push('');
                            }
                        }
                        else if (c.name === 'codelink' && c.checked) {
                              if (r.codelink) {
                            relatorioList.push(r.codelink);
                            } else {
                                relatorioList.push('');
                            }
                        }
                        else if (c.name === 'hypothesis' && c.checked) {
                              if (r.hypothesis) {
                            relatorioList.push(PaperCSV.organize(r.hypothesis));
                            } else {
                                relatorioList.push('');
                            }
                        }
                        else if (c.name === 'techinique' && c.checked) {
                              if (r.techinique) {
                            relatorioList.push(PaperCSV.organize(r.techinique));
                            } else {
                                relatorioList.push('');
                            }
                        }
                        else if (c.name === 'future_work' && c.checked) {
                              if (r.future_work) {
                            relatorioList.push(PaperCSV.organize(r.future_work));
                            } else {
                                relatorioList.push('');
                            }
                        }
                        else if (c.name === 'issue' && c.checked) {
                              if (r.issue) {
                            relatorioList.push(PaperCSV.organize(r.issue));
                            } else {
                                relatorioList.push('');
                            }
                        }
                        else if (c.name === 'title' && c.checked) {
                              if (r.title) {
                            relatorioList.push(r.title);
                            } else {
                                relatorioList.push('');
                            }
                        }   else if (c.name === 'goals' && c.checked) {
                          if (r.goals) {
                            console.log(r.goals);
                            relatorioList.push(PaperCSV.organize(r.goals));
                            } else {
                                relatorioList.push('');
                            }
                        }else if (c.name === 'observation' && c.checked) {
                              if (r.observation) {
                            relatorioList.push(PaperCSV.organize(r.observation));
                            } else {
                                relatorioList.push('');
                            }
                        }else if (c.name === 'open_works' && c.checked) {
                              if (r.open_works) {
                            relatorioList.push(PaperCSV.organize(r.open_works));
                            } else {
                                relatorioList.push('');
                            }
                        }

                    }
                );
                csvtable.push(relatorioList);
            }
        );
        return csvtable;
    }


    static headersOptions(): CsvHeader[] {
        const options: CsvHeader[] = [];
        const names: string[] = [
            'id',
          'title',
            'goals',
            'main_contribuition',
             'issue',
            'research_methodology',
            'approach',
          'evaluation_metrics',
            'future_work',
            'codelink',
            'hypothesis',
            'techinique',
            'open_works',
            'observation',];


        names.filter(
            (name) => {
                options.push(new CsvHeader(name));
            });

        return options;
  }

    static header(selectedHeaders:  CsvHeader[]): string[] {
        const csvHeader: string[] = [];

        selectedHeaders.filter(
            (selected) => {
                if (selected.checked) {
                    csvHeader.push(selected.name);
                }
            }
        );
        return csvHeader;
        // return  [ 'name', 'techinique',  'marca','open_works','research_methodology', 'approach','evaluation_metrics','codelink'];
    }

  static getRelatorio(papers: Paper[]) {
    const relatorio: PaperCSV[] = [];
    let cont = 1;
    papers.filter(
      (paper) => {
        const id = 'P' + cont;
        relatorio.push(new PaperCSV(paper, id));
        cont++;
          }
        );

        return relatorio;
    }
}

export class CsvHeader{
    name: string;
    checked: boolean;
    constructor(name?: string, checked: boolean = true) {
        this.name = name;
        this.checked = checked;
    }
}

