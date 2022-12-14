import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../models/person.model';


@Injectable({
  providedIn: 'root'
})
export class DataPersonService {
  private _person:Person[] = [
    {
      id: 1,
      nombre: 'Jose Antonio',
      apodo:  'Hijo mayor',
      foto: 'http://drive.google.com/uc?export=view&id=1n8J4bcNmkE0yMxQcbA4WFFEwWHQCqrmh'
    },
    {
      id: 2,
      nombre: 'Francisco Javier',
      apodo:  'Hijo menor',
      foto: 'http://drive.google.com/uc?export=view&id=18dDByyENiKjR7AXZSNub738s4SjBPrx_'
    },
    {
      id: 3,
      nombre: 'Jose Antonio',
      apodo:  'Padre',
      foto: 'http://drive.google.com/uc?export=view&id=1jNR-9riiym0WIPpnHQe24-7Xl3HNJpk_'
    },
    {
      id: 4,
      nombre: 'Maria Dolores',
      apodo:  'Madre',
      foto: 'http://drive.google.com/uc?export=view&id=1VFUSfQZoVjVFkI6m73vba2_G4oGDUR7O'
    }

  ];

  private personSubject:BehaviorSubject<Person[]> = new BehaviorSubject(this._person);
  public person$ = this.personSubject.asObservable();

  id:number = this._person.length+1;
  constructor(
    
  ) {

  }

  getPeople(){
    return this._person;
  }

  getPersonById(id:number){
    return this._person.find(p=>p.id==id);
  }

  deletePersonById(id:number){
    this._person = this._person.filter(p=>p.id != id); 
    this.personSubject.next(this._person);
  }

  addPerson(person:Person){
    person.id = this.id++;
    this._person.push(person);
  }

  updatePerson(person:Person){
    var _people = this._person.find(p=>p.id==person.id);
    
    if(_people){
      _people.nombre = person.nombre;
      _people.apodo = person.apodo;
      _people.foto = person.foto;
      
    }
  }
}
