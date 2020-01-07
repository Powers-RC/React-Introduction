import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => Icons[icon])
library.add(...iconList);


// Render Props
// IconBar takes a prop `iconArray` which is an array of font awesome icon names
// Define your `render` prop in this component, it should return the child component
// Pass a prop `iconName` to that component

function App() {
  return (
    <div className="App">
      <IconBar /* stuff goes here */ />}/>
    </div>
  );
}


// For each icon name iterate the array and pass it to the `render` prop
// Return the components to be rendered

export class IconBar extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    /* Stuff goes here*/
    return(
      <div className="icon-bar">
        /* And more here */
      </div>
    )
  }
}

export class IconTab extends React.Component{
  constructor(props){
    super(props);
    this.iconClick = this.iconClick.bind(this);
  }

  iconClick(){
    alert(this.props.iconName);
  }

  render(){
    return (
        <FontAwesomeIcon icon={this.props.iconName} onClick={this.iconClick} className={"icon-" + this.props.iconName}/>
    )
  }
}

//Portals
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
      ReactDOM.createPortal(<Modal toggleModal={this.props.toggleModal}/>, this.el)
    )
  }
}

export class Modal extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
    <div className="wrapper">
      <section className="modal-dialog">
       <p className="modal-welcome">Welcome, How can we help?<b/></p>
       <div className="modal-close">
        <IconTab iconName="times-circle" onClick={this.props.toggleModal}/>
       </div>
       <div className="chatbox"></div>
      </section>
      <section className="modal-user-input">
          <input className="modal-input" type="text" />
          <button >Submit</button>
      </section>
    </div>

    )
  }
}

export class Footer extends React.Component{
  constructor(props){
    super(props);
    this.state = {helpRequest: false};
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(){
    this.state.helpRequest? this.setState({helpRequest: false}): this.setState({helpRequest: true});
  }

  render(){
    return(
    <React.Fragment>
      <p className="help-bar">help</p>
      <IconTab iconName="question-circle"  onClick={this.toggleModal}/>
      {this.state.helpRequest? <SupportPanel toggleModal={this.toggleModal}/> : null}
    </React.Fragment >
    )
  }
}


//HOC


export default App;