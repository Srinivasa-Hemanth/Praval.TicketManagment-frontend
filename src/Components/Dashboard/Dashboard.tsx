import * as React from 'react';
import { Modal } from 'react-bootstrap';
import AddRequest from '../Forms/AddRequest';
import { IFormState } from '../../Interfaces/IForm';
import RequestDevice from '../Forms/RequestDevice';
import { ITicket } from '../../Interfaces/ITickets';
import { GetAllTicket } from '../../Services/TicketService';
import pic from '../../Assets/SVG/undraw_landscape_photographer_blv1.svg';
import { TicketStatus } from '../../Common/Enum';
import TicketCard from '../Common/TicketCard';

interface IDashboardProps {
  cardClicked: string;
  openForm: boolean;
  account:any;
}

interface IUserDashboardState {
  cardClicked: string;
  showAddRequest: boolean;
  showModal: boolean;
  requestData: ITicket[];
  activeTab:string;
  tickets:ITicket[];
  filteredTicket:ITicket[];
  inProgressCount:number;
  resolvedCount:number;
  closedCount:number
}

class Dashboard extends React.Component<IDashboardProps, IUserDashboardState> {
  constructor(props: IDashboardProps) {
    super(props);
    this.state = {
      cardClicked: this.props.cardClicked,
      showAddRequest: false,
      showModal: this.props.openForm,
      requestData: [],
      activeTab:TicketStatus.All_Tickets,
      tickets:[],
      filteredTicket:[],
      inProgressCount:0,
      resolvedCount:0,
      closedCount:0
    };
  }

  handleAddRequestClick = () => {
    this.setState({ showAddRequest: true, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false, showAddRequest: false, cardClicked: '' },()=>{
      this.getTickets();
    });
  };

  handleAddRequestSubmit = (ITicket: ITicket) => {
    this.setState((prevState) => ({
      requestData: [...prevState.requestData, ITicket],
      showModal: false,
      showAddRequest: false,
    }));
  };

  getTicketData=()=>{
    var Tickets=GetAllTicket()
    this.setState({
      requestData:Tickets
    })
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
            filterTickets=tickets.filter((ticket)=>((ticket.Status==this.state.activeTab || ticket.Status==TicketStatus.Open) && ticket.EmpEmail==this.props.account?.username))
        }
        else{
            filterTickets=tickets.filter((ticket)=>(ticket.Status==this.state.activeTab) && (ticket.EmpEmail==this.props.account?.username))
        }
    }
    
    inProgressCount=tickets.filter((ticket)=>ticket.Status==TicketStatus.In_Progress || ticket.Status==TicketStatus.Open).length;
    resolvedCount=tickets.filter((ticket)=>ticket.Status==TicketStatus.Resolved).length;
    console.log(tickets.filter((ticket)=>ticket.Status==TicketStatus.Resolved))
    closedCount=tickets.filter((ticket)=>ticket.Status==TicketStatus.Closed).length
    this.setState({
        filteredTicket:filterTickets? filterTickets : tickets.filter((ticket)=>ticket.EmpEmail==this.props.account?.username),
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

  renderContent() {
    const { cardClicked, showAddRequest, showModal } = this.state;
    
    if (showAddRequest) {
      return (
        <AddRequest
          show={showModal}
          onHide={this.closeModal}
          getTicketData={this.getTicketData}
          account={this.props.account}
        />
      );
    }

    switch (cardClicked) {
      case 'IT Support':
        return (
          <AddRequest
            show={showModal}
            onHide={this.closeModal}
            getTicketData={this.getTicketData}
            account={this.props.account}
          />
        );
      case 'Facilities':
        return (
          <RequestDevice
            show={showModal}
            onHide={this.closeModal}
          />
        );
      default:
        return null;
    }
  }

  reloadData=()=>{
    this.getTickets()
  }

  render() {
    const { requestData } = this.state;
    const {activeTab,filteredTicket,inProgressCount,closedCount,resolvedCount}=this.state

    return (
      
      <div className='mx-3'>
        <div className='d-flex my-4 justify-content-end'>
          <button className="button" onClick={this.handleAddRequestClick}>
            Add Request
            <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
              <path
                clipRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className='p-4 admin-page border'>
          <div className='ps-4 fs-3'>Tickets Overview</div>
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
                {filteredTicket.slice().reverse().map((ticket,index)=>(
                  <TicketCard RequestedFrom='Dashboard' ticketData={ticket} reloadData={this.reloadData}/>
                ))}
              </div>
          </div>
        </div>
        {this.state.showModal && this.renderContent()}
      </div>
    );
  }
}

export default Dashboard;
