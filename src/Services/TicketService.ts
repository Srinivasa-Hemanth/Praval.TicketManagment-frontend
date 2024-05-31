import { json } from "stream/consumers";
import { ITicket } from "../Interfaces/ITickets";

export function CreateNewTicket(Ticket:ITicket){
    var Tickets:ITicket[]=JSON.parse(localStorage.getItem('Tickets')as string);
    Tickets.push(Ticket);
    localStorage.setItem('Tickets',JSON.stringify(Tickets));
}