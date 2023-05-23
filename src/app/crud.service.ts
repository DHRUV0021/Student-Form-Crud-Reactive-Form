import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  dbUrl = "http://localhost:3000/Student";

  constructor(private http: HttpClient) { }


  //=================GET DATA METHOD
  getItem() {
    return this.http.get<Array<Data>>(this.dbUrl);
  }

  //=================POST DATA METHOD
  postItem(data: Data) {
    return this.http.post(this.dbUrl, data);
  }

  //=================EDIT DATA METHOD
  editItem(data: Data) {
    return this.http.put(`${this.dbUrl}/${data.id}`, data)
  }

  //=================DELETE DATA METHOD
  deleteItem(data: Data) {
    return this.http.delete(`${this.dbUrl}/${data.id}`)
  }
}

export class Data {
  id: number;
  companyname: string;
  fname: string;
  lname: string;
  email: string;
  mobileno: string;
  address: Addressing;
  salary: string;
  personalDetails: personalData;
}
export class Addressing {
  city: string;
  blockno: string;
}
export class personalData {
  aadhaarno: string;
  panno: string;
  passbookno: string;
}
