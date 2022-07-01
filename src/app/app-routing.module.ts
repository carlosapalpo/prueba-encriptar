import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaCryptoComponent } from './components/prueba-crypto/prueba-crypto.component';
import { PruebaBcryptComponent } from './components/prueba-bcrypt/prueba-bcrypt.component';

const routes: Routes = [
  { path: 'crypto', component: PruebaCryptoComponent },
  { path: 'bcrypt', component: PruebaBcryptComponent },
  { path: '', redirectTo: '/crypto', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
