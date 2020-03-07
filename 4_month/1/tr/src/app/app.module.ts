import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RecentlyAddedPageComponent} from './recently-added/recently-added.component';
import {HeaderComponent} from './header/header.component';
import {GoPageComponent} from './go/go.component';
import {SettingsPageComponent} from './settings/settings.component';
import {StorageService} from "./services/storage/storage.service";

@NgModule({
  declarations: [
    AppComponent,
    RecentlyAddedPageComponent,
    HeaderComponent,
    GoPageComponent,
    SettingsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
