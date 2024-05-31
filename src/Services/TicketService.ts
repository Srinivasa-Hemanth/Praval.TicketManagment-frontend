import { json } from "stream/consumers";
import { ITicket } from "../Interfaces/ITickets";

export function CreateNewTicket(Ticket: ITicket) {
    let Tickets: ITicket[] = JSON.parse(localStorage.getItem('Tickets') as string) || [];
    Tickets.push(Ticket);
    localStorage.setItem('Tickets', JSON.stringify(Tickets));
}


export function GetAllTicket(){
    var users:ITicket[]=JSON.parse(localStorage.getItem('Tickets') as string);
    return users;
}