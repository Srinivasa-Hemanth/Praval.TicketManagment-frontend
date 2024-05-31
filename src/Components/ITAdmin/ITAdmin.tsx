import React, { Component } from 'react';
import './ITAdmin.css'
import TicketCard from '../Common/TicketCard';
import { GetAllTicket } from '../../Services/TicketService';
import { ITicket } from '../../Interfaces/ITickets';

interface ITAdminProps{

}

interface ITAdminState{
    activeTab:string;
    tickets:ITicket[];
}

export default class ITAdmin extends Component<ITAdminProps,ITAdminState> {
  constructor(props:ITAdminProps) {
    super(props)
  
    this.state = {
       activeTab:'allTickets',
       tickets:[]
    }
  }

  componentDidMount(): void {
    var tickets=GetAllTicket()
    this.setState({
        tickets:tickets
    })
  }

  handleTabChange=(tab:string)=>{
    this.setState({
        activeTab:tab
    })
  }

  render() {
    const {activeTab}=this.state
    return (
      <div className='p-4 admin-page border'>
        <div>Tickets Overview</div>
        <div className='card-grid cards-data'>
            <div className='border card d-flex gap-3 p-3 rounded-3 total-tickets'>
                <div>
                    Total Tickets
                </div>
                <div>
                    03
                </div>
            </div>
            <div className='border card d-flex gap-3 p-3 rounded-3 card p-3 d-flex gap-3 new-tickets'>
                <div>
                    New Tickets
                </div>
                <div>
                    03
                </div>
            </div>
            <div className='border card d-flex gap-3 p-3 rounded-3 card p-3 d-flex gap-3 on-Going-tickets'>
                <div>
                    On-Going Tickets
                </div>
                <div>
                    03
                </div>
            </div>
            <div className='border card d-flex gap-3 p-3 rounded-3 card p-3 d-flex gap-3 Resolved-tickets'>
                <div>
                    Resolved Tickets
                </div>
                <div>
                    03
                </div>
            </div>
        </div>
        <div className='tickets-card-container card border-0 mx-3'>
            <div className="border-bottom d-flex gap-lg-5 mx-4 py-4 tab-navigation px-1">
                <div className={`tab ${activeTab=='allTickets'?'activeTab':''}`} onClick={()=>this.handleTabChange('allTickets')}>
                    All Tickets
                </div>
                <div className={`tab ${activeTab=='newTickets'?'activeTab':''}`} onClick={()=>this.handleTabChange('newTickets')}>
                    New
                </div>
                <div className={`tab ${activeTab=='On-goingTickets'?'actactiveTab':''}`} onClick={()=>this.handleTabChange('On-goingTickets')}>
                    On-Going
                </div>
                <div className={`tab ${activeTab=='ResolvedTickets'?'activeTab':''}`} onClick={()=>this.handleTabChange('ResolvedTickets')}>
                    Resolved
                </div>
            </div>
            <div className='tickets-card border-0 p-4 d-flex flex-column gap-4'>
                <TicketCard/>
                <TicketCard/>
                <TicketCard/>
                <TicketCard/>
            </div>
        </div>
      </div>
    )
  }
}
