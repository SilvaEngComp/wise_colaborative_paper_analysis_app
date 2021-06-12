import { AdminPage } from "./admin-page.page";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AdminPage,
    children: [


      // {
      //   path: "more",
      //   loadChildren: () =>
      //     import("./../more/more.module").then((m) => m.MorePageModule),
      // },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
