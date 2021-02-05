import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/pages/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('src/app/pages/core/core.module').then((m) => m.CoreModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('src/app/pages/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
