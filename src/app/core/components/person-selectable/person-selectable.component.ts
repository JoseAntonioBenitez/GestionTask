import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { DataPersonService, Person } from '../..';


export const USER_PROFILE_VALUE_ACCESSOR: any = { //Forma de proveer hacia el componente, de que es una clase y es capaz de hacer cambios en un formControl.
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PersonSelectableComponent),
  multi: true
};


@Component({
  selector: 'app-person-selectable',
  templateUrl: './person-selectable.component.html',
  styleUrls: ['./person-selectable.component.scss'],
  providers:[USER_PROFILE_VALUE_ACCESSOR]
})
export class PersonSelectableComponent implements OnInit, ControlValueAccessor {

  selectedPerson:Person=null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private peopleSvc:DataPersonService
  ) { }


  writeValue(obj: any): void {
    this.selectedPerson = this.peopleSvc.getPersonById(obj);
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {}

  getPeople(){
    return this.peopleSvc.getPeople();
  } 

  onPersonClicked(person:Person, accordion:IonAccordionGroup){
    this.selectedPerson = person;
    accordion.value='';
    this.propagateChange(this.selectedPerson.id);
  }

}
