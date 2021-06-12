/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable eqeqeq */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MySelect } from 'src/app/objects/mySelect';

@Component({
  selector: 'app-my-search-bar',
  templateUrl: './my-search-bar.component.html',
  styleUrls: ['./my-search-bar.component.scss'],
})
export class MySearchBarComponent implements OnInit {
  @Output() selectSearchEmiter: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private userService: UserService,
  ) {}

  @Input() selected?: any;
  @Input() label?: string;
  @Input() show?: boolean;
  @Input() create?: boolean;
  @Input() listName?: any;
  @Input() multiple?: boolean;

  limit: number;
  selected_id: number;
  is_userList: boolean;

  listObj: any[];
  listObjAux: any[] = [];
  list: any[];
  listAux: any[];
  ngOnInit() {
    this.load();
  }

  onScroll(ev: any) {
    if (this.limit <= this.list.length) {
      if (
        ev.target.scrollTop + ev.target.offsetHeight ==
        ev.target.scrollHeight
      ) {
        this.limit += 10;
      }
    }
  }

  busca(cod: any) {
    if (cod.length > 0) {
      this.show = true;
    } else {
      this.show = false;
    }

    this.list = this.listAux.filter((obj) => obj.value.toLowerCase().includes(cod));
  }

  async load() {
     if (this.listName == 'members') {
      this.listObj = await this.userService.getUsers();
      this.list = MySelect.toMySelectAny(this.listObj);
     }
    //  else if (this.listName == 'instituition') {
    //   this.listObj = await this.instituitionService.get();
    //   this.list = MySelect.toMySelectAny(this.listObj);
    // } else if (this.listName == 'category') {
    //   this.listObj = await this.categoryService.get();
    //   this.list = MySelect.toMySelectAny(this.listObj);
    // }

    if (this.selected) {
      this.list.filter((item) => {
        if (item.value == this.selected) {
          this.selected_id = item.id;
        }
      });
    }
    if (this.list.length < this.limit) {
      this.limit = this.list.length;
    } else {
      this.limit = 10;
    }
    this.listAux = this.list;
  }

  onSelect(ev) {
    this.listObj.filter((obj) => {
      if (obj.id == ev.cod) {
        this.selectSearchEmiter.emit(obj);
        this.selected = ev.value;
        this.show = false;
      }
    });
  }
  onSelectMultiple(ev, check) {
    this.listObj.filter((obj) => {
      if (obj.id == ev.cod) {
        if (check) {
          this.listObjAux.push(obj);
        } else {
          this.listObjAux.splice(this.listObjAux.indexOf(obj), 1);
        }
      }
    });

    this.selectSearchEmiter.emit(this.listObjAux);
  }
}
