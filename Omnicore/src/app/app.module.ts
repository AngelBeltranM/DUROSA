import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule, provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { MenuComponent } from './components/menu/menu.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

import { HttpClientModule } from '@angular/common/http';
import { SignAdminComponent } from './components/sign-admin/sign-admin.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';




@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    MenuComponent,
    UsuariosComponent,
    SignAdminComponent,
    MenuAdminComponent,
    EditUserComponent
    
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
