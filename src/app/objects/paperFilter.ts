/* eslint-disable @typescript-eslint/naming-convention */
export class PaperFilter{
  base: number;
  review_id: number;
  relevance: string;
  status: number;
  star: boolean;
  discarded: boolean;

  constructor(base?: number, review_id?: number) {
    this.base = base;
    this.review_id = review_id;
    this.discarded = false;
  }

  getRequest() {
    let request = 'discarded=' + this.discarded;

    if (this.base) {
       if (request.length > 0) {
        request += '&';
      }
      request += 'base_id=' + this.base;
    }
    if (this.review_id) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'review_id=' + this.review_id;
    }

    if (this.relevance) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'relevance=' + this.relevance;
    }
    if (this.star) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'star=' + this.star;
    }

    if (this.status) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'status=' + this.status;
    }


    return request;
  }
}
