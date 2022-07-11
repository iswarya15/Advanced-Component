import {
  Component,
  TemplateRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewContainerRef,
  ViewChildren,
  QueryList,
  Renderer2,
} from '@angular/core';
import { Customer } from './customer';
import { ChildComponent } from './child/child.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  customers: Customer[] = [
    { customerNo: 1, name: 'Robin', address: '' },
    { customerNo: 2, name: 'Will', address: '' },
    { customerNo: 3, name: 'Steve', address: '' },
    { customerNo: 4, name: 'Joyce', address: '' },
    { customerNo: 5, name: 'Jonathan', address: '' },
  ];

  selectedCustomer: Customer = this.customers[0];
  displayedColumns: string[] = ['customerNo', 'name', 'address', 'option'];
  showCustomerDetails: boolean = false;
  title = 'ADVANCED_COMPONENT';
  counter: number = 0;
  user: string = 'Agent';

  // ViewChild

  @ViewChild('tochild') public toChild: TemplateRef<any>;
  @ViewChild(ChildComponent, { static: false }) child: ChildComponent; //check how this works with static: true
  @ViewChild('para', { static: false }) paragraph: ElementRef;
  @ViewChild('role', { static: false }) userRole; //default ElementRef instance
  @ViewChild('role', { static: false, read: NgModel }) userText;
  @ViewChild('role', { read: ViewContainerRef }) roleContainer;
  @ViewChild('render', { read: ElementRef })
  divRender: ElementRef;
  @ViewChild('renderAttribute', { read: ElementRef, static: false })
  renderInputAttrib: ElementRef;
  @ViewChild('setAttribute', { read: ElementRef, static: false })
  setAttributeBtn: ElementRef;

  @ViewChildren('userCheckBox', { read: ElementRef })
  userCheckbox: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Angular raises this lifecycle hook once the view is initialized. ViewChild query is resolved during this time.
    console.log('User role Element Ref Instance => ', this.userRole);
    console.log('User role ngModel Instance =>', this.user);
    console.log('User role ContainerRef Instance =>', this.roleContainer);

    // ViewChildren
    console.log('ViewChildren User Checkbox Query list =>', this.userCheckbox);
    this.userCheckbox.forEach((element) => {
      console.log(element.nativeElement);
      element.nativeElement.checked = true; // easy way to manipulate DOM Elements
    });

    // Renderer2 for DOM Manipulations
    this.renderer.setProperty(
      this.divRender.nativeElement,
      'innerHTML',
      'This DIV is manipulated using renderer2'
    );
    this.renderer.setStyle(this.divRender.nativeElement, 'color', 'red');
    this.renderer.addClass(this.divRender.nativeElement, 'render');

    // Listen to DOM events using renderer
    this.renderer.listen(this.setAttributeBtn.nativeElement, 'click', () => {
      this.setAttribute();
    });
  }

  updateCustomer(editedCustomer: Customer) {
    console.log(editedCustomer);
    var cust = this.customers.find(
      (customer) => customer.customerNo == editedCustomer.customerNo
    );
    console.log(cust);
    Object.assign(cust, editedCustomer);
  }

  editCustomer(customer: Customer) {
    this.selectedCustomer = Object.assign({}, customer); //object is passed by reference and we only want to update the customer when it sent from the child component. So we clone and send it.
    this.showCustomerDetails = true;
    setTimeout(() => {
      this.child.sayHello();
    }, 1000);
  }

  getText() {
    this.counter++;
    this.paragraph.nativeElement.innerHTML = `new text ${this.counter}`;
  }

  setAttribute() {
    console.log('Setting attribute of DOM Element using renderer2');
    this.renderer.setAttribute(
      this.renderInputAttrib.nativeElement,
      'value',
      'name'
    );
  }
}

//displayedColumns -> Every string in the array must match the property name/key from dataSource(customer array)

//TemplateRef -> holds reference to the template defined by ng-template
