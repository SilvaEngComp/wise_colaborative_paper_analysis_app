/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Paper } from 'src/app/objects/paper';
import { WordCaount } from 'src/app/objects/visualization';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-word-ranking',
  templateUrl: './word-ranking.component.html',
  styleUrls: ['./word-ranking.component.scss'],
})
export class WordRankingComponent implements OnInit {

  papers: Paper[];
  issueLlist: WordCaount[]=[];
  abstractLlist: WordCaount[]=[];

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem(environment.LOCALSTORAGE + 'vps')) {
        this.papers = JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'vps'));
    }
    this.wordsCount();
  }

  wordsCount() {
    const baseWords = new Set(['', 'na', 'se', 'no', 'são', 'tem', 'era', 'ter', 'ver', 'ou', 'seu', 'sua', 'meu', 'minha', 'teu', 'tua', 'nós', 'vós', 'ele', 'eles', 'propõe', 'o', 'os', 'as', 'a', 'que', 'às', 'do', 'da', 'dos', 'das', 'ante', 'após', 'até', 'com', 'contra', 'de', 'desde', 'em', 'entre', 'para', 'perante', 'por', 'per', 'sem', 'sob', 'sobre', 'trás', 'um', 'uma', 'uns', 'umas', 'e', 'mais', 'alémdisso', 'também', 'emadição', 'some-seaisto', 'somando', 'acrescenta-setambém', 'apropósito', 'também', 'portanto', 'assim', 'dessaforma', 'conclui-seque', 'resumindo', 'então', 'poroutrolado', 'aopassoque', 'recomenda-se', 'devido', 'porisso', 'porsuavez', 'dessaforma', 'domesmomodo', 'igualmente', 'comcerteza', 'possivelmente', 'demuito', 'depouco', 'detodo', 'bastante', 'demasiadamente', 'profundamente', 'qualquerqueseja', 'assimque', 'emseguida', 'atéque', 'quando', 'porfim', 'depoisde', 'antesque', 'porora', 'derepente', 'devezemquando', 'atempo', 'àsvezes', 'dequandoemquando', 'emalgummomento', 'maisadiante', 'durante', 'todavia', 'após', 'porexemplo', 'istoé', 'como', 'decerto', 'provavelmente', 'porcerto', 'quersaber', 'quandosefala', 'oreferido', 'emoutraspalavras', 'emresumo', 'defato', 'emsíntese', 'naverdade', 'deveras', 'certamente', 'realmente', 'efetivamente', 'mas', 'porém', 'entretanto', 'todavia', 'aocontrário', 'emvezde', 'poroutrolado', 'aopassoque', 'ora', 'talvez', 'porventura', 'ademais', 'taiscuidados', 'desde', 'enquanto', 'aoladode', 'sobre', 'sob', 'àdireita', 'nocentro', 'nofundo', 'àfrente', 'àesquerda', 'àtona', 'àdistância', 'àentrada', 'àsaída', 'aofundo', 'aolongo', 'defora', 'delado', 'porfora', 'emfrente', 'pordentro', 'porperto', 'naopiniãode', 'deacordocom', 'afirma', 'para', 'navisãode', 'dopontodevistade', 'segundo', 'exemplifica', 'quandoafirma', 'comocaracteriza', 'emvamosencontraroseguinteesclarecimento', 'nodizerde', 'explicitaseuspressupostos', 'utiliza-sedaseguinteargumentação', 'comodescritopor', 'outroensinamentode', 'alegaque', 'caracteriza', 'conceitua']);

    const baseWords2 = new Set(['','the','has','of','all','enter','to','it','is','this','such','in','if','in','are','have','was','have','see','or','your','your','mine' ,'my','your','your','we','you','he','they','propose','the','the','as','the',' that','at','do','da','dos','das','before','after','until','with','against','from','from' ,'in','between','to','before','by','per','without','under','on','behind','one','one',' some','some','and','more','in addition','also','addition','add-seaisto','adding','add also','by the way','also' ,'therefore','thus','in this way','it is concluded','summarizing','then','by other side','at the same time','it is recommended','due','therefore',' rather','this way','at the same way','equally','certainly','possibly','too much','too little','everything','very much','too much','deeply','whatever' ,'so','then','until','when','finally','after','before','bye','suddenly','should when','when','sometimes',' from time to time','at sometime','further on','during','however','after','for example','this is','as','of course','probably','of course' ,'want to know','when speaking','the referred','in other words','in summary','in fact','in summary','in truth','indeed','certainly','really','effectively',' but','however','however','however','on the contrary','instead of','on the other hand','while','now','perhaps','perhaps','in addition','such care' ,'from','while','beside','over','under','right','in the center','in the background','in front','left','surface','in the distance',' to the entrance','to the exit','in the background','along','outside','side','outside','in front','inside','nearby','in the view of','according to','affirms' ,'to','in the view of','from the point of view of','second','exemplifies','when it states','as it characterizes','in the saying of','explicit its assumptions','uses the following argumentation by','as described' ,'another teaching of','claims','characterizes','concepts']);
    let wordsIssue = '';
    let wordsAbs = '';
     const issue = new Set();
     const abstract = new Set();

    this.papers.filter(paper => {
      if (paper.issue) {
        const w: string[] = paper.issue.split(' ');
        w.filter(wd => {
          if (wd.length > 1) {
            if (!baseWords.has(wd.toLowerCase())) {
              wordsIssue += wd;
              issue.add(wd);
            }
          }
        });
      }
      if (paper.abstract) {
        const w: string[] = paper.abstract.split(' ');
        w.filter(wd => {
          if (wd.length > 1) {
            if (!baseWords2.has(wd.toLowerCase())) {
              wordsAbs += wd;
              abstract.add(wd);
            }
          }
        });
      }
    });

    for (const item of issue) {
      const x = String(item);
      this.issueLlist.push(new WordCaount(x, wordsIssue.split(x).length));
    }

    for (const item of abstract) {
      const x = String(item);
      this.abstractLlist.push(new WordCaount(x, wordsAbs.split(x).length));
    }

      this.issueLlist.sort((a, b) => (a.ocorrency > b.ocorrency) ? -1 : 1);
}
}
