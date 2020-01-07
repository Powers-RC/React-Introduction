import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import coffee from './main/static/images/coffee.jpeg';
import freshAir from './main/static/images/fresh-air.jpeg';
import baby from './main/static/images/baby.jpeg';

const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => Icons[icon])
library.add(...iconList);

let backgroundContext = React.createContext();

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      backgroundImage: `url(${coffee})`,
      iconName: 'coffee'
    };
    this.iconClick = this.iconClick.bind(this);
  }

  iconClick(name){
      switch (name){
        case 'coffee':
          this.setState({backgroundImage: `url(${coffee})`});
          break;
        case 'air-freshener':
          this.setState({backgroundImage: `url(${freshAir})`});
          break;
        case 'baby':
          this.setState({backgroundImage: `url(${baby})`});
          break;
      }
  }
  render(){
    return (
            <div className="App">
              <backgroundContext.Provider value={this.state.backgroundImage}>
                <IconBar iconArray={["coffee", "air-freshener", "baby"]} render={ name => <IconTab iconName={name} onClick={() => this.iconClick(name)}/>}/>
                <backgroundContext.Consumer>
                  {
                    context => <div className="image-container" style={{backgroundImage: context}} />
                  }
                </backgroundContext.Consumer>
                <div className="fixed-footer">
                  <Footer />
                </div>
              </backgroundContext.Provider>
            </div>
    );
  }
}

export class IconBar extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let icons = this.props.iconArray.map((name) => this.props.render(name))
    return(
      <div className="fixed-header">
        {icons}
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
        <FontAwesomeIcon icon={this.props.iconName} onClick={this.props.onClick? this.props.onClick: this.iconClick}/>
    )
  }
}

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
      ReactDOM.createPortal(
      <Modal toggleModal={this.props.toggleModal}>
        <div className="modal-children">

       </div>
      </Modal>, this.el)
    )
  }
}

export class Modal extends React.Component{
  constructor(props){
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {value: '', messagesList: []};
    }

    handleSubmit(e){
      e.preventDefault();
      console.log("Value Entered: " + this.state.value);

      let currentMessages = this.state.messagesList;
      let newMessagesList = currentMessages.concat(HigherOrderMessage(Message, this.state.value));
      this.setState({messagesList: newMessagesList});
    }

    handleChange(e){
      this.setState({value: e.target.value});
    }

  render(){
    let childCount =  React.Children.count(this.props.children);
    return(
    <div className="wrapper">
      <section className="modal-dialog">
      <div className="modal-close">
          <IconTab iconName="times-circle" onClick={this.props.toggleModal}/>
       </div>
       <p className="modal-welcome">Welcome, How can we help?<b/></p>
       <div className="chatbox">
        {this.state.messagesList.length? null : <p>The `Modal` component currently has ({childCount}) {childCount == 1? 'child':  'children'}.</p>}
        {this.state.messagesList.length? null : <p>Go ahead and add some more children in the `SupportPanel` component above.</p>}
        {this.props.children}
        {this.state.messagesList.map(MessageHOC => <MessageHOC />)}
       </div>
      </section>
      <section className="modal-user-input">
        <form onSubmit={this.handleSubmit}>
          <input className="modal-input" type="text"  placeholder="What seems to be the problem?" value={this.state.value} onChange={this.handleChange}/>
          <input type="submit" value="Submit"/>
        </form>
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
      <p className="help-bar"></p>
      <IconTab iconName="question-circle"  onClick={this.toggleModal}/>
      {this.state.helpRequest? <SupportPanel toggleModal={this.toggleModal}/> : null}
    </React.Fragment >
    )
  }
}


//HOC

export class Message extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: ''};
  }

  render(){
    return <div>Test</div>
  }
}

function HigherOrderMessage(WrappedComponent, message){
  return class extends React.Component{

    edit(){

    }

    save(){

    }

   render(){
    return <WrappedComponent {...this.props}/>
   }
  }
}


export default App;
