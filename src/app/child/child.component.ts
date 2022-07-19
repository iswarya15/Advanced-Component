import {
  Component,
  OnInit,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ChangeDetectorRef,
  Input,
  EventEmitter,
  Output,
  TemplateRef,
  OnChanges,
  SimpleChanges,
  Renderer2,
} from '@angular/core';
import { Customer } from '../customer';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent
  implements
    OnInit,
    OnChanges,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() customer: Customer = new Customer();
  @Input() toChild: TemplateRef<any>;

  @Output() updateDetails: EventEmitter<Customer> =
    new EventEmitter<Customer>();

  @Output() modifyContent: EventEmitter<any> = new EventEmitter<any>();

  message: string = 'Hello';
  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    console.log('Child Component => Constructor');
  }

  ngOnInit(): void {
    console.log('Child Component => OnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Child Component => OnChanges', changes);
  }

  ngAfterContentInit(): void {
    console.log('Child Component => AfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('Child Component => AfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('Child Component => AfterViewInit');
  }
  ngAfterViewChecked(): void {
    console.log('Child Component => AfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('Child Component => OnDestroy');
  }

  saveDetails() {
    this.updateDetails.emit(this.customer);
  }

  sayHello() {
    console.log('Hi ', this.customer.name);
  }

  changeContent() {
    this.modifyContent.emit();
  }
}

// @Input() customer: Customer = new Customer(); => sets the initial values for the customer data
