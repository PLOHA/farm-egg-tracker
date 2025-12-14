import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatSelectModule,
        MatTableModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    private reportService = inject(ReportService);
    private router = inject(Router);

    reportType: 'daily' | 'monthly' | 'yearly' = 'daily';

    navigateToCheckDate() {
        this.router.navigate(['/checkdate']);
    }

    // Filter Values
    selectedDate: Date = new Date();
    selectedYear: number = new Date().getFullYear();
    selectedMonth: number = new Date().getMonth() + 1;

    // Data
    reportData: any = null;
    displayedColumns: string[] = ['name', 'count'];

    // Options for Dropdowns
    years: number[] = [];
    months = [
        { val: 1, name: 'มกราคม' }, { val: 2, name: 'กุมภาพันธ์' }, { val: 3, name: 'มีนาคม' },
        { val: 4, name: 'เมษายน' }, { val: 5, name: 'พฤษภาคม' }, { val: 6, name: 'มิถุนายน' },
        { val: 7, name: 'กรกฎาคม' }, { val: 8, name: 'สิงหาคม' }, { val: 9, name: 'กันยายน' },
        { val: 10, name: 'ตุลาคม' }, { val: 11, name: 'พฤศจิกายน' }, { val: 12, name: 'ธันวาคม' }
    ];

    constructor() {
        const currentYear = new Date().getFullYear();
        for (let i = 0; i < 5; i++) {
            this.years.push(currentYear - i);
        }
    }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.reportData = null;
        if (this.reportType === 'daily') {
            // Fix Timezone Issue: Construct YYYY-MM-DD from local time
            const year = this.selectedDate.getFullYear();
            const month = (this.selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const day = this.selectedDate.getDate().toString().padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;
            this.reportService.getDaily(dateStr).subscribe({
                next: (res) => {
                    this.reportData = res;
                    this.displayedColumns = ['animalType', 'count'];
                },
                error: (err) => {
                    console.error('API Error:', err);
                    alert('เกิดข้อผิดพลาดในการโหลดข้อมูล! \nกรุณาตรวจสอบว่า Backend ("dotnet run") กำลังทำงานอยู่หรือไม่\nและตรวจสอบ Port ว่าตรงกับ http://localhost:5041 หรือไม่');
                }
            });
        } else if (this.reportType === 'monthly') {
            this.reportService.getMonthly(this.selectedYear, this.selectedMonth).subscribe({
                next: (res) => {
                    this.reportData = res;
                    this.displayedColumns = ['date', 'chickenCount', 'duckCount', 'total'];
                },
                error: (err) => {
                    console.error('API Error:', err);
                    alert('เกิดข้อผิดพลาดในการโหลดข้อมูล! (Monthly)');
                }
            });
        } else {
            this.reportService.getYearly(this.selectedYear).subscribe({
                next: (res) => {
                    this.reportData = res;
                    this.displayedColumns = ['monthName', 'chickenCount', 'duckCount', 'total'];
                },
                error: (err) => {
                    console.error('API Error:', err);
                    alert('เกิดข้อผิดพลาดในการโหลดข้อมูล! (Yearly)');
                }
            });
        }
    }

    onTypeChange(val: any) {
        this.reportType = val;
        this.loadData();
    }
}
