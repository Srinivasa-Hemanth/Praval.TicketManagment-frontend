import * as React from 'react';
import { IFormState } from '../../Interfaces/IForm';

interface IApprovalState {
    requestData: IFormState[];
}

class Approval extends React.Component<{}, IApprovalState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            requestData: []
        };
    }

    render() {
        const { requestData } = this.state;
        
        return (
            <div className='table mt-4 mx-3'>
                <table className='table table-striped'>
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
                            <th>Status</th>
                            <th>Action</th>
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
                                <td>{request.status}</td>
                                <td>{request.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Approval;
