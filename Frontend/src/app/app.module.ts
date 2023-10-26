import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
// import { NgbModule} from  '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    AuthModule,
    SettingsModule,
    // NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
