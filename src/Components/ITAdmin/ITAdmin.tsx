import React, { Component } from 'react';
import './ITAdmin.css'
import TicketCard from '../Common/TicketCard';
import { GetAllTicket } from '../../Services/TicketService';
import { ITicket } from '../../Interfaces/ITickets';
import { TicketStatus } from '../../Common/Enum';

interface ITAdminProps{

}

interface ITAdminState{
    activeTab:string;
    tickets:ITicket[];
    filteredTicket:ITicket[];
    inProgressCount:number;
    resolvedCount:number;
    closedCount:number
}

export default class ITAdmin extends Component<ITAdminProps,ITAdminState> {
  constructor(props:ITAdminProps) {
    super(props)
  
    this.state = {
       activeTab:TicketStatus.All_Tickets,
       tickets:[],
       filteredTicket:[],
       inProgressCount:0,
        resolvedCount:0,
        closedCount:0
    }
  }

  componentDidMount(): void {
    this.getTickets()
  }

  getTickets=()=>
  {
    var tickets=GetAllTicket()
    var  filterTickets;
    var  inProgressCount;
    var  resolvedCount
    var  closedCount 
    console.log(tickets)
    this.setState({
        tickets:tickets
    })
    if(this.state.activeTab!=TicketStatus.All_Tickets)
    {   if(this.state.activeTab==TicketStatus.In_Progress)
        {
            filterTickets=tickets.filter((ticket)=>(ticket.Status==this.state.activeTab)|| (ticket.Status==TicketStatus.Open))
        }
        else{
            filterTickets=tickets.filter((ticket)=>ticket.Status==this.state.activeTab)
        }
    }
    inProgressCount=tickets.filter((ticket)=>ticket.Status==TicketStatus.In_Progress || ticket.Status==TicketStatus.Open).length;
    resolvedCount=tickets.filter((ticket)=>ticket.Status==TicketStatus.Resolved).length;
    console.log(tickets.filter((ticket)=>ticket.Status==TicketStatus.Resolved))
    closedCount=tickets.filter((ticket)=>ticket.Status==TicketStatus.Closed).length
    this.setState({
        filteredTicket:filterTickets? filterTickets :tickets,
        inProgressCount,
        resolvedCount,
        closedCount
    })
  }

  handleTabChange=(tab:string)=>{
    this.setState({
        activeTab:tab
    },()=>{
        this.getTickets()
    })
  }

  render() {
    const {activeTab,filteredTicket,inProgressCount,closedCount,resolvedCount}=this.state
    return (
      <div className='p-4 admin-page border'>
        <div className='ps-4 fs-3'>Tickets Overview</div>
        <div className='card-grid cards-data'>
            <div className='border card d-flex gap-3 p-3 rounded-3 total-tickets'>
                <div>
                    Total Tickets
                </div>
                <div>
                    {this.state.tickets.length}
                </div>
            </div>
            <div className='border card d-flex gap-3 p-3 rounded-3 card p-3 d-flex gap-3 new-tickets'>
                <div>
                   In Progress
                </div>
                <div>
                    {inProgressCount}
                </div>
            </div>
            <div className='border card d-flex gap-3 p-3 rounded-3 card p-3 d-flex gap-3 on-Going-tickets'>
                <div>
                    Resolved
                </div>
                <div>
                    {resolvedCount}
                </div>
            </div>
            <div className='border card d-flex gap-3 p-3 rounded-3 card p-3 d-flex gap-3 Resolved-tickets'>
                <div>
                    Closed
                </div>
                <div>
                {closedCount}
                </div>
            </div>
        </div>
        <div className='tickets-card-container card border-0 mx-3'>
            <div className="border-bottom d-flex gap-lg-5 mx-4 py-4 tab-navigation px-1">
                <div className={`tab ${activeTab==TicketStatus.All_Tickets?'activeTab':''}`} onClick={()=>this.handleTabChange(TicketStatus.All_Tickets)}>
                    All Tickets
                </div>
                <div className={`tab ${activeTab==TicketStatus.In_Progress?'activeTab':''}`} onClick={()=>this.handleTabChange(TicketStatus.In_Progress)}>
                    In Progress
                </div>
                <div className={`tab ${activeTab==TicketStatus.Resolved?'activeTab':''}`} onClick={()=>this.handleTabChange(TicketStatus.Resolved)}>
                    Resolved
                </div>
                <div className={`tab ${activeTab==TicketStatus.Closed?'activeTab':''}`} onClick={()=>this.handleTabChange(TicketStatus.Closed)}>
                    Closed
                </div>
            </div>
            <div className='tickets-card border-0 p-4 d-flex flex-column gap-4'>
                {filteredTicket.map((ticket,index)=>(
                    <TicketCard ticketData={ticket}/>
                ))}
            </div>
        </div>
      </div>
    )
  }
}
