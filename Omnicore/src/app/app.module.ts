import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { MenuComponent } from './components/menus/menu/menu.component';
import { UsuariosComponent } from './components/modulos/usuarios/usuarios.component';

import { HttpClientModule } from '@angular/common/http';
import { SignAdminComponent } from './components/auth/sign-admin/sign-admin.component';
import { MenuAdminComponent } from './components/menus/menu-admin/menu-admin.component';
import { EditUserComponent } from './components/modulos/usuarios/edit-user/edit-user.component';
import { RhComponent } from './components/modulos/RH/rh/rh.component';
import { FormatoAltasComponent } from './components/modulos/RH/formato-altas/formato-altas.component';
import { EntregaEppComponent } from './components/modulos/RH/entrega-epp/entrega-epp.component';
import { BeneficiarioComponent } from './components/modulos/RH/beneficiario/beneficiario.component';




@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    MenuComponent,
    UsuariosComponent,
    SignAdminComponent,
    EditUserComponent,
    MenuAdminComponent,
    RhComponent,
    FormatoAltasComponent,
    EntregaEppComponent,
    BeneficiarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 15000, closeButton: true, progressBar: true})
  ],
  providers: [
    provideClientHydration()
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
