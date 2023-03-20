import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { TruckComponent } from './truck/truck.component';
import { PlaceBetComponent } from './place-bet/place-bet.component';
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
  { path: '', redirectTo: '/setup', pathMatch: 'full' },
  { path: 'setup', component: SetupComponent },
  { path: 'trucks', component: TruckComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: [
    AppComponent,
    TruckComponent,
    PlaceBetComponent,
    SetupComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
