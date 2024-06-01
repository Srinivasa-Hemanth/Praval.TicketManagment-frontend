import React, { Component } from 'react'
import './TicketCard.css';
import { ITicket } from '../../Interfaces/ITickets';
import { Priority } from '../../Common/Enum';

interface ITicketCardProps{
    ticketData?:ITicket
}

interface ITicketCardState{

}

export default class TicketCard extends Component<ITicketCardProps,ITicketCardState> {
  constructor(props:ITicketCardProps) {
    super(props)
  
    this.state = {
       
    }
  }

  getTicketClassName = (priority:any) => {
    switch (priority) {
        case Priority.High:
            return 'priority-high';
        case Priority.Medium:
            return 'priority-medium';
        case Priority.Low:
            return 'priority-low';
        default:
            return '';
    }
};
  
  render() {
    const {ticketData}=this.props;
    return (
      <div className='p-4 border'>
        <div className='title d-flex gap-2'>
            <div className={`ticket-status rounder rounded-5 ${this.getTicketClassName(ticketData?.Priority)}`}>
            </div>
            <div className='ticket-id'>
                {ticketData?.TicketId}
            </div>
        </div>
        <div className='align-items-center d-flex gap-3 subject-container d-flex'>
            <div className='subject'>
                How to fix server unreachable
            </div>
            <div className={`p-1 priority px-3 rounded-5 text-white ${this.getTicketClassName(ticketData?.Priority)}`}>
                {ticketData?.Priority}
            </div>
        </div>
        <div className='description'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta aut, velit debitis exercitationem et tempore animi eveniet ipsa laboriosam ipsam quas asperiores modi esse beatae! Odit, deleniti. Ab, sequi alias!
        </div>
        <hr className=''></hr>
        <div className='d-flex justify-content-end border-buttom text-primary'>
            Open Ticket
        </div>
      </div>
    )
  }
}

