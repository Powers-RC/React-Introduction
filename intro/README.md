#An Introduction To React
 Welcome to my introduction to react project. This project was put together for you, my fellow 
 coworkers, to help you embark on your React journey going forward. As you know we will be 
 kicking off a re-development of the CCC in the near future. So..... here are some of the
 core concepts/patterns that come up in react and I found useful.
 
 Yes will be going over hooks as well.... You will find it under the `hooks` root project.
 
 ##Table of Contents
 1. JSX & Rending Elements
 1. Components & Props
 1. State & Life Cycles
 1. Fragments
 1. React.Children & Clone Element
 1. Context
 1. Render Props & HOC's
 1. Portals
 1. Ref's
 1. Suspense
 
 ##The Breakdown
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
 
 ####JSX :
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
 
 [You can find the advanced documentation here.](https://reactjs.org/docs/jsx-in-depth.html)
 
 ####Rendering Elements :
 
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
 
 #### Components :
 
 
