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
    inputDate: string = '';
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
        if (!this.inputDate) {
            this.resultMessage = 'กรุณากรอกวันที่';
            return;
        }

        // Simple validation or extraction (assuming DD/MM/YYYY format)
        const parts = this.inputDate.split('/');
        if (parts.length !== 3) {
            this.resultMessage = 'รูปแบบวันที่ไม่ถูกต้อง (ตัวอย่าง: 01/07/2568)';
            return;
        }

        const yearStr = parts[2];
        const inputYear = parseInt(yearStr, 10);

        if (isNaN(inputYear)) {
            this.resultMessage = 'ปีไม่ถูกต้อง';
            return;
        }

        if (inputYear > 2400) {
            // Logic: BE (พ.ศ.)
            const ceYear = inputYear - 543;
            this.isBe = true;
            this.resultMessage = `วันที่คุณส่งมาคือ ปีแบบพุทธศักราช (พ.ศ.) ตรงกับ ค.ศ. ${ceYear}`;
        } else {
            // Logic: CE (ค.ศ.)
            const beYear = inputYear + 543;
            this.isBe = false;
            this.resultMessage = `วันที่คุณส่งมาคือ ปีแบบคริสต์ศักราช (ค.ศ.) ตรงกับ พ.ศ. ${beYear}`;
        }
    }
}
