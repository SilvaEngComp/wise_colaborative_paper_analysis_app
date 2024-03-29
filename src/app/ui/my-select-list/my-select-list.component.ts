import { BaseService } from './../../services/base.service';
import { PaperService } from 'src/app/services/paper.service';
import { InstituitionService } from './../../services/instituition.service';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable eqeqeq */
import { environment } from 'src/environments/environment';
import { PopUpComponent } from './../pop-up/pop-up.component';
import {
  AlertController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AreaService } from 'src/app/services/area.service';
import { MySelect } from 'src/app/objects/mySelect';
import { Area } from 'src/app/objects/area';
import { PaperFilter } from 'src/app/objects/paperFilter';

@Component({
  selector: 'app-my-select-list',
  templateUrl: './my-select-list.component.html',
  styleUrls: ['./my-select-list.component.scss'],
})
export class MySelectListComponent implements OnInit, OnDestroy {
  @Output() selectEmiter: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private popCtrl: PopoverController,
    private instituitionService: InstituitionService,
    private alertCtrl: AlertController,
    private userService: UserService,
    private areaService: AreaService,
    private paperSerice: PaperService,
    private baseService: BaseService
  ) {}
  ngOnDestroy(): void {
    localStorage.removeItem(environment.LOCALSTORAGE + this.listName);
  }

  @Input() selected?: string;
  @Input() label?: string;
  @Input() show?: boolean;
  @Input() create?: boolean;
  @Input() listName?: any;
  @Input() multiple?: boolean;
  @Input() edit?: boolean;
  @Input() dependence_id?: number;
  selected_id: number;

  limit: number;

  listObj: any[];
  listObjAux: any[] = [];
  list: any[];
  listAux: any[];
  mySelect: MySelect;
  mySelectList: MySelect[] = [];
  isLoading: boolean;
  ngOnInit() {
    this.isLoading = true;
    this.mySelect = new MySelect();
    this.load();
    if (this.multiple) {
      if (localStorage.getItem(environment.LOCALSTORAGE + this.listName)) {
        this.mySelectList = JSON.parse(
          localStorage.getItem(environment.LOCALSTORAGE + this.listName)
        );
      }
    } else {
      if (localStorage.getItem(environment.LOCALSTORAGE + this.listName)) {
        this.mySelect = JSON.parse(
          localStorage.getItem(environment.LOCALSTORAGE + this.listName)
        );
      }
    }

    if (!this.dependence_id) {
      if (localStorage.getItem(environment.LOCALSTORAGE + 'r')) {
        this.dependence_id = JSON.parse(
          localStorage.getItem(environment.LOCALSTORAGE + 'r')
        ).id;
      }
    }
  }

  async showInfo(ev: any, item: any) {
    let teamObj = null;
    this.listObj.filter((obj) => {
      if (item.id == obj.id) {
        teamObj = obj;
      }
    });
    const pop = await this.popCtrl.create({
      component: PopUpComponent,
      event: ev,
      componentProps: { obj: teamObj, listName: this.listName },
    });

    await pop.present();
  }
  onScroll(ev: any) {
    if (this.limit <= this.list.length) {
      if (
        ev.target.scrollTop + ev.target.offsetHeight >=
        ev.target.scrollHeight
      ) {
        this.limit += 10;
      }
    }
  }

  busca(ev: any) {
    const cod = ev.target.value.toLowerCase();
    if (cod.length > 0) {
      this.show = true;
    } else {
      this.show = false;
    }
    if (this.listName == 'instituition') {
      this.list = this.listAux.filter((obj) => {
        const res = obj.value.toLowerCase().includes(cod);
        if (res.length > 0) {
          return res;
        } else {
         return obj.info.toLowerCase().includes(cod);
        }
      });

    } else {
    this.list = this.listAux.filter((obj) => obj.value.toLowerCase().includes(cod));

    }
  }

  async load() {
   if (this.listName == 'members') {
      this.listObj = await this.userService.getUsers();
      this.list = MySelect.toMySelectMembers(this.listObj);
    } else if (this.listName == 'instituition') {
      this.listObj = await this.instituitionService.get();
      this.list = MySelect.toMySelectInstituition(this.listObj);
    } else if (this.listName == 'area') {
      this.listObj = await this.areaService.get();
      this.list = MySelect.toMySelectAny(this.listObj);
    }else if (this.listName == 'papers') {
      this.listObj = await this.paperSerice.get(this.dependence_id);
      this.list = MySelect.toMySelectPaper(this.listObj);
   } else if (this.listName == 'visualization') {
      const filter = new PaperFilter(null, this.dependence_id); //dependence_id é o review id
    filter.relevance = 'desc';
    filter.status = 1;
    filter.analysed = true;
    filter.star = true;
    this.listObj = await this.paperSerice.show(filter);
      this.list = MySelect.toMySelectPaper(this.listObj);
    }else if (this.listName == 'bases') {
      this.listObj = await this.baseService.get();
      this.list = MySelect.toMySelectAny(this.listObj);
    }
    if (!this.list) {
      this.edit = true;
    } else {
      if (this.list.length < this.limit) {
        this.limit = this.list.length;
      } else {
        this.limit = 10;
      }
      this.listAux = this.list;
    }
    this.isLoading = false;
  }

  save() {
    if (this.multiple) {
      localStorage.setItem(
        environment.LOCALSTORAGE + this.listName,btoa(
        JSON.stringify(this.mySelectList))
      );
    } else {
      localStorage.setItem(
        environment.LOCALSTORAGE + this.listName,
        btoa(JSON.stringify(this.mySelect))
      );
    }
  }

  onSelect(obj: MySelect) {
    if (this.multiple) {
      this.onSelectMultiple(obj);
    } else {
      this.onSelectOne(obj);
    }
    this.show = false;
    this.save();
  }
  onSelectOne(obj: MySelect) {
    this.listObj.filter((ele) => {
      if (obj.id == ele.id || obj.id == ele.code || obj.id == ele.number) {
        console.log;
        this.mySelect = obj;

        this.selectEmiter.emit(ele);
      }
    });
  }
   checkMultipleSelected(item: MySelect) {
    this.mySelectList.filter((m) => {
      if (item.id == m.id) {
        this.mySelectList.push(item);
        this.listObj.filter((obj) => {
          if (obj.id == m.id) {
            this.listObjAux.push(obj);
          }
        });
      }
    });
  }
  onSelectMultiple(ev) {
    this.listObj.filter((obj) => {
      if (obj.id == ev.id) {
        if (this.mySelectList.indexOf(ev) < 0) {
          this.mySelectList.push(ev);
          this.listObjAux.push(obj);
        }
      }
    });


    this.selectEmiter.emit(this.listObjAux);
    this.mySelect.value = '';
  }

   onRemoveMultiple(ev: MySelect) {
     this.mySelectList.splice(this.mySelectList.indexOf(ev), 1);

     this.listObj.filter((obj) => {
          this.mySelectList.push(ev);
          this.listObjAux.push(obj);
    });

    this.mySelect = new MySelect();
    this.selectEmiter.emit(this.listObjAux);
  }
  createNew() {
    if (this.listName == 'area') {
      this.createNewArea();
    }

  }

  async showOptions() {
    if (this.list.length > 0) {
      this.show = !this.show;
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Alerta',
        mode: 'ios',

        message: `Sem ${this.listName}`,
      });
      await alert.present();
    }
  }


  async createNewArea() {
    const alert = await this.alertCtrl.create({
      header: 'NOVA ÁREA',
      mode: 'ios',

      inputs: [
        {
          name: 'name',
          placeholder: 'Digite o Nome da Área',
        },
      ],
      buttons: [
        {
          text: 'CONFIRMAR',
          handler: (form) => {
            this.areaService
              .store(new Area(form.name))
              .then((categories) => {
                this.listObj = categories;
                this.list = MySelect.toMySelectAny(this.listObj);
                this.list.filter((obj) => {
                  if (obj.value == form.name) {
                    this.onSelect(obj);
                  }
                });
              });
          },
        },
      ],
    });

    await alert.present();
  }


}
