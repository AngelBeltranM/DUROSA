import { inject, NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterState, RouterStateSnapshot, Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component'
import { MenuComponent } from './components/menus/menu/menu.component'
import { UsuariosComponent } from "./components/modulos/usuarios/usuarios.component";
import { authGuard } from './guards/auth.guard';
import { SignAdminComponent } from './components/auth/sign-admin/sign-admin.component';
import { MenuAdminComponent } from './components/menus/menu-admin/menu-admin.component';
import { authadminGuard } from './guards/authadmin.guard';
import { EditUserComponent } from './components/modulos/usuarios/edit-user/edit-user.component';
import { RhComponent } from './components/modulos/RH/rh/rh.component';
import { FormatoAltasComponent } from './components/modulos/RH/formato-altas/formato-altas.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full'},
  { path: 'signin', component: SigninComponent},
  { path: 'menu', component: MenuComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authadminGuard]},
  { path: 'admin', component: SignAdminComponent },
  { path: 'menu-admin', component: MenuAdminComponent, canActivate: [authadminGuard]},
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [authadminGuard]},
  { path: 'app-rh', component: RhComponent },
  { path: 'formato', component: FormatoAltasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
