import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-place-bet',
  templateUrl: './place-bet.component.html',
  styleUrls: ['./place-bet.component.css'],
})
export class PlaceBetComponent implements OnInit {
  _arr: any[] = [];
  get trucks(): any[] {
    return this._arr;
  }
  @Input() set trucks(newArr: any[]) {
    this._arr = newArr;
  }

  betForm: FormGroup;
  items: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.betForm = this.formBuilder.group({
      items: this.formBuilder.array([]),
    });

    this.trucks.forEach((val, i) => {
      this.addItem(val);
    });
  }

  addItem(v): void {
    this.items = this.betForm.get('items') as FormArray;
    this.items.push(this.createItem(v));
  }

  createItem(v): FormGroup {
    return this.formBuilder.group({
      bet: v.bet,
      label: v.color,
      id: v.id,
    });
  }

  @Output() setBets: EventEmitter<any> = new EventEmitter();
  setBet(i) {
    this.setBets.emit(i.value);
  }
}
