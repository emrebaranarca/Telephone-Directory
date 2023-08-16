import { Component } from '@angular/core';
import { PersonService } from '../shared/person.service';
import { Person } from '../shared/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  constructor(public service:PersonService){
  }

  ngOnInit():void{
    this.service.refreshList();
  }

   populateForm(selectedRecord:Person){
     this.service.formData=Object.assign({},selectedRecord);
   }

   onDelete(id:number){
    if(confirm("Kişiyi silmek istediğinizden emin misiniz ?")){
      this.service.deletePerson(id).subscribe(res=>{
        this.service.refreshList();
      })
    }

   }

}
