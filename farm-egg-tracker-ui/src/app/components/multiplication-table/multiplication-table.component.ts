import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiplication-table',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './multiplication-table.component.html',
  styleUrl: './multiplication-table.component.scss'
})
export class MultiplicationTableComponent {
  tables: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  rows: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  private router = inject(Router);

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
