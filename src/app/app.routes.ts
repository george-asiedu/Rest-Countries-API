import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Rest Countries API | Home Page' },
    { path: ':name', component: DetailsComponent, title: 'Rest Countries API | Details Page'},
    { path: '**', redirectTo: '', component: HomeComponent }
]