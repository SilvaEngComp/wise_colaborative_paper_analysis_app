/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
export class Menu{
    name: string;
  submenu: string[];
  showSub: boolean;

    constructor(name?: string, submenu?: string[]) {
      this.name = name;
      this.submenu = submenu;
    }

    static getMenuAdmin() {
        const menuGeral: Menu[] = [];
       const  menu_itens: string[] = ['PROJETOS', 'NOTIFICAÇÕES', 'REUNIÕES',
    'CHAT', 'TUTORIAIS', 'SAIR'];

    //   let cont = 0;
      for (let i = 0; i < menu_itens.length; i++){
        const submenu = [];
                menuGeral.push(new Menu(menu_itens[i], submenu) );
            }

        return menuGeral;
    }
}
