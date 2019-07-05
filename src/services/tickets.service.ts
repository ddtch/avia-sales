import axios from 'axios';
import {TicketModel} from "../models/ticket.model";

class TicketsService {


  getTickets(): Promise<TicketModel[]> {
    const serverUrl = 'http://localhost:3001/tickets';
    return axios.get(serverUrl).then(resp => resp.data);
  }
}

const ticketsService = new TicketsService();

export default ticketsService;
