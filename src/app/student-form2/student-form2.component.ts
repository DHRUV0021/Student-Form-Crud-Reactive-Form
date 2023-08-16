import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService, Data } from '../crud.service';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-student-form2',
  templateUrl: './student-form2.component.html',
  styleUrls: ['./student-form2.component.scss']
})
export class StudentForm2Component {


  displayedColumns: string[] = ['position', 'companyName', 'firstname', 'lastName', 'Email', 'mobileNo', 'salary', 'city', 'Blockno', 'Aadhaarno', 'PanNo', 'AccountNo', 'Action'];
  dataSource = new MatTableDataSource<any>;
  cleardData = false;
  myForm: FormGroup;
  allData: Array<Data> = new Array<Data>();
  togglBtn: boolean = true;

  constructor(private _crud: CrudService) { }

  ngOnInit(): void {
    this.ReactiveForm();
    this.getData();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;




  //=================REACTIVE  METHOD
  ReactiveForm() {
    this.myForm = new FormGroup({
      id: new FormControl(null),
      companyname: new FormControl('', Validators.required),
      fname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern("^[a-zA-Z]+$")]),
      lname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern("^[a-zA-Z]+$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileno: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      address: new FormGroup({
        city: new FormControl('', [Validators.required]),
        blockno: new FormControl('', [Validators.required])
      }),
      salary: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]),
      personalDetails: new FormGroup({
        aadhaarno: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(12), Validators.maxLength(12)]),
        panno: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
        passbookno: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(16)])
      })
    });
  }

  //=================GET DATA METHOD
  getData() {
    this._crud.getItem().subscribe({
      next: (res) => {
        this.allData = res;
        this.dataSource = new MatTableDataSource<Data>(this.allData);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //=================ADD DATA METHOD
  addData() {
    this._crud.postItem(this.myForm.value).subscribe({
      next: (res) => {
        this.ReactiveForm();
        this.getData();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //=================EDIT DATA METHOD
  fillData(data) {
    this.togglBtn = false;
    this.myForm.patchValue(data);
  }

  updateData() {
    this._crud.editItem(this.myForm.value).subscribe({
      next: (res) => {
        this.togglBtn = true;
        this.ReactiveForm();
        this.getData();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //=================DELETE DATA METHOD
  deleteData(data) {
    this._crud.deleteItem(data).subscribe({
      next: (res) => {
        this.ReactiveForm();
        this.getData();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //=================MODEL DATA CLEAR METHOD
  dismissDetail() {
    // Update & Add Toggle Button 
    if (this.togglBtn) {
      this.togglBtn = true;
    }
    else {
      this.togglBtn = false;
    }
    this.ReactiveForm();
    this.getData();
  }

  //=================PAGE METHOD
  pagenations() {
    this.dataSource.paginator = this.paginator;
  }
}



