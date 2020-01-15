# An Introduction To React
 Welcome to my introduction to react project. This project was put together for you, my fellow 
 coworkers, to help you embark on your React journey going forward. As you know we will be 
 kicking off a re-development of the CCC in the near future. So..... here are some of the
 core concepts/patterns that come up in react and I found useful.
 
 Yes will be going over hooks as well.... You will find it under the `hooks` root project.
 
 ## Table of Contents
 1. [JSX & Rending Elements](#1-jsx-javascript-syntax-extension--rendering-elements)
 1. [Components & Props](#2-components--props)
 1. [State & Life Cycles](#3-state--life-cycles)
 1. [Fragments](#4-fragments)
 1. [React.Children & Clone Element](#5-reactchildren--clone-element)
 1. [Context](#6-context)
 1. [Render Props & HOC's](#7-render-props--hocs)
 1. [Portals](#8-portals)
 1. [Ref's](#9-refs)
 1. [Suspense](#10-suspense)
 
 ## The Breakdown
 My goal was to keep this project and all of the concepts in a single application, rather than
 a separate application for each concept. While this might make things slightly more complicated
 initially, I believe it will be easier to manage the introduction session. With that being said
 I am writing this before creating the application.
 
 To help mitigate any struggles I have created an `app.start` where the learning will take place,
 and an `app.solution` with the completed app if you should have trouble. I will make sure to
 comment above each component or function to note which concept it relates to, and the tasks laid
 out.
 
 For a `TLDR;` style of introduction (plus some) of the concept please come back to this page,
 you will find more details about how to apply this concept along with addition resources if
 you will have questions.
 
 **Well lets kick it off!**
 
 
 
 ### 1. JSX (Javascript Syntax Extension) & Rendering Elements
 
 #### JSX :
 What the heck is this.....
 
    const intro = <p>Hey, my name is Cameron</p>;
 
This is JSX and it was created to alleviate the pains associated with templating languages
and rendering. The developers responsible for it's creation noted that rendering logic is
largely coupled with UI logic, so why separate the two into separate files like it was 
traditionally done?

So what can you do with it? 

- You can embed expressions

 ```
//Any valid javascript expressions can be places between the braces

const guess = 'Karen';
 const response = <p>Sorry, was your name {guess}</p>
```

- Specifying Attributes

```
//Use quotes to specify string literals as attributes
//You can also specify expressions as attributes... but don't quote the brackets.

const dumpLook = <img src={me.frustratedLookUrl}/> 
```

- The dirty dirty

When JSX is compiled, the contents are converted via regular JavaScript function calls (`React.createElement`)
 and eventually create JavaScript Objects (`React Elements`). 
 
 [You can find the advanced documentation on JSX here.](https://reactjs.org/docs/jsx-in-depth.html)
 
 #### Rendering Elements :
 
 Element are what components built from and what you view on your screen.
 
     const element = <h1>Hello, Team</h1>;

In React and HTML in get general, you have some element which the structure
of your content or application is developed from. In HTML this is generally 
the `<body>` tag, but in React this is a `<div>` tag inside the `<body>` 
with an id or root `<div id="root">`. Everything inside of this `root` node 
is managed by React.

To render an element to the root node you will use the `ReactDOM.render()` 
method.

For example:

    const welcome = <h1>Welcome to my React introduction</h1>;
    ReactDOM.render(welcome, document.getElementById("root"));   
    
Once these elements are created they are **immutable**!!! The only way to
update or change these elements and their attributes is to create a new one.

....but wait isn't that expensive?

NO! React creates a virtual dom that is a replication of the rendered dom
which is uses to compare the elements and their children for changes, and
only renders the variation.

 ### 2. Components & Props
 
 React describes components in this way... "Conceptually, components are 
 like JavaScript functions. They accept arbitrary inputs (called “props”) 
 and return React elements describing what should appear on the screen."
 These are the encapsulated reusable object your application is built
 up of.
 
 There are two possible ways to define components: either as a class or 
 function.
 
 ```
//Function

    function Toast(props){
        return <h1>{props.newYears}</h1>;
    }

//Class

    class Toast extends React.Component{
        render(){
            return <h1>{this.props.newYears}</h1>;
        }
    }
```
 The `prop` parameter stands for properties and holds the arguments
 that are passed to the component when it is instantiated. As well 
 these components **must** be capitalize, if not react interprets them 
 as built-in html components like `<p>, <div>, etc...`. 
 
 Rendering a component is very similar to the method for rendering an
 element like we saw above. We instantiate the component and render
 it to the DOM.
 
 ```
const component = <Toast newYears="Happy New Years!!!!!!" />;
ReactDOM.render(component, document.getElementById("root");
``` 

Important Note! React `props` are read-only.

Your should try and create `pure` components. This means that your function
or class does not alter their inputs in any form, and have the same
expected output with the identical inputs.

### 3. State & Life Cycles

#### State :

State is similar to props but it differs in that the component instance
has full control of the value. Instead of having to continually update the
components with each change via `ReactDOM.render`,like we learned above.
We allow react to handle the rendering and just manipulate the components
state.

When you design a class you have to implement a class `constructor` so the
instantiated class has reference to itself and additionally you have to 
pass `props` into the constructor and to `super`. This super function is
function that references the parent class constructor, so in this case 
`React.Component`.

```
class Toast extends React.Component{
    constructor(props){
        super(props);
        this.state = {phrase: this.props.phrase};
    }

    render(){
        return <h1>{this.state.phrase}<h1>;
    }
}
```

But why do you have to do this you might ask? Calling `super()` inside of
the `constructor` allows you to reference `this` before the function itself
has finished running. The props parameter inside of `super` allows you to 
access the `this.props` in the constructor. Even if you forget to pass `props`
react will still set them for you but will throw an error if you reference
it in the constructor.

Now we will go over updating state, and there are several items to note.

- First your should never update state directly
```
   class Toast extends React.Component{
       constructor(props){
           super(props);
           this.state = {phrase: this.props.phrase};
       }
        
        componentDidMount(){
            // This is a no no!!!
            this.state.phase =  "Overwriting with my cooler phrase";
        }
   
       render(){
           return <h1>{this.state.phrase}<h1>;
       }
   } 
```

instead.....

```
   class Toast extends React.Component{
       constructor(props){
           super(props);
           this.state = {phrase: this.props.phrase};
       }
        
        componentDidMount(){
            this.setState({
                this.state.phase =  "Overwriting with my inspiring cheers";
             });
        }
   
       render(){
           return <h1>{this.state.phrase}<h1>;
       }
   } 
```

- Second `props` & `state` maybe be updated asynchronously or batched together
for performance, so don't rely on their update for another state.

- Third state updates are merged. So if you have multiple states and multiple
update calls the updates only effect the individual update and will be reflected
in the latter. 

#### Life Cycle : 

Whenever a component is mounted(rendered to the DOM), updated, or unmounted 
React goes through several life cycle phase for each. For each one of these
phases you can specify specific code to be run.

I wont go through the details of each one but I will layout a table to show
you the lifecycle an what components are available and a description of each.

Mounting:

| Method | Description |
| ------ | ----------- |
| getDerivedStateFromProps | It's invoked right before calling the render method, both on the initial mount and on subsequent updates. This method exists for rare use cases where the state depends on changes in props over time.|
| componentDidMount | This method runs after the component output has been rendered to the DOM     

Updating:

| Method | Description |
| ------ | ----------- |
| getDerivedStateFromProps | It's invoked right before calling the render method, both on the initial mount and on subsequent updates. This method exists for rare use cases where the state depends on changes in props over time.|
| shouldComponentUpdate | Used to let React know if a component’s output is not affected by the current change in state or props. |
| getSnapshotBeforeUpdate | This is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM before it is potentially changed (before componentDidUpdate is called) |
| componentDidUpdate | This is invoked immediately after updating occurs. This method is not called for the initial render. |

Unmounting:

| Method | Description |
| ------ | ----------- |
| componentWillUnmount | This is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method. |
 
 
 Example:
 ```
 class Toast extends React.Component{
     constructor(props){
         super(props);
         this.state = {phrase: this.props.phrase, updateCount: 0};
     }

    compondentDidUpdate(){
        this.setState({ this.state.updateCount + 1 });
    }
 
     render(){
         return <h1>{this.state.phrase}<h1>;
     }
 }
 ```

[React document on State and Life Cycles](https://reactjs.org/docs/react-component.html)

### 4. Fragments

Fragments are used to help solve a common anti-pattern that arises when 
developing in react. When a component `return`'s more than one element
that element must be contained within a parent element. For some built in
components such as `<tr>` this can be a problem and cause invalid html.

Fragments let you group a list of children without adding extra nodes 
to the DOM.

```
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

[React Document on Fragments](https://reactjs.org/docs/fragments.html)

### 5. React.Children & Clone Element

React provides a helpful `prop` that allows for variable rendering and
component reuse, `props.children`. When `{props.children}` is defined in
the return of a component any children defined under is instantiation will
be rendered.  

```
 class Toast extends React.Component{
     constructor(props){
         super(props);
         this.state = {phrase: this.props.phrase, updateCount: 0, response};
         this.updateResponse = this.updateResponse.bind(this);
     }

    compondentDidUpdate(){
        this.setState({ this.state.updateCount + 1 });
    }

    updateResponse(e){
        
    }
 
     render(){
         return (
            <div>
                <h1>{this.state.phrase}<h1>
                {this.props.children}
                <input/>
                <button onClick={this.updateResponse}/>
            </div>
         );
     }
 }

function Response(){
    return <p>{props.response}</p>
}

function App(){

    return(
        <Toast>
            <Response />
        </Toast>
    )
}   
```

This technique has a couple of advantages, first, the full use of the opening
and closing tag decouples the component from other components and content 
they are responsible for and Second, that content can be anything you wish, and 
it doesn't have to be defined beforehand.

React has also provided us with a couple of methods for deal with these
children ([you can find more info here](https://reactjs.org/docs/react-api.html#reactchildren)).

There is one important thing to note when dealing with the `React.Children`
utilities. The `props.children` aren't the actual children but a descriptor, 
and they are read-only. To make changes you have to make a clone and modify them. 

Imagine this in the `updateResponse`  method.
```
const children = React.Children.map( this.props.children, child => {
    return React.cloneElement(child, {
      response: child.props.response === e.target.value
    });
  });
```

### 6. Context
We know that the general pattern in react is to create an application from
a single root node, and compose children below that node. Most commonly data
is passed from parent to child via `props`, which is fine, but what if you 
want to pass a value to say the 1st, 5th and 10th nested child? 

We learned about `this.props.children` above which allows you to pass 
props to any directly associated child, but this doesn't seem to fit 
our case.

Context is best suited for global values, used by many components. It allows
you to share values at multiple levels without passing props for each one.

You can  create some global value by creating a context object. When react
is rendering a component that subscribes to context it will search up the 
tree to find the closest `Provider` with the corresponding value.

```
const MyContext = React.createContext(defaultValue);
```
The `defaultValue` argument is only used when a component does not have a matching 
`Provider` above it in the tree. 

A `MyContext.Provider` component allows all it's descendants to subscribe
to the context as it changes. A single provider can have multiple consumer
`MyContext.Consumer` components. Descendant `Providers` overwrite the
current context.

Any descendant can reference the context object using `this.context`.

The consumer component allows you subscribe to a context within a function component.

```
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>
```

Here is an example:

```
const toastContext = React.createContext();

function App(){
    let  defaultToast = "May neighbors respect you, Trouble neglect you, The angels protect you, And heaven accept you."  

    return(
    <toastContext.Provider value={defaultToast}> 
        <div>
            <Toast phrase={context}/>
        </div>
    </toastContext.Provider>
    )
}
```

[React document on Context](https://reactjs.org/docs/context.html)

[Please Beware: Take a look at this possible issue](https://github.com/facebook/react/issues/13969)

### 7. Render Props & HOC's

#### Render Props
Render Props is a technique used in react to help encapsulate and allow
for reuse of a component or some functionality it provides. It works just
like it sounds. Your component takes in a function as a prop and renders 
that functions output.

A render prop is function passed in as a prop that tells the component
what to render.

Using or cheers example
```
   class Toast extends React.Component{
       constructor(props){
           super(props);
           this.state = {phrase: this.props.phrase};
       }
        
        componentDidMount(){
            this.setState({
                this.state.phase =  "Overwriting with my inspiring cheers";
             });
        }
   
       render(){
           return <li>{this.state.phrase}<li>;
       }
   } 
``` 

A list of better cheers

```
class ToastList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <ul>
               {this.props.render()}
            </ul>
        )
    }    

}


let renderStuff =  () => {
        return <ToastList render={ toast => <Toast /> }/>
}
```

[React document on Render Props](https://reactjs.org/docs/render-props.html)

#### Higher Order Components

Similarly to render props, Higher Order Components (HOC's) are a pattern in react that all for the
reuse and encapsulation of components, and at times can be used as an
alternative to render props. 

An HOC is a function that takes in a component and returns a new component.

`const EnhancedComponent = higherOrderComponent(WrappedComponent);`  

Again similar to render props HOC's are best utilized when you have 
multiple components that share very similar logic except for maybe
function that is being called.

```
function HOCToast(WrappedComponent){
    return(
        class HOC extends React.Component(){
            render(){
                HOCToast.displayName = `HOCToast(${getDisplayName(WrappedComponent)})`;
                return <WrappedComponent {...this.props} />
            }
        }
    )
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

So to utilize this HOC


`const NewYearToast = HOCToast(<Toast />)`

Then you can use your new component any where you wish by instantiating
it. 
```
let toast = "May all your troubles during the coming year be as short as your New Year's resolutions."
<NewYearsToast  phrase={toast}/>
```

Several Important Notes.
1. HOC's don't mutate the original component, in our case `toast`.
Instead new logic should be added to the `HOC` class returned by the
HOC function. 

People have been know to take in the original component mutate that
component (via lifecycle methods or other) and return the same component.
This can cause what React call `leaky abstraction`. The consumer of the
component must know the inner working in order to stay away from conflicts.

1. Pass through unrelated props, here it is good practice to pass props
that are unrelated to the HOC to the `WrappedComponent`. This keeps the
developer from drasically changing the interface between the HOC and 
original component.

1. It is also good practive to provide your HOC with a display name for
easy debugging in [React Developer Tools](https://github.com/facebook/react-devtools) 

And a couple caveats:
1. Don't use HOC's inside a render method
1. Static methods must be copied over
1. Refs are not passed through

### 8. Portals 
In react it is general practice to develop an application from a single 
source node. While this might be fine for some applications, eventually 
situations can arise where you would like to add additional features to
your application that require reaching outside of the root node.

For example: Dialogs, hovercards, tooltips, etc.

Just like the component sounds, a `Portal` allows your to transport and 
render whatever content you wish outside of this root application node.

So how to we apply React `Portal`?

In some parent component your will render a a child component that returns a
portal.

Sticking with our `Toast` count example.
```
class Toast extends React.Component{
     constructor(props){
         super(props);
         this.state = {toast: this.props.toast, updateCount: 0};
     }
    
    compondentDidUpdate(){
        this.setState({ this.state.updateCount + 1 });
    }

    sayNewToast(toast){
        this.setState({ this.state.toast: this.toast });
    }
    
     render(){
         <Portal toastCount={this.state.updateCount}/>;
     }
}
```

The child portal component will create an element outside of the root node,
you then pass as the first argument to `createPortal` the content you want 
rendered, and the associated node as the second argument.

You can imagine here the `Popup` component contains some HTML that displays
the number of toasts that have occured. 

```
class Portal extends React.Component{
    constructor(props){
        super(props);
        this.portalElement = document.createElement('div');
    }

    componentDidMount(){
        document.body.append(this.portalElement);
    }
    
    render(){
        return ReactDOM.createPortal(<Popup toastCount={this.props.toastCount}/>, this.portalElement);
    }
}
```
[React document on Portals](https://reactjs.org/docs/portals.html)

### 9. Ref's

You can see even through this tutorial that react generally passes
props from one component to the other, and that this method isn't
always sufficient or efficient. So to allow for better encapsulation 
and reuse react has created utilities which we have seen 
`this.props.children`, `Context`, and now `Ref's`.

When using options other than `Ref` these utilities are inline with
some interface process flow, but there are situations when you need
to modify a child outside of this normal flow. This is the situation
to use `Ref's`. Think of focus, text selection, animations, etc..

To utilize ref's create one `React.createRef()` and attach it to React
elements using the ref prop

Take our portal example,  say if we wanted our popup to change based on
the state of our portal component.

```
class Portal extends React.Component{
    constructor(props){
        super(props);
        this.portalElement = document.createElement('div');
        this.myRef = React.createRef();
    }

    componentDidMount(){
        document.body.append(this.portalElement);
    }
    
    render(){
        return ReactDOM.createPortal(<Popup toastCount={this.props.toastCount} ref={this.myRef}/>, this.portalElement);
    }
}
``` 

To access and write logic around the ref, utilize `this.myRef.current`

### 10. Suspense

I didn't use suspense in this project but I thought it would be useful
to at least know about going forward.  

`Suspense` is a component that takes a fallback component as a prop
while it's children components load. It is used to support `lazy loading`.
I mention it here because react plans to develop it further to support
scenarios like data loading. Just something  to keep in the back of your mind.


####Other Topics
- Controlled/Uncontrolled Components
    - [Great artical explaining the difference in a simple manor](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)

