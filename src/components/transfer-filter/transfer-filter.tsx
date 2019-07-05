import React, {Component} from 'react';
import './transfer-filter.scss';
import {declOfNum} from "../../utils";

interface Props {
  transfersCount: number;
  onSelected: Function;
}

interface State {
  transfers: any[];
}

class TransferFilter extends Component<Props, State> {

  componentWillMount() {
    this.collectStops();
  }

  collectStops() {
    const transfers = [{
      transferCount: -1,
      selected: true
    }];

    for (let i = 0; i <= this.props.transfersCount; i++) {
      transfers.push({
        transferCount: i,
        selected: false
      })
    }
    this.setState({transfers})
  }

  verboseStops = (stopsCount: number) => declOfNum(stopsCount, ['Пересадка', 'Пересадки', 'Пересадок']);

  handleCheck(index: number) {
    let transfersFilterData: any[] = [];

    if (index === 0) {
      transfersFilterData = this.state.transfers.map((el, i) => {
        el.selected = i === index;
        return el;
      })
    } else {
      transfersFilterData = this.state.transfers.map((el, i) => {
        if (i === 0) el.selected = false;
        if (i === index) el.selected = !el.selected;
        return el;
      })
    }

    this.setState({transfers: transfersFilterData});
    this.props.onSelected({
      filterBy: 'transfersCount',
      transfers: transfersFilterData.filter(el => el.selected),
    })
  }

  render() {
    return (
      <div>
        <div className="filter-title">
          Пересадки
        </div>

        <form>
          {
            this.state.transfers.map((el, i) => {
              return (
                <label key={i}>
                  <input type="checkbox" name="check" checked={el.selected}
                         onChange={() => this.handleCheck(i)}/>
                  <span className="label-text">
                    {
                      el.transferCount === -1 ?
                        'Все' : el.transferCount === 0 ?
                        'Без пересадок' : this.verboseStops(el.transferCount)
                    }
                  </span>
                </label>
              )
            })
          }
        </form>
      </div>
    );
  }
}

export default TransferFilter;
