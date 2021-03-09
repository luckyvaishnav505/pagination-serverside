import {
  Component, OnInit, OnChanges, OnDestroy,
  Input, Output, EventEmitter, ContentChildren,
  QueryList, ElementRef, ViewChild, ViewChildren, Renderer2
} from '@angular/core';

import { ColumnsModel } from './ng-dt.models';

import { NgPaginationComponent } from './ng-pagination/ng-pagination.component';
import { StorageService } from "../../../../modules/shared/providers/storage.service";

import * as Sifter from './sifter';
import { SweetAlertController } from '../../controllers/sweet-alert.controller';

@Component({
  selector: 'ng-data-tables-serverside',
  templateUrl: './ng-data-tables.component.html',
  styleUrls: ['./ng-data-tables.component.scss']
})
export class ServcerSideNgDataTablesComponent implements OnInit, OnChanges, OnDestroy {

  tempLabel: any = 'A1';
  
  @ViewChild(NgPaginationComponent,{static:false})
  private _ngPagination: NgPaginationComponent;

  @ViewChildren('filterInputs')
  private _filterInputsEl: QueryList<ElementRef>;

  @ViewChild('globalFilter',{static:false})
  private _globalFilter: ElementRef;

  @ViewChildren('selectAllCheckbox')
  private _selectAllCheckbox: QueryList<ElementRef>;

  @Input() columns: Array<ColumnsModel> = [];

  //Boxoffice
  @Input() defaultSortColumn: any = {};
  @Input() showHistoryButton: boolean = false;
  @Input() showViewButton: boolean = false;
  @Input() downloadButton: boolean = false;
  @Input() sendMailButon: boolean = false;
  @Input() payNowButton: boolean = false;
  @Input() showVersionInfoButton: boolean = false;
  @Input() showFileCommentButton: boolean = false;
  @Input() showLockFileButton: boolean = false;
  @Output('onClickHistory') historyEvent = new EventEmitter<any>();
  @Output('view') viewEvent = new EventEmitter<any>();
  @Output('download') downloadEvent = new EventEmitter<any>();
  @Output('sendMail') sendMailEvent = new EventEmitter<any>();
  @Output('pay') payEvent = new EventEmitter<any>();
  @Output('onClickVersionInfo') versionInfoEvent = new EventEmitter<any>();
  @Output('onClickFileComment') fileCommentEvent = new EventEmitter<any>();
  @Output('onClickLockFile') fileLockEvent = new EventEmitter<any>();
  @Input() resetAdvanceSearch: any;

  //Boxoffice END

  @Input() rows: Array<any> = [];

  @Input() totalRows: number = 0;

  @Input() perPageRecords: number = 10;

  @Input() customAction: boolean = false;

  @Input() singleColummn: boolean = false;

  @Input() trackByKey: string = '';

  @Input() isAjax: boolean = false;

  @Input() pagesCount: number = 1;

  @Input() searchBox: boolean = true;

  @Input() hasActionButtons: boolean = false;

  @Input() showEditButton: boolean = true;

  @Input() showDeleteButton: boolean = true;

  @Input() showUsersButton: boolean = false;

  @Input() showDeactivateButton: boolean = false;

  @Input() showTestButton: boolean = false;
  @Input() showButton: boolean = false;

  @Input() showDownArrowButton: boolean = false;

  @Input() showUpArrowButton: boolean = false;

  @Input() editButtonIcon: string = 'fa fa-pencil';

  @Input() deleteButtonIcon: string = 'fa fa-trash-o';

  @Input() usersButtonIcon: string = 'fa fa-user';

  @Input() downArrowButtonIcon: string = 'fa fa-long-arrow-down';

  @Input() upArrowButtonIcon: string = 'fa fa-long-arrow-up';

  @Input() showCheckBox: boolean = false;

  @Input() showCheckBoxIcon: boolean = false;

  @Input() isHighlight: boolean = false;

  @Input() showCalenderButton: boolean = false;

  @Input() showMailButton: boolean = false;

  @Input() showSmsButton: boolean = false;

  @Input() showForwardButton: boolean = false;

  @Input() editButtonTooltip: string = 'Edit';

  @Input() deleteButtonTooltip: string = 'Delete';

  @Input() historyButtonTooltip: string = 'History';
  @Input() viewButtonTooltip: string = 'View';

  @Input() blockUnblockToolTip: string = 'Block';

  @Input() showBlockUnblockButton: boolean = false;

  @Input() showScrollBar: boolean = false;

  @Input() showDragAndDrop: boolean = false;

  @Output('rLink') _rlink = new EventEmitter<any>();

  @Output('paginateRecords') paginateRecordsEvent = new EventEmitter<any>();

  @Output('searchRecords') searchRecordsEvent = new EventEmitter<any>();

  @Output('edit') editEvent = new EventEmitter<any>();

  @Output('delete') deleteEvent = new EventEmitter<any>();

  @Output('up') upEvent = new EventEmitter<any>();

  @Output('down') downEvent = new EventEmitter<any>();

  @Output('deActivate') deActivateEvent = new EventEmitter<any>();

  @Output('testModel') testModelEvent = new EventEmitter<any>();

  @Output('checkBoxSelectionChange') checkBoxSelectionChangeEvent = new EventEmitter<any>();

  @Output('rowClick') rowClickEvent = new EventEmitter<any>();

  @Output('rowDblClick') rowDblClickEvent = new EventEmitter<any>();

  @Output('showUsers') showUsersEvent = new EventEmitter<any>();

  @Output('columnSort') columnSort = new EventEmitter<any>();

  @Output('mail') mailEvent = new EventEmitter<any>();

  @Output('sms') smsEvent = new EventEmitter<any>();

  @Output('forward') forwardEvent = new EventEmitter<any>();
  @Output('editCustomeSegmentRow') editCustomeSeg = new EventEmitter();
  @Input() customeSegmentDelete: boolean = false;
  @Input() showInputBox: boolean = false;

  @Output('onClickEvent') updateColumnValue = new EventEmitter<any>();

  @Output('blockUnblock') blockUnblockEvent = new EventEmitter<any>();
  @Output('onSearch') getDetails = new EventEmitter<any>();
  @Input('resetPageNumber') resetPageNumber: any = false;
  @Input('pageNumber') pageNumber = 1;
  @Input('searchTableDataValue') searchTableDataValue: any = '';
  @Input('clearSearch') clearSearch: boolean = false;

  allRows: Array<any> = [];
  editBtnDisable: boolean = false;

  highlightedIndex: number = 0;
downloadButtonTooltip="";
sendMailButtonTooltip="";
payNowButtonTooltip="";
  disableRowIndex: number = 0;

  paginateRows: Array<any> = [];

  searchRows: any = [];

  scrollbarOptions: any = {};

  extraSearchValues: Array<any> = [];

  perPage: number = 10;

  first: number = 1;
  last: number = 1;
  Calender:any='';
  isDesc: boolean = false;
  sortColumn: string = '';
  direction: number;
  
  perPageArray: Array<Object> = [
    { number: 10 }, { number: 25 }, { number: 50 }, { number: 100 }
  ];

  columnKeys: Array<string> = [];
  columnSearchKey: any = {};
  isRecordsSearch: boolean = false;
  searchObj: any = {};
  tempTotalRows: number = 0;
  localStorageKey = 'listIds';
  constructor(private renderer: Renderer2,public sweetAlert:SweetAlertController) {

  }

  ngOnInit() {
    this.scrollbarOptions = { axis: 'x', theme: 'dark-thin' }
    localStorage.removeItem(this.localStorageKey);
    this.buildColumnsKeys();
    // if (StorageService.get('perPageRecords') != undefined) {
    //   this.perPage = +StorageService.get('perPageRecords');
    // }

  }

  ngOnChanges(changes: any) {

    this.editBtnDisable = false;
    if (changes && typeof changes.rows !== 'undefined') {
      //this.searchRows = new Sifter(this.rows);
      this.allRows = this.rows;
      this.paginateRows = this.rows;
      let checkedListItem = JSON.parse(localStorage.getItem(this.localStorageKey));
      if (checkedListItem) {
        for (let obj of this.rows) {
          if (checkedListItem[obj._id]) {
            obj.selectedItem = true;
          }
        }
      }
    }
    if (this.clearSearch && this._globalFilter) {
      this._globalFilter.nativeElement.value = null;
      this.columnSearchKey = {};
    }
    if(this.resetPageNumber){
      this.pageNumber = 1;
      this.searchObj.pageNumber = this.pageNumber;
    }
    if (this.isAjax === false) {
      this.paginateRecords(this.pageNumber);
      if(this.perPageRecords !== 10) {
        this.perPage = this.perPageRecords;
      }
    } else {
      if (changes.totalRows) {
        let end = this.perPage;
        this.last = (end < changes.totalRows.currentValue) ? end : changes.totalRows.currentValue;
        this.tempTotalRows = changes.totalRows.currentValue;
      }
    }
    if (JSON.stringify(this.defaultSortColumn) != '{}' && this.allRows.length > 0) {
      this.isDesc = this.defaultSortColumn['isDesc'];
      this.sort(this.defaultSortColumn.key);
    }
    if (this.columns) {
      this.buildColumnsKeys();
    }
  }

  /**
   * Build Column Keys
   */
  buildColumnsKeys() {
    if (this.columns.length > 0) {
      for (let i = 0; i < this.columns.length; i++) {
        this.columnKeys.push(this.columns[i].key);
      }
    }
  }

  /**
   * Paginate Records
   * 
   * @param pageNumber
   */
  paginateRecords(pageNumber: number, pageChanged?) {
    this.pageNumber = pageNumber;
    --pageNumber;
    let start = pageNumber * this.perPage;
    let end = (pageNumber + 1) * this.perPage;
    // this.rows = this.paginateRows.slice(start, end);
    this.first = start + 1;
    this.last = (end < this.totalRows) ? end : this.totalRows;

    var isAllSelected = true;
    for (let i = 0; i < this.rows.length; i++) {
      if (typeof this.rows[i].selectedItem == 'undefined' || !this.rows[i].selectedItem) {
        isAllSelected = false;
      }
    }
    if (this._selectAllCheckbox != undefined) {
      if (!isAllSelected) {
        this._selectAllCheckbox.forEach((el: ElementRef) => {
          el.nativeElement.checked = false;
        });
        //this.checkBoxSelectionChangeEvent.emit(this.getSelectedRows());
      } else {
        this._selectAllCheckbox.forEach((el: ElementRef) => {
          el.nativeElement.checked = true;
        });
        //this.checkBoxSelectionChangeEvent.emit(this.getSelectedRows());
      }
    }
    if (typeof this._filterInputsEl !== 'undefined') {
      this._filterInputsEl.forEach((el: ElementRef) => {
        if (el.nativeElement.value.trim() !== '') {
          if (el.nativeElement.getAttribute('data-column')) {
            this.columnSearchKey[el.nativeElement.getAttribute('data-column')] = el.nativeElement.value.trim();
          }
        } else {
          delete this.columnSearchKey[el.nativeElement.getAttribute('data-column')];
        }
      });
    }

    if (this._globalFilter && this._globalFilter.nativeElement.value) {
      this.searchObj['globalSearchValue'] = this._globalFilter.nativeElement.value;
    } else {
      delete this.searchObj['globalSearchValue'];
    }
    this.searchObj.columnKey = this.columnSearchKey;
    if (pageNumber >= 0 && pageChanged) {
      this.searchObj['pageNumber'] = +this.pageNumber;
      this.searchObj['rowPerPage'] = +this.perPage;
      this.getDetails.emit(this.searchObj);
    }
  }

  /**
   * Search Rows
   */
  globalTimeout: any = null;
  search(key) {
    let searchResult = null;
    let searchValue = '';
    let searchValues: Array<any> = [];

    if (this.globalTimeout != null) {
      clearTimeout(this.globalTimeout);
    }
    this.globalTimeout = setTimeout(() => { this.onSearch(key, searchValues, searchValue, searchResult) }, 500);

    // this.paginateRows = this.rows;
    // this.totalRows = this.paginateRows.length;
    this.paginateRecords(this.pageNumber);

  }
  clearFilterData() {
    if (typeof this._filterInputsEl !== 'undefined') {
      this._filterInputsEl.forEach((el: ElementRef) => {
        el.nativeElement.value = '';
      });
    }
  }

  onSearch(key, searchValues, searchValue, searchResult) {
    if (typeof this._filterInputsEl !== 'undefined') {
      this._filterInputsEl.forEach((el: ElementRef) => {
        if (el.nativeElement.value.trim() !== '') {
          searchValues.push(el.nativeElement.value);
          if (el.nativeElement.getAttribute('data-column')) {
            this.columnSearchKey[el.nativeElement.getAttribute('data-column')] = el.nativeElement.value.trim();
          }
        } else {
          delete this.columnSearchKey[el.nativeElement.getAttribute('data-column')];
        }
        //this.searchObj[el.nativeElement.getAttribute('data-column')] = el.nativeElement.value
      });
    }

    if (this._globalFilter && this._globalFilter.nativeElement.value) {
      this.searchObj['globalSearchValue'] = this._globalFilter.nativeElement.value;
    } else {
      delete this.searchObj['globalSearchValue'];
    }
    this.searchObj['pageNumber'] = 1;
    this.pageNumber = 1;
    this.searchObj.columnKey = this.columnSearchKey;
    this.getDetails.emit(this.searchObj);
    this.globalTimeout = null;
  }

  /**
   * Sort Event
   * 
   * @param property
   */
  sort(property: string) {
    this.isDesc = !this.isDesc; //change the direction    
    this.sortColumn = property;
    this.direction = this.isDesc ? 1 : -1;

    if (typeof this._filterInputsEl !== 'undefined') {
      this._filterInputsEl.forEach((el: ElementRef) => {
        if (el.nativeElement.value.trim() !== '') {
          if (el.nativeElement.getAttribute('data-column')) {
            this.columnSearchKey[el.nativeElement.getAttribute('data-column')] = el.nativeElement.value.trim();
          }
        } else {
          delete this.columnSearchKey[el.nativeElement.getAttribute('data-column')];
        }
      });
    }

    if (this._globalFilter && this._globalFilter.nativeElement.value) {
      this.searchObj['globalSearchValue'] = this._globalFilter.nativeElement.value;
    } else {
      delete this.searchObj['globalSearchValue'];
    }
    this.searchObj.columnKey = this.columnSearchKey;

    this.searchObj['sortingKey'] = property;
    this.searchObj['sortingOrder'] = this.isDesc ? 1 : -1;

    this.getDetails.emit(this.searchObj);

  }

  /**
   * Records Per Page Selection Event
   * 
   * @param event
   */
  onPerPage(event) {
    this.searchObj.columnKey = this.columnSearchKey;
    this.searchObj['rowPerPage'] = +this.perPage;
    this.searchObj['pageNumber'] = 1;
  }

  /**
   * Goto Link Event
   * 
   * @param row, column
   */
  gotoLink(row: any, column: any) {
    if (column.link === true) {
      let routeData = {
        row: row,
        columnKey: column.key
      };
      this._rlink.emit(routeData);
    }
  }

  /**
   * Echo Value
   * 
   * @param row, column
   */
  echo(row, column): string {
    if (column.key !== '' && typeof row[column.key] !== 'undefined') {
      return row[column.key];
    } else if (column.defaultValue !== '') {
      return column.defaultValue;
    }

    return '';
  }


  /**
   * Emitting Edit Event
   * 
   * @param row
   */
  edit(row: any) {
    if (this.editBtnDisable) {

    } else {
      this.editEvent.emit(row);

    }

    // row['isEdit'] =true;

  }
  // customerSegment(event){
  //   
  //   console.log("event data",event)
  history(row: any) {
    this.historyEvent.emit(row);
  }

  versionInfo(event, row: any) {
    event['row'] = row;
    this.versionInfoEvent.emit(event);
  }

  fileComments(row: any) {
    this.fileCommentEvent.emit(row);
  }

  fileLock(row: any) {
    this.fileLockEvent.emit(row);
  }
  view(row: any) {
    this.viewEvent.emit(row);
  }
  download(row: any) {
    this.downloadEvent.emit(row);
  }
  sendMail(row: any) {
    this.sendMailEvent.emit(row);
  }
  pay(row: any) {
    this.payEvent.emit(row);
  }

  // }
  mail(row: any) {
    this.mailEvent.emit(row);
  }

  forward(row: any) {
    this.forwardEvent.emit(row);
  }


  sms(row: any) {
    this.smsEvent.emit(row);
  }

  /**
   * Emitting Delete Event
   * 
   * @param row
   */
  delete(row: any) {
    if (this.customeSegmentDelete) {
      
      this.sweetAlert.deleteConfirm({}, () => {
        this.rows.forEach(item => {
          if (item._id === row._id) {
            item.tempDelete = true;
          }
        })
        this.deleteEvent.emit(row);

      });

    } else {
      this.deleteEvent.emit(row);
    }

  }

  /**
 * Emitting Delete Event
 * 
 * @param row
 */
  up(row: any) {
    this.upEvent.emit(row);
  }

  /**
 * Emitting Delete Event
 * 
 * @param row
 */
  down(row: any) {
    this.downEvent.emit(row);
  }
  /**
     * Emitting de activate Event
     * 
     * @param row
     */
  deActivate(event, row) {
    row.active = event.srcElement.checked;
    this.deActivateEvent.emit(row);
  }



  /**
   * Track rows in ngFor
   * 
   * @param index, item
   */
  trackByFn(index, item) {
    return index;
  }

  /**
   * Add Tag Class to record item
   * 
   * @param tag
   */
  tagClass(tag: string, isTag: boolean): string {
    if (!tag) {
      return '';
    }

    if (!isTag) {
      return '';
    }

    return ' tag ' + tag.toLowerCase().replace(/\s/g, '_');
  }

  /**
   * Set Page
   * 
   * @param pageNumber
   */
  setPage(pageNumber: number) {
    if (this._ngPagination) {
      this._ngPagination.setPage(pageNumber);
    }
  }

  checkAll(event) {
    if (this.rows.length > 0) {
      this.rows.forEach(row => row.selectedItem = event.target.checked)
      this.checkBoxSelectionChangeEvent.emit(this.getSelectedRows());
    }

    ///this.rows.forEach(row => row.selectedItem = event.target.checked)
    // this.checkBoxSelectionChangeEvent.emit(this.getSelectedRows());
  }

  rowCheck(event, row) {
    row.selectedItem = event.srcElement.checked;
    this.checkBoxSelectionChangeEvent.emit(this.getSelectedRows());
  }

  private getSelectedRows() {
    var selectedRows = [];
    let allSelected = true;
    this.rows.forEach(row => {
      if (row.selectedItem) {
        selectedRows.push(row)
      } else {
        allSelected = false;
      }
    });
    this._selectAllCheckbox.forEach((el: ElementRef) => {
      el.nativeElement.checked = allSelected;
    });
    return selectedRows;

    // var selectedRows = [];
    // let allSelected = true;
    // let objectIdMap: any;
    // objectIdMap = JSON.parse(localStorage.getItem(this.localStorageKey));
    // if (objectIdMap == null || !objectIdMap) {
    //   objectIdMap = {};
    // }
    // this.rows.forEach(row => {
    //   if (row.selectedItem) {
    //     //selectedRows.push(row);
    //     objectIdMap[row._id.toString()] = {};
    //   } else {
    //     //if id exists in local and checked list item remove from local storage
    //     if (objectIdMap[row._id.toString()]) {
    //       delete objectIdMap[row._id.toString()];
    //     }
    //     allSelected = false;
    //   }
    // });
    // this._selectAllCheckbox.forEach((el: ElementRef) => {
    //   el.nativeElement.checked = allSelected;
    // });
    // if (objectIdMap) {
    //   localStorage.setItem(this.localStorageKey, JSON.stringify(objectIdMap));
    // }

    // for (let key of Object.keys(objectIdMap)) {
    //   selectedRows.push({ _id: key });
    // }
    // return selectedRows;
  }

  isRowDoubleClick = false;
  rowSelected(row, i) {
    setTimeout(() => {
      if (!this.isRowDoubleClick) {
        this.rowClickEvent.emit(row);
      }
    }, 200);

    this.highlightedIndex = i;
    this.disableRowIndex = i;
  }

  rowDoubleClicked(row) {
    this.isRowDoubleClick = true;
    this.rowDblClickEvent.emit(row);
    setTimeout(() => {
      this.isRowDoubleClick = false;
    }, 200);
  }

  testTargetModel(row) {
    this.testModelEvent.emit(row);
  }

  /**
   * Emitting show users Event
   * 
   * @param row
   */
  showUsers(row: any) {
    this.showUsersEvent.emit(row);
  }

  customerSegment(event) {
    this.editCustomeSeg.emit(event);
    this.editBtnDisable = true;
  }

  /**
   * Emitting column key with row value
   * @param row 
   * @param columnKey 
   */
  onClickEvent(row: any, columnKey: any) {
    this.updateColumnValue.emit({ rowData: row, columnKey: columnKey });
  }

  blockUnblock(event, row: any) {
    row.isBlocked = event.srcElement.checked;
    this.blockUnblockEvent.emit(row);
  }

  ngOnDestroy() {

  }

}
