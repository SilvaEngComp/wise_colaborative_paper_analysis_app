import { AuthHomeGuard } from "./guards/auth_home.guard";
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
const routes: Routes = [
  {
    path: "home",
    canActivate: [AuthHomeGuard],
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin-page/admin-page.module").then(
        (m) => m.AdminPageModule
      ),
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
