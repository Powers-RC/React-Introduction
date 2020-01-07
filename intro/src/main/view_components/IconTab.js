import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => Icons[icon])
library.add(...iconList);






export class IconTab extends React.Component{
  constructor(props){
    super(props);
  }




  render(){
    return (
    <React.Fragment>
      <FontAwesomeIcon icon={this.props.iconName} onClick={this.iconClick}/>
    </React.Fragment>
  )
}
}
