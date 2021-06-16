export class Base{
  id: number;
  name: string;

  constructor(id?: number) {
    if (id > 0 && id<=3) {
    this.id = id;

      switch (id) {
        case 1: this.name = 'IEEE';
          break;
        case 2:  this.name = 'SPRINGER LINK';
          break;
       case 3:  this.name = 'SCOPUS';
          break;
      }
    }
  }
}
