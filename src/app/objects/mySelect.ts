
export class MySelect {
  id: number;
  value: string;
  info: string;
  checked: boolean;

  constructor(id?: number, value?: string, info?: string) {
    this.id = id;
    this.value = value;
    this.info = info;
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

  static toMySelectInstituition(list?: any[]) {
    const mySelect: MySelect[] = [];
    if (list) {
      list.filter((item) => {
        mySelect.push(new MySelect(item.id, item.name, item.abreviation));
      });
    }
    return mySelect;
  }
}
