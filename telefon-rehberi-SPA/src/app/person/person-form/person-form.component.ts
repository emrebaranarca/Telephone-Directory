import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Person } from 'src/app/shared/person.model';
import { PersonService } from 'src/app/shared/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  constructor(public service:PersonService){

  }
  ngOnInit():void{
    
  }
  insertRecord(form:NgForm){
    this.service.postPerson().subscribe(res=>{
      alert("Yeni kişi rehberinize eklendi.")
      this.resetForm(form)
      this.service.refreshList();
  })
  }
  onSubmit(form: NgForm){
    if(this.service.formData.id==0){
      this.insertRecord(form);
    }else{
      this.updateRecord(form)
    }
  }

  updateRecord(form:NgForm){
    this.service.putPerson().subscribe(res=>{
      this.service.refreshList()
      alert("Kişi kaydınız güncellendi.")
      this.resetForm(form)

  })
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Person();
  }
  
}

