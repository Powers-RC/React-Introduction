import React from 'react';
import { IconTab } from './IconTab';

export class IconBar extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let icons = this.props.iconArray.map((name) => this.props.render(name))
    return(
      <div className="icon-bar">
        {icons}
      </div>
    )
  }
}
