import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'te-institution-box',
  templateUrl: 'institution-box.component.html',
  moduleId: module.id
})
export class InstitutionBoxComponent implements OnInit {
  @Input()
  item: any

  validators: any

  ngOnInit(): void {
    this.validators = this.item.validators
  }

  pass() {
    return
  }
}
