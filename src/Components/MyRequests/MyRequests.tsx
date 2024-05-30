import * as React from 'react';
import { IFormState } from '../../Interfaces/IForm';

interface IMyRequestsState {
    requestData: IFormState[];
}

class MyRequests extends React.Component<{}, IMyRequestsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            requestData: []
        };
    }

    render() {
        const { requestData } = this.state;
        
        return (
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
                                <td>{request.incidentId}</td>
                                <td>{request.employeeId}</td>
                                <td>{request.name}</td>
                                <td>{request.requestType}</td>
                                <td>{request.asset}</td>
                                <td>{request.details}</td>
                                <td>{request.priority}</td>
                                <td>{request.subject}</td>
                                <td>{request.description}</td>
                                <td>{request.status}</td>
                            </tr>
                        ))}

                            <tr>
                                <td>INC1234567890</td>
                                <td>P-1000</td>
                                <td>Pradeep</td>
                                <td>Hardware</td>
                                <td>Laptop</td>
                                <td>Thinkpad T480</td>
                                <td>High</td>
                                <td>Need a new laptop</td>
                                <td>Need a new laptop</td>
                                <td>Pending</td>
                            </tr>
                            <tr>
                                <td>INC1234567890</td>
                                <td>P-1000</td>
                                <td>Pradeep</td>
                                <td>Hardware</td>
                                <td>Laptop</td>
                                <td>Thinkpad T480</td>
                                <td>High</td>
                                <td>Need a new laptop</td>
                                <td>Need a new laptop</td>
                                <td>Pending</td>
                            </tr>
                            <tr>
                                <td>INC1234567890</td>
                                <td>P-1000</td>
                                <td>Pradeep</td>
                                <td>Hardware</td>
                                <td>Laptop</td>
                                <td>Thinkpad T480</td>
                                <td>High</td>
                                <td>Need a new laptop</td>
                                <td>Need a new laptop</td>
                                <td>Pending</td>
                            </tr>
                            <tr>
                                <td>INC1234567890</td>
                                <td>P-1000</td>
                                <td>Pradeep</td>
                                <td>Hardware</td>
                                <td>Laptop</td>
                                <td>Thinkpad T480</td>
                                <td>High</td>
                                <td>Need a new laptop</td>
                                <td>Need a new laptop</td>
                                <td>Pending</td>
                            </tr>   
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MyRequests;
