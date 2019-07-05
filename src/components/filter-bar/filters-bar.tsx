import React, {Component} from 'react';
import Card from "../card/card";
import CurrencyFilter from "../currency-filter/currency.filter";
import TransferFilter from "../transfer-filter/transfer-filter";

import './filter-bar.scss';

interface Props {
  onFilterChanged: Function;
}

class FiltersBar extends Component<Props, {}> {

  filterData(data: any) {
    this.props.onFilterChanged(data);
  }

  render() {
    return (
      <Card>
        <div className="filter-block">
          <CurrencyFilter onSelected={(data: any) => this.filterData(data)}/>
        </div>
        <div className="filter-block">
          <TransferFilter transfersCount={3} onSelected={(transfersData: any) => this.filterData(transfersData)}/>
        </div>
      </Card>
    );
  }
}

export default FiltersBar;
