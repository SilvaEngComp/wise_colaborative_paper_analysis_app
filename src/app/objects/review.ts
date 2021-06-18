import { Protocol } from './protocol';
import { Area } from './area';
import { Instituition } from './instituition';
/* eslint-disable @typescript-eslint/naming-convention */
import { Paper } from './paper';
import { User } from './User';

export class Review{
  id: number;
  title: string;
  question: string;
  description: string;
  permission: boolean;
  areas: Area[];
  instituition: Instituition;
  papers: Paper[];
  members: User[];
  protocol: Protocol[];
  includeCriteria: Protocol[];
  excludeCriteria: Protocol[];

  constructor() {
    this.papers = [];
    this.members = [];
    this.areas = [];
    this.protocol = new Array<Protocol>();
    this.includeCriteria = new Array<Protocol>();
    this.excludeCriteria = new Array<Protocol>();
  }
}
