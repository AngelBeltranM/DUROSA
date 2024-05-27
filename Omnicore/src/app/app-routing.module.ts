import { inject, NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterState, RouterStateSnapshot, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component'
import { MenuComponent } from './components/menu/menu.component'
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { authGuard } from './guards/auth.guard';
import { SignAdminComponent } from './components/sign-admin/sign-admin.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { authadminGuard } from './guards/authadmin.guard';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full'},
  { path: 'signin', component: SigninComponent},
  { path: 'menu', component: MenuComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authadminGuard]},
  { path: 'admin', component: SignAdminComponent },
  { path: 'menu-admin', component: MenuAdminComponent, canActivate: [authadminGuard]},
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [authadminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
