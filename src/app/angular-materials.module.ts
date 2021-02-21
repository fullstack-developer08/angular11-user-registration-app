import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
    ],
    imports: [
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule
    ],
    providers: [],
})
export class AngularMaterialsModule { }
