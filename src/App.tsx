import React from 'react';
import './App.scss';
import ticketsService from "./services/tickets.service";
import {TicketModel} from "./models/ticket.model";
import TicketsList from "./components/tickets-list/tickets.list";
import FiltersBar from "./components/filter-bar/filters-bar";

interface State {
  initialTickets?: TicketModel[];
  tickets?: TicketModel[];
  selectedCurrency?: string;
}

class App extends React.Component<{}, State> {

  state = {
    initialTickets: [],
    tickets: [],
    selectedCurrency: ''
  };

  getTickets() {
    ticketsService.getTickets().then((data: TicketModel[]) => {
      data.sort((a, b) => a.price - b.price);
      this.setState({tickets: data, initialTickets: data});
    })
  }

  componentDidMount(): void {
    this.getTickets();
  }

  filterTickets(filterData: any) {
    switch (filterData.filterBy) {
      case "transfersCount":
        this.filterTicketsByTransfersCount(filterData.transfers);
        break;
      case "currency":
        this.filterTicketsByCurrency(filterData.currency);
        break;
    }
  };

  filterTicketsByTransfersCount(transfers: any[]) {
    const {initialTickets} = this.state;
    let filteredTickets: TicketModel[] = [];

    if(!transfers.length || transfers[0].transferCount === -1) {
      filteredTickets = initialTickets;
    }

    transfers.forEach((transfer) => {
      filteredTickets.push(
        ...initialTickets.filter(ticket => ticket['stops'] === transfer.transferCount)
      )
    });

    this.setState({tickets: filteredTickets})
  }

  filterTicketsByCurrency(currency: any) {
    this.setState({selectedCurrency: currency});
  }

  render() {
    const {tickets, selectedCurrency} = this.state;
    return (
      <div className="App">
        <div className="header">
          Header
        </div>
        <div className="wrapper">
          <div className="sidebar block">
            <FiltersBar onFilterChanged={(filterData: any) => this.filterTickets(filterData)}/>
          </div>
          <div className="section block">
            {
              tickets.length ?
                <TicketsList tickets={this.state.tickets} currency={selectedCurrency}/> :
                null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App;
