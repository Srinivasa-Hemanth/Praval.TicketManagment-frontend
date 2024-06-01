import * as React from 'react';
import { Modal } from 'react-bootstrap';
import AddRequest from '../Forms/AddRequest';
import { IFormState } from '../../Interfaces/IForm';
import RequestDevice from '../Forms/RequestDevice';
import { ITicket } from '../../Interfaces/ITickets';
import pic from '../../Assets/SVG/undraw_landscape_photographer_blv1.svg';

interface IDashboardProps {
  cardClicked: string;
  openForm: boolean;
}

interface IUserDashboardState {
  cardClicked: string;
  showAddRequest: boolean;
  showModal: boolean;
  requestData: ITicket[];
}

class Dashboard extends React.Component<IDashboardProps, IUserDashboardState> {
  constructor(props: IDashboardProps) {
    super(props);
    this.state = {
      cardClicked: this.props.cardClicked,
      showAddRequest: false,
      showModal: this.props.openForm,
      requestData: []
    };
  }

  handleAddRequestClick = () => {
    this.setState({ showAddRequest: true, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false, showAddRequest: false, cardClicked: '' });
  };

  handleAddRequestSubmit = (ITicket: ITicket) => {
    this.setState((prevState) => ({
      requestData: [...prevState.requestData, ITicket],
      showModal: false,
      showAddRequest: false,
    }));
  };

  renderContent() {
    const { cardClicked, showAddRequest, showModal } = this.state;

    if (showAddRequest) {
      return (
        <AddRequest
          show={showModal}
          onHide={this.closeModal}
        />
      );
    }

    switch (cardClicked) {
      case 'IT Support':
        return (
          <AddRequest
            show={showModal}
            onHide={this.closeModal}
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

  render() {
    const { requestData } = this.state;

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
        <div className='table'>
          <table className='table table-striped table-responsive'>
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Created ON</th>
                <th>Request Type</th>
                <th>Asset</th>
                <th>Details</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Modified ON</th>
                <th>Comments</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {requestData.map((request, index) => (
                <tr key={index}>
                  <td>{request.TicketId}</td>
                  <td>{request.CreatedOn}</td>
                  <td>{request.RequestType}</td>
                  <td>{request.Title}</td>
                  <td>{request.details}</td>
                  <td>{request.Description}</td>
                  <td>{request.Priority}</td>
                  <td>{request.Status}</td>
                  <td>{request.ModifiedOn}</td> 
                  <td>{request.comments}</td>
                  <td>
                    <button className='btn btn-success' disabled={request.Status !== 'Resolved'}>
                      {request.Status === 'Resolved' ? 'Enabled' : 'Resolved'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {requestData.length === 0 && (
          <div className='d-flex mt-5'>
            <div className='w-50'></div>
            <div className='d-flex justify-content-end'>
              <img src={pic} className='w-50' alt="no-data" />
            </div>
          </div>
        )}
        {this.state.showModal && this.renderContent()}
      </div>
    );
  }
}

export default Dashboard;
