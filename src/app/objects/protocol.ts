export class Protocol{
  id: number;
  type: ProtocolType;
  question: string;
  answer: string;

  constructor() {
  }

  getBaseQuestions() {
    return ['Essa(s) tecnologia(s) tem sido usada(s)?',''];
  }
}


export class ProtocolType{
  id: number;
  name: string;
  constructor() {
  }
}
