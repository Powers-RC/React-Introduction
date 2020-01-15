import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { WaveSpinner } from "react-spinners-kit";
import coffee from './main/static/images/coffee.jpeg';
import freshAir from './main/static/images/fresh-air.jpeg';
import baby from './main/static/images/baby.jpeg';
const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => Icons[icon])
library.add(...iconList);



/* Head down to the Message component and correct the Fragment portion to remove initial error*/



// Render Props(
  // IconBar takes a prop `iconArray` which is an array of font awesome icon names
  // Define your `render` prop in this component, it should return the child component
  // Pass a prop `iconName` to that component
  // and pass an `onClick` prop as an arrow function returning the `iconClick` handler
// )

// Context
  //create a context variable outside of the app just below these comments
  //Define the context provider in the render block below the `App` div, Pass it the prop `value`
  //set the prop value to the state background image.
  //Then define the consumer of the context you just created. Hint.... Look at the readme and the issue I ran into with context


/*Context: Stuff goes here */

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      backgroundImage: `url(${coffee})`,
      iconName: 'coffee',
      loading: false
    };
    this.iconClick = this.iconClick.bind(this);
  }

  iconClick(name){
        switch (name){
          case 'coffee':
          this.setState({loading: true})
          setTimeout(
              () => {
                this.setState({backgroundImage: `url(${coffee})`, loading: false});
              }, 2000
            )
            break;
          case 'air-freshener':
            this.setState({loading: true})
            setTimeout(
              () => {
                this.setState({backgroundImage: `url(${freshAir})`, loading: false});
              }, 2000
            )
            break;
          case 'baby':
            this.setState({loading: true})
            setTimeout(
              () => {
                 this.setState({backgroundImage: `url(${baby})`, loading: false});
               }, 2000
             )
            break;
        }
    }


  render(){
    return (
      <div className="App">
        /* Context: Stuff here */
          <IconBar iconArray={["coffee", "air-freshener", "baby"]} /* RenderProp: Stuff goes here */ loading={this.state.loading}/>
          /* Context: Inner stuff */
             <div className="image-container" style={{backgroundImage: context}} />
          /* Context:  Close inner stuff */
          <div className="fixed-footer">
            <Footer />
          </div>
       /* Context: Close stuff here */
      </div>
    );
  }
}

// Render Prop(
  // For each icon name iterate the array and pass it to the `render` prop
  // Return the components to be rendered
//  )

export class IconBar extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    /* Render Prop: stuff goes here*/
    return(
      <div className="icon-bar">
        /* Render Prop: and more here */
        <WaveSpinner className="spinner"
            loading={this.props.loading}
         />
      </div>
    )
  }
}

export class IconTab extends React.Component{
  constructor(props){
    super(props);
    this.iconClick = this.iconClick.bind(this);
    this.focus = this.focus.bind(this);
    this.state ={style: {color: ''}};
  }

  iconClick(){
    alert(this.props.iconName);
  }

  focus(){
      this.setState({style: {color: "LightBlue"}});
      setTimeout(
        () => this.setState({style: {color: "white"}}), 200
      );
    }

  render(){
    return (
        <FontAwesomeIcon icon={this.props.iconName} onClick={this.iconClick} className={"icon-" + this.props.iconName}/>
    )
  }
}

//Portals (
  // define and create a variable that holds a container which will wrap our modal. Try using `document.createElement`
  // add a class name to that element `modal-container`
//  )

export class SupportPanel extends React.Component{
  constructor(props){
    super(props);
    this.el = document.createElement("div");
    this.el.className = "modal-container";
  }

  componentDidMount(){
    document.body.appendChild(this.el);
  }

  componentWillUnmount(){
    document.body.removeChild(this.el);
  }

  render(){
    return(
    null
    // Create the react portal here & remove the null above
    )
  }
}


//prevent the re-rendering if the component on form submission. Hint use `preventDefault`
//set the state of `value` to value submitted by the form
//Children:
  //define a variable `childCount` which counts the children of Modal in the render function
  //pass props to the children in the `chatbox` div
//HOC:
  //Render all of the Messages in the `chatbox` div
export class Modal extends React.Component{
  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {value: '', messagesList: [], color: 'blue'};
  }

  handleSubmit(e){
      /* stuff goes here */
     let currentMessages = this.state.messagesList;
     let newMessagesList; /* HOC: stuff goes here */
     this.state.color == 'blue'? this.setState({messagesList: newMessagesList, color: 'red'}) :
       this.setState({messagesList: newMessagesList, color: 'blue'});
   }

   handleChange(e){
     /* stuff goes here*/
   }

  render(){
    /* Children: Stuff*/
    return(
    <div className="wrapper">
      <section className="modal-dialog">
       <p className="modal-welcome">Welcome, How can we help?<b/></p>
       <div className="modal-close">
        <IconTab iconName="times-circle" onClick={this.props.toggleModal}/>
       </div>
       <div className="chatbox">
        {this.state.messagesList.length? null : <p>The `Modal` component currently has ({childCount}) {childCount == 1? 'child':  'children'}.</p>}
        {this.state.messagesList.length? null : <p>Go ahead and add some more children in the `SupportPanel` component above.</p>}
        /* Children: Stuff */
        /* HOC: Stuff */
       </div>
      </section>
      <section className="modal-user-input">
        <form onSubmit={this.handleSubmit}>
          <input className="modal-input" type="text"  placeholder="What seems to be the problem?"
            value={this.state.value} onChange={this.handleChange}/>
          <input type="submit" value="Submit"/>
        </form>
      </section>
    </div>

    )
  }
}

//Ref's
  // define the ref in the constructor
  // set the refs focus using `current.focus()` in the toggleModal event handler
  // pass the ref as a prop to the IconTab
export class Footer extends React.Component{
  constructor(props){
    super(props);
    this.state = {helpRequest: false};
    this.toggleModal = this.toggleModal.bind(this);
    /* Ref stuff goes */
  }

  toggleModal(){
    /* Ref: stuff goes here*/
    this.state.helpRequest? this.setState({helpRequest: false}): this.setState({helpRequest: true});
  }

  render(){
    return(
      <React.Fragment>
        <IconTab iconName="question-circle"  onClick={this.toggleModal} /*Ref: stuff goes here *//>
        {this.state.helpRequest? <SupportPanel toggleModal={this.toggleModal}/> : null}
      </React.Fragment>
    )
  }
}

//  React.Fragment
export class Message extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
        /* Fragment: stuff goes here*/
        <div style={{textAlign:'left', color: this.props.color}}>
          {this.props.message}
        </div>
        <br/>
    )
  }
}

//HOC
  // Define the component we are superimposing and props used in the component
  //Then return the component and pass the props
// Go to Modal Component
  //Define a `newMessageList` variable and add the new message to current messages
function HigherOrderMessage(/* HOC: stuff goes here*/){
  return class extends React.Component{
    constructor(props){
      super(props);
    }
    save(){
    }

    edit(){
    }

   render(){
    return /* HOC: stuff goes here */
   }
  }
}

export default App;