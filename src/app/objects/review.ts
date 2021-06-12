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
  areas: Area[];
  instituition: Instituition;
  papers: Paper[];
  members: User[];

  constructor() {
    this.papers = [];
    this.members = [];
    this.areas =[];
  }
}