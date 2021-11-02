
export class MySelect {
  id: number;
  value: string;
  info: string;
  image: string;
  checked: boolean;

  constructor(id?: number, value?: string, info?: string, image?: string) {
    this.id = id;
    this.value = value;
    this.info = info;
    this.image = image;
  }



  static toMySelectAny(list?: any[]) {
    const mySelect: MySelect[] = [];
    if (list) {
      list.filter((item) => {
        mySelect.push(new MySelect(item.id, item.name));
      });
    }
    return mySelect;
  }

  static toMySelectMembers(list?: any[]) {
    console.log(list);
    const mySelect: MySelect[] = [];
    if (list) {
      list.filter((item) => {
        mySelect.push(new MySelect(item.id, item.name, item.email, item.image));
      });
    }
    return mySelect;
  }
  static toMySelectInstituition(list?: any[]) {
    const mySelect: MySelect[] = [];
    if (list) {
      list.filter((item) => {
        mySelect.push(new MySelect(item.id, item.name, item.abreviation));
      });
    }
    return mySelect;
  }
  static toMySelectPaper(list?: any[]) {
    const mySelect: MySelect[] = [];
    if (list) {
      list.filter((item) => {
        mySelect.push(new MySelect(item.id, item.title, item.authors));
      });
    }
    return mySelect;
  }
}
