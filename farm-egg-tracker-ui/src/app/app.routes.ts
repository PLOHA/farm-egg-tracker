import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CheckdateComponent } from './components/checkdate/checkdate.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'checkdate', component: CheckdateComponent },
    { path: 'multiplication-table', loadComponent: () => import('./components/multiplication-table/multiplication-table.component').then(m => m.MultiplicationTableComponent) }
];
