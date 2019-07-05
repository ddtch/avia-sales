import React from 'react';
import './tickets-list.scss';
import plane from '../../assets/svg/black-plane.svg';
import {TicketModel} from "../../models/ticket.model";
import Card from "../card/card";
import BuyButton from "../buy-button/buy.button";
import {declOfNum} from "../../utils";
import moment from 'moment';

export interface Props {
  tickets: TicketModel[];
  currency: any;
}

class TicketsList extends React.Component<Props, {}> {

  buyTicket = (ticketIndex: number) => {
    console.log(ticketIndex)
  };

  verboseTitle = (stopsCount: number) => {
    if (!stopsCount) {
      return 'Прямой'
    } else {
      return declOfNum(stopsCount, ['Переcадка', 'Пересадки', 'Пересадок']);
    }
  };

  formatDate = (date: string) => {
    return moment(date, 'dd.MM.YY').format('D MMM YYYY, ddd')
  };

  calculatePrice = (originalPrice: number) => {
    const {currency} = this.props;
    if (!currency.value) return originalPrice;
    return Math.ceil(originalPrice / currency.value);
  };

  render() {
    const {tickets, currency} = this.props;
    return (
      <div className="tickets-list-holder">
        {tickets.map((ticket, i) => (
          <Card key={i} animated>
            <div className="ticket">
              <div className="part left">
                <img
                  src="//upload.wikimedia.org/wikipedia/en/thumb/9/97/Air_China_Logo.svg/250px-Air_China_Logo.svg.png"
                  alt="company logo" />
                <BuyButton amount={this.calculatePrice(ticket.price)} currency={currency.title} onClick={() => this.buyTicket(i)}/>
              </div>

              <div className="vertical-sep"></div>

              <div className="part right">

                <div className="row">
                  <div className="time">
                    {ticket.departure_time}
                  </div>

                  <div className="separator">
                    {this.verboseTitle(ticket.stops)}
                    <div>
                      <span className="line"></span><img src={plane} alt="plane icon"/>
                    </div>
                  </div>

                  <div className="time">
                    {ticket.arrival_time}
                  </div>
                </div>

                <div className="row">
                  <div className="meta departure">
                    <div className="port">
                      {ticket.origin}, {ticket.origin_name}
                    </div>

                    <div className="date">
                      {this.formatDate(ticket.departure_date)}
                    </div>
                  </div>

                  <div className="meta arrival">
                    <div className="port">
                      {ticket.destination}, {ticket.destination_name}
                    </div>

                    <div className="date">
                      {this.formatDate(ticket.arrival_date)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          )
        )}
      </div>
    );
  }
}

export default TicketsList;
