# ADVANCED COMPONENT

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Content Projection using ng-content

We know how to use `@Input` decorator to pass data from the parent component to child component. But it is only limited to data. We cannot use that technique to pass content which includes HTML, CSS, etc to the child component. To do that we can make use of `Content Projection`

`Content projection` is a way to pass the HTML content from the parent component to the child component. We us the `ng-content` element to designate a spot in the template of child component.

The `ng-content` also allows us to create multiple slots using the selector attribute. The parent can send different content to each slot.

The `ng-content` tag acts as a `placeholder` for inserting external or dynamic content. The Parent component passes the external content to the child component. When Angular parses the template, it inserts the external content where ng-content appears in the child component’s template

## Input, Output, EventEmitter

`@Input` defines Input property in the child component, which the parent component can set through property binding(using square bracket)

`@Output` defines the output property(event) which we raise in the child component using the Event Emitter. The parent component listens to these events

## How to use ng-template & TemplateRef in Angular

`ng-template` is an Angular element, which contains the template. `ng-template` only defines the template and does not render itself on DOM. We need to specify when and where to render it

There are few ways to display the template

- `ngTemplateOutlet` directive
- TemplateRef & ViewContainerRef

`ngTemplateOutlet` directive instructs where the template has to be placed

```
<ng-container *ngTemplateOutlet="template">
</ng-container>

<ng-template #template>
<p>Hello</p>
</ng-template>
```

`TemplateRef` is a class and a way to reference `ng-template` in the component. We can use `ViewChild` query to inject the `template` into our component as an instance of the class `TemplateRef`

Syntax for `ViewChild` decorator

```
@ViewChild([reference from template, {read: reference type}])
```

We can also pass `ng-template` via `@Input` decorator to child component. Declare ng-template in the component using `ViewChild` and pass it to the child component via property binding.

## ViewChild and ViewChildren

`ViewChild` and `ViewChildren` decorators are used to Query and get reference of DOM element in the component. `ViewChild` returns the first matching DOM element and `ViewChildren` returns all the matching elements as a QueryList.

Syntax of ViewChild

```
ViewChild(selector: string | Function | Type<any>, opts: {read?: any; static: boolean;}): any
```

`selector` can be a string, a type/function that returns a string type.

`static` determines when query is resolved. True is when view is initialized (before the first change detection) for first time. False is if you want it to be resolved after every change detection.

`read`: ElementRef/TemplateRef

### ViewChild returns undefined

`ViewChild` returning undefined is one of the common errors. This happens when we try to use the value before `ViewChild` initializes it

```
ViewChild(ChildComponent, {static: true}) child: ChildComponent;

constructor(){
  this.child.sayHello();
}
```

This code would result in cannot read property `sayHello` of `undefined`. This is because the component's view has not been initialized yet
when the constructor is run.
The solution is to wait until Angular initializes the view. Angular raises the `AfterViewInit` lifecycle hook once it completes the initialization. So we can use the `ngAfterViewInit` to access the child variable.

```
ngAfterViewInit() {
  this.child.sayHello();
}
```

## Using Static Option in ViewChild

We used the {static: true} in the above code. The static option determines the timing of ViewChild query resolution.

So as a rule of thumb you can go for the following:

`{ static: true }` needs to be set when you want to `access` the ViewChild in `ngOnInit`.

`{ static: false }` can only be accessed in `ngAfterViewInit`. This is also what you want to go for when you have a structural directive (i.e. ngIf) on your element in your template.

## Using Read Option in ViewChild

A single element can be associated with multiple types.

```
<input #role [(ngModel)]="user">
ViewChild('role', {static: false}) userRole;
```

By default,`ViewChild` returns the instance of `input` element as `ElementRef`. If selector param is component then it
returns the component instance.
Check app.component.ts to see how `ViewChild` returns different types of same element using `read` parameter.

## ViewChildren

`ViewChildren` gets the list of element references from the view.

`ViewChildren` syntax is very much similar to the `ViewChild`, except for the `static` option - it does not have a
static option since the `ViewChildren` is resolved always after every change detection.

`QueryList` is the return type of `ViewChildren`. `QueryList` stores the items returned by `ViewChildren` in a list.
Angular updates this list on every change detection.

It also provides methods and properties like length,first,last and other JS array methods. Check `ngAfterViewInit` method in
app.component.ts for `QueryList` iterables.

## Renderer2

The `Renderer2` allows us to manipulate the DOM elements, without accessing the DOM directly. It provides a layer of
abstraction between the component code and the `DOM` element. Using `renderer2`, we can create an element, add a text node to it,
append the child using the `appendchild` method.

### Why not ElementRef?

We can use the `nativeElement` property of the `ElementRef` to manipulate the DOM. The `nativeElement` property gives direct access
to the DOM bypassing Angular.This is not a recommended approach

### How to use Renderer2?

- Import `Renderer2` from `@angular/core`
- Inject into the component
  ```
  constructor(private renderer: Renderer2){}
  ```
- Use `ElementRef` & `ViewChild` to get the reference of the DOM element
  ```
  ViewChild('render', { read:ElementRef }) renderDiv: ElementRef
  ```
- Use methods like `setProperty`, `setStyle`,`setAttribute` to change property, styles of the element
  ```
  this.renderer.setProperty(this.renderDiv.nativeElement, 'innerHTML','This div is modified using renderer2');
  this.renderer.setStyle(this.renderDiv.nativeElement, 'color','red');
  this.renderer.setAttribute(this.renderAttribute.nativeElement, 'value','name');
  ```

### Listening to DOM Events

We can also listen to DOM Events using `listen` method of `renderer`. The listen method takes 3 arguments.

```
this.renderer.listen(this.setAttributeBtn, 'click', () => {
  console.log('Perform action');
})
```

## Life Cycle of component

The lifecycle of a component starts when Angular `instantiates` the component.

Instantiation starts with invoking the component's `constructor` and injecting the services vie `Dependency Injection`.
Once the Angular instantiates the component, it starts the `change detection` cycle for the component.

It checks and update any data-bound `Input` property of the component & initializes the component. It then raises the following
lifecycle methods.

`OnChanges` => If Angular detects any change to the `Input` property. It runs every time, an `Input` property changes

`OnInit` => This hook runs tells us the component is ready and runs only once. This hook gives us a chance to run any initialization
logic and update few properties.

`DoCheck` => Allows us to run custom change detection. This hook runs during every change detection cycle.

After this Angular invokes four more hooks. They are `AfterContentInit`, `AfterContentChecked`, `AfterViewInit`, `AfterViewChecked`

`ngOnDestroy` => When we remove the component

## Content vs View

Hooks `AfterContentInit`, `AfterContentChecked` deals with `Content`. while `AfterViewInit`, `AfterViewChecked` deals with `View`

### Content

`Content` refers to the external content injected into a component via `Content Projection`

Check how Content Projection is done in `app.component.html` to `child.component.html` using `ng-content`

### View

`View` refers to the template of the component.

## AfterContentInit

`AfterContentInit` is the life cycle hook that Angular calls after the component's `content` has been `initialized` and injected into
the Component's `view`

## AfterContentChecked

`AfterContentChecked` is the life cycle that Angular calls during `every change detection cycle` after Angular completes checking
content for changes.

## AfterViewInit

`AfterViewInit` => lifecycle hook that Angular calls during the `change detection` after it completes the `initialization` of
the `component's view` and its `child's view`

## AfterViewChecked

`AfterViewChecked` => life cycle hook that Angular calls after the change detector `completes` the checking of a component's view
and child views `for changes`.

Angular updates the properties decorated with `ViewChild` and `ViewChildren` properties before raising this hook

## Init vs Checked

`Init Hooks` => Angular fires `AfterContentInit` & `AfterViewInit` hooks when the _content or view is initialized for the first time_.
That happens during the first change detection cycle, when Angular instantiates the component.

`Checked Hooks` => Angular checks if the content/view has changed. i.e. _previously rendered content or view is same as current content or view_

### On Component Creation

On the component creation, the hooks are fired in the following order.

1. OnChanges
2. OnInit
3. DoCheck
4. AfterContentInit
5. AfterContentChecked
6. AfterViewInit
7. AfterViewChecked

Angular initializes and checks the `content` first, before the component's view and child views. After content, angular initializes the component's view

`AfterViewInit`, `AfterViewChecked` fires after the child components are ready.

Avoid using `Checked Hooks` since they run on every change detection cycle. For example, when you click on input element and move away.
If you choose to implement these hooks, make sure the code is extremely light weight.
