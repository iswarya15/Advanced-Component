import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  TemplateRef,
} from '@angular/core';
import { Customer } from '../customer';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  @Input() customer: Customer = new Customer();
  @Input() toChild: TemplateRef<any>;

  @Output() updateDetails: EventEmitter<Customer> =
    new EventEmitter<Customer>();
  constructor() {}

  ngOnInit(): void {}
  saveDetails() {
    this.updateDetails.emit(this.customer);
  }

  sayHello() {
    console.log('Hi ', this.customer.name);
  }
}

// @Input() customer: Customer = new Customer(); => sets the initial values for the customer data
