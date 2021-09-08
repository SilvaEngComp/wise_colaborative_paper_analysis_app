export class Base{
  id: number;
  name: string;

  constructor(id?: number, name?: string) {
    if (id > 0 && id<=3) {
    this.id = id;

      switch (id) {
        case 1: this.name = 'IEEE';
          break;
        case 2:  this.name = 'SPRINGER LINK';
          break;
       case 3:  this.name = 'SCOPUS';
          break;
        case 0: this.name = 'TODAS';
          break;
      }
    }

    if (name) {
      this.name = name;
      if (name.toLowerCase().includes('ieee') ){
         this.id=1;
      } else if (this.name.toLowerCase().includes('spring')) {
        this.id=2;
      } else if (this.name.toLowerCase().includes('scopus')) {
        this.id=3;
      } else {
        this.id = 0;
       }
    }
  }
}
