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

let backgroundContext = React.createContext();

class App extends React.Component {
  constructor(props){
    super(props);
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
              <backgroundContext.Provider value={this.state.backgroundImage}>
                <IconBar iconArray={["coffee", "air-freshener", "baby"]} render={ name => <IconTab iconName={name}
                  onClick={() => this.iconClick(name)}/>} loading={this.state.loading}/>
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
        <FontAwesomeIcon icon={this.props.iconName} onClick={this.props.onClick? this.props.onClick: this.iconClick} style={this.state.style}/>
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
      this.state = {value: '', messagesList: [], color: 'blue'};
    }

    handleSubmit(e){
      e.preventDefault();
      console.log("Value Entered: " + this.state.value);

      let currentMessages = this.state.messagesList;
      let newMessagesList = currentMessages.concat(HigherOrderMessage(Message, this.state.value, this.state.color));
      this.state.color == 'blue'? this.setState({messagesList: newMessagesList, color: 'red'}) :
        this.setState({messagesList: newMessagesList, color: 'blue'});
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
          <input className="modal-input" type="text"  placeholder="What seems to be the problem?"
            value={this.state.value} onChange={this.handleChange}/>
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
    this.iconClickRef = React.createRef();
  }

  toggleModal(){
    this.iconClickRef.current.focus();
    this.state.helpRequest? this.setState({helpRequest: false}): this.setState({helpRequest: true});
  }

  render(){
    return(
    <React.Fragment>
      <IconTab iconName="question-circle"  onClick={this.toggleModal} ref={this.iconClickRef}/>
      {this.state.helpRequest? <SupportPanel toggleModal={this.toggleModal}/> : null}
    </React.Fragment >
    )
  }
}


//HOC

export class Message extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <React.Fragment>
        <div style={{textAlign:'left', color: this.props.color}}>
          {this.props.message}
        </div>
        <br/>
      </React.Fragment>
    )
  }
}

function HigherOrderMessage(WrappedComponent, message, color){
  return class extends React.Component{
    constructor(props){
      super(props)
    }
    save(){
    }

    edit(){
    }

   render(){
    return <WrappedComponent message={message} color={color}/>
   }
  }
}


export default App;
