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
  include_criteria: string;
  exclude_criteria: string;

  constructor() {
    this.papers = [];
    this.members = [];
    this.areas = [];
    this.protocol = new Array<Protocol>();

  }
}
