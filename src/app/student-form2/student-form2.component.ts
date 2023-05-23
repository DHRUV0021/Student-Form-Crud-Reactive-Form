import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService, Data } from '../crud.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-form2',
  templateUrl: './student-form2.component.html',
  styleUrls: ['./student-form2.component.scss']
})
export class StudentForm2Component {

  displayedColumns: string[] = ['position', 'companyName', 'firstname', 'lastName', 'Email', 'mobileNo', 'salary', 'city', 'Blockno', 'Aadhaarno', 'PanNo', 'AccountNO', 'Action'];
  dataSource = new MatTableDataSource<any>;
  paginator: any;
  myForm: FormGroup;
allData:Array<Data>= new Array<Data>();
togglBtn:boolean =true;




  constructor(private _crud: CrudService) { }

  ngOnInit(): void {
    this.ReactiveForm();
    this.getData();
  }

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ReactiveForm() {
    this.myForm = new FormGroup({
      id: new FormControl(''),
      companyname: new FormControl(''),
      fname: new FormControl(''),
      lname: new FormControl(''),
      email: new FormControl(''),
      mobileno: new FormControl(''),
      address: new FormGroup({
        city: new FormControl(''),
        blockno: new FormControl('')
      }),
      salary: new FormControl(''),
      personalDetails: new FormGroup({
        aadhaarno: new FormControl(''),
        panno: new FormControl(''),
        passbookno: new FormControl('')
      })
    });
  }
  
  getData(){
    this._crud.getItem().subscribe({
      next:(res)=>{
        this.allData =res;
        this.dataSource = new MatTableDataSource<Data>(this.allData);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  addData(){
    this._crud.postItem(this.myForm.value).subscribe({
      next:(res)=>{
        this.ReactiveForm();
        this.getData();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  fillData(data){
    this.togglBtn= false;
    this.myForm.patchValue(data);

  }

  updateData(){
    this._crud.editItem(this.myForm.value).subscribe({
      next:(res)=>{
        this.togglBtn= true;
        this.ReactiveForm();
        this.getData();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  deleteData(data){
    this._crud.deleteItem(data).subscribe({
      next:(res)=>{
        this.ReactiveForm();
        this.getData();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}






export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
];

