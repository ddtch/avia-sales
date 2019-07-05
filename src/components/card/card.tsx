import React, {Component} from 'react';
import './card.scss';

interface Props {
  animated?: boolean;
}

class Card extends Component<Props, {}> {
  render() {
    return (
      <div className={'card' + (this.props.animated ? ' hoverable' : '')}>
        {this.props.children}
      </div>
    );
  }
}

export default Card;
