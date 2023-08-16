import { Injectable } from '@angular/core';
import { Person } from './person.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http:HttpClient) { }
  readonly baseURL="https://localhost:7212/api/Persons"
  formData:Person=new Person();
  list:Person[];
  postPerson(){ 
    return this.http.post(this.baseURL,this.formData);
  }
  putPerson(){ 
    return this.http.put(`${this.baseURL}/${this.formData.id}`,this.formData);
  }

  refreshList(){
    this.http.get(this.baseURL).toPromise().then(res=>this.list = res as Person[])
  }

  deletePerson(id:number){
    return this.http.delete(`${this.baseURL}/${id}`)
  }


}
