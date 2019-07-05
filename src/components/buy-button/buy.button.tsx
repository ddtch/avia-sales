import React, {Component} from 'react';
import './buy-button.scss';

interface Props {
  amount: number;
  onClick: Function;
  currency?: string;
}

class BuyButton extends Component<Props, {}> {

  onClicked(e: any) {
    e.preventDefault();
    return this.props.onClick();
  }

  render() {
    const {amount, currency} = this.props;
    return (
      <button className="buy-btn" type="button" onClick={(e) => this.onClicked(e)}>
        Купить <br/>за {amount} {currency ? currency : ''}
      </button>
    );
  }
}

export default BuyButton;
