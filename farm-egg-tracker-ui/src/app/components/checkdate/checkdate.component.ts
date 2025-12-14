import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkdate',
    standalone: true,
    imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
    templateUrl: './checkdate.component.html',
    styleUrl: './checkdate.component.scss'
})
export class CheckdateComponent {
    inputYear: number | null = null;
    resultMessage: string = '';
    isBe: boolean = false;
    private router = inject(Router);

    navigateToDashboard() {
        this.router.navigate(['/dashboard']);
    }

    navigateToMultiplicationTable() {
        this.router.navigate(['/multiplication-table']);
    }

    checkYear() {
        if (!this.inputYear) {
            this.resultMessage = 'กรุณากรอกตัวเลขปี';
            return;
        }

        if (this.inputYear > 2400) {
            // Logic: BE (พ.ศ.)
            const ceYear = this.inputYear - 543;
            this.isBe = true;
            this.resultMessage = `ปีที่คุณส่งมาคือ ปีแบบพุทธศักราช (พ.ศ.) ตรงกับ ค.ศ. ${ceYear}`;
        } else {
            // Logic: CE (ค.ศ.)
            const beYear = this.inputYear + 543;
            this.isBe = false;
            this.resultMessage = `ปีที่คุณส่งมาคือ ปีแบบคริสต์ศักราช (ค.ศ.) ตรงกับ พ.ศ. ${beYear}`;
        }
    }
}
