export class Protocol{
  id: number;
  type: ProtocolType;
  question: string;
  answer: string;

  constructor(type?: number) {
    this.type = new ProtocolType(type);
  }

  getBaseQuestions() {
    return ['Essa(s) tecnologia(s) tem sido usada(s)?',''];
  }
}


export class ProtocolType{
  id: number;
  name: string;
  constructor(id: number = 1) {
    if (id >= 1 && id <= 2) {
      this.id = id;
      switch (id) {
        case 1: this.name = 'protocol';
          break;
        case 2: this.name = 'criteria';
          break;
      }
}
  }
}
