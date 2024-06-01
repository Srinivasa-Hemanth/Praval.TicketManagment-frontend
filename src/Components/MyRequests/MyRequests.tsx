import React from 'react';
import { ITicket } from '../../Interfaces/ITickets';

interface IMyRequestsState {
    requestData: ITicket[];
}

class MyRequests extends React.Component<{}, IMyRequestsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            requestData: []
        };
    }

    componentDidMount() {
        this.loadRequestData();
    }

    loadRequestData() {
        const requestData = JSON.parse(localStorage.getItem('Tickets') || '[]') as ITicket[];
        this.setState({ requestData });
    }

    render() {
        const { requestData } = this.state;

        return (
            <div>
                <div>   

                </div>
                <div className='table mx-3'>
                    <table className='table table-striped mt-4'>
                        <thead>
                            <tr>
                                <th>Incident ID</th>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Request Type</th>
                                <th>Asset</th>
                                <th>Details</th>
                                <th>Priority</th>
                                <th>Subject</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestData.map((request, index) => (
                                <tr key={index}>
                                    <td>{request.TicketId}</td>
                                    <td>{request.CreatedBy}</td>
                                    <td>{request.Title}</td>
                                    <td>{request.RequestType}</td>
                                    <td>{request.Asset}</td>
                                    <td>{request.details}</td>
                                    <td>{request.Priority}</td>
                                    <td>{request.Subject}</td>
                                    <td>{request.Description}</td>
                                    <td>{request.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MyRequests;
