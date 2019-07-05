import React, {Component} from 'react';
import './currency-filter.scss';
import currencyService from "../../services/currency.service";

interface Props {
  onSelected: Function;
}

interface State {
  selectedItem?: number;
}

const currencies = [
  {
    title: 'RUB',
    value: 0,
    active: true,
  },
  {
    title: 'USD',
    value: 0,
    active: false,
  },
  {
    title: 'EUR',
    value: 0,
    active: false,
  }
];

class CurrencyFilter extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {selectedItem: 0};
  }

  chooseCurrency(curIndex: number) {
    this.setState({selectedItem: curIndex});
    currencies.map((el, i) => {
      el.active = i === curIndex;
      return el;
    });

    currencyService.getRates(currencies[curIndex].title).then(data => {
      currencies[curIndex].value = data ? data.Value : 0;

      this.props.onSelected({
        filterBy: 'currency',
        currency: currencies[curIndex]
      });

    });
  };

  componentWillMount(): void {
    this.props.onSelected({
      filterBy: 'currency',
      currency: currencies[0]
    });
  }

  render() {
    return (
      <div>
        <div className="filter-title">
          Валюта
        </div>
        <div className="btn-group">
          {currencies.map((cur, i) => {
            return (
              <div className={'btn' + (cur.active ? ' active' : '')} key={i}
                   onClick={() => this.chooseCurrency(i)}>
                {cur.title}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default CurrencyFilter;
