/* eslint-disable @typescript-eslint/naming-convention */
export class PaperFilter{
  base: number;
  review_id: number;

  constructor(base?: number, review_id?: number) {
    this.base = base;
    this.review_id = review_id;
  }

  getRequest() {
    let request = '';

    if (this.base) {
      request += 'base_id=' + this.base;
    }
    if (this.review_id) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'review_id=' + this.review_id;
    }

    return request;
  }
}
