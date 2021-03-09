// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Components
import { ServcerSideNgDataTablesComponent } from './ng-data-tables.component';
import { NgPaginationComponent } from './ng-pagination/ng-pagination.component';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface,PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { TranslateModule } from "../../../../translate/translate.module";
import { Ng2DragDropModule } from 'ng2-drag-drop';
import {
  MatDialogModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatRadioModule,
  MatCardModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatDividerModule,
  MatButtonModule,
  MatProgressBarModule
  ,MatSnackBarModule, MatChipsModule
   ,MatDatepickerModule, MatNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule, FormsModule, PerfectScrollbarModule, TranslateModule,
    Ng2DragDropModule.forRoot(),
     MatDialogModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatRadioModule,
  MatCardModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatDividerModule,
  MatButtonModule,
  MatProgressBarModule
  ,MatSnackBarModule, MatChipsModule
   ,MatDatepickerModule, MatNativeDateModule
  ],
  declarations: [
    ServcerSideNgDataTablesComponent,
    NgPaginationComponent
  ],
  exports: [
    ServcerSideNgDataTablesComponent,
     MatDialogModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatRadioModule,
  MatCardModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatDividerModule,
  MatButtonModule,
  MatProgressBarModule
  ,MatSnackBarModule, MatChipsModule
   ,MatDatepickerModule, MatNativeDateModule
  ]
})
export class ServerSideNgDataTablesModule { }
