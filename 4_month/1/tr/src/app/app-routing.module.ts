import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GoPageComponent} from "./go/go.component";
import {RecentlyAddedPageComponent} from "./recently-added/recently-added.component";
import {SettingsPageComponent} from "./settings/settings.component";

const routes: Routes = [
  { path: 'add', component: RecentlyAddedPageComponent },
  { path: 'go', component: GoPageComponent},
  { path: 'settings', component: SettingsPageComponent },
  { path: '**', redirectTo: '/add', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
