import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import './Form.css';
import { CreateNewTicket } from '../../Services/TicketService';
import { ITicket } from '../../Interfaces/ITickets';
import { generateUniqueId } from '../../Services/Helper';
import { generateUserEmailContent, sendMail } from '../../Services/EmailService';
import { GetManagerEmail } from '../../Services/UserService';

interface AddRequestProps {
    show: boolean;
    onHide: () => void;
    getTicketData: () => void;
    account:any; 
}

class AddRequest extends React.Component<AddRequestProps, ITicket> {
    constructor(props: AddRequestProps) {
        super(props);
        this.state = {
            RequestType: '',
            Asset: '',
            Priority: '',
            EmpId:'',
            EmpName:'',
            Subject: '',
            Description: '',
            Status: 'Open',
            CreatedBy: 'User',
            CreatedOn: '',
            ModifiedBy: 'User',
            ModifiedOn: '',
            ReporingManger: '',
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState(
            {
                ...this.state,
                [name]:value
            }
        )
    };

    sendMails=(ticket:ITicket)=>{
        debugger
        var managerEmail=GetManagerEmail(this.props.account?.username);
        const recipients = [
            { name: '', email: this.props.account?.Preffered_UserName},
            { name: '', email: managerEmail },
        ];
        sendMail(recipients,ticket.TicketId as string, generateUserEmailContent(this.props.account?.Preffered_UserName,ticket?.TicketId as string,ticket?.Description,ticket?.CreatedOn))
    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const currentDateTime = new Date().toLocaleDateString();
        const newTicket: ITicket = {
            TicketId:'INC'+generateUniqueId(),
            Title: this.state.Subject,
            RequestType: this.state.RequestType,
            Description: this.state.Description,
            Status: this.state.Status,
            Priority: this.state.Priority,
            CreatedBy: this.state.CreatedBy,
            CreatedOn: currentDateTime,
            ModifiedBy: this.state.ModifiedBy,
            ModifiedOn: currentDateTime,
            ReporingManger: this.state.ReporingManger,
            IsTicketClosed: false,
            Asset: this.state.Asset,
            Subject: this.state.Subject,
            EmpId:'',
            EmpName:'',
        };
        CreateNewTicket(newTicket);
        this.resetForm();
        this.props.getTicketData();
        this.sendMails(newTicket)
        this.props.onHide()
    };

    resetForm = () => {
        this.setState({
            RequestType: '',
            Asset: '',
            Priority: '',
            Subject: '',
            Description: '',
            Status: 'Open',
            CreatedBy: 'User',
            CreatedOn: '',
            ModifiedBy: 'User',
            ModifiedOn: '',
            ReporingManger: '',
        });
    };

    render() {
        const { RequestType, Asset, ReporingManger, Priority, Subject, Description } = this.state;
        const { show, onHide } = this.props;

        return (
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                contentClassName="modal-width"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='d-flex flex-column gap-3 mt-3' onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="requestType">Request Type :</label>
                                <select 
                                    className="form-control rounded-lg mt-2" 
                                    name="RequestType"
                                    value={RequestType}
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Task</option>
                                    <option value="Software">Software</option>
                                    <option value="Hardware">Hardware</option>
                                </select>
                            </div>

                            <div className="form-group col-6">
                                <label htmlFor="assets">Assets :</label>
                                <select 
                                    className="form-control rounded-lg mt-2"
                                    name="Asset"
                                    value={Asset}
                                    onChange={this.handleChange}
                                    disabled={RequestType !== 'Hardware'}
                                    required
                                >
                                    <option value="" disabled>Select Asset</option>
                                    <option value="Laptop">Laptop</option>
                                    <option value="Keyboard">Keyboard</option>
                                    <option value="Mouse">Mouse</option>
                                    <option value="Charger">Charger</option>
                                    <option value="Headphones">Headphones</option>
                                    <option value="RAM">RAM</option>
                                    <option value="Others...">Others...</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="manager">Manager :</label>
                                <select 
                                    className="form-control rounded-lg mt-2"
                                    name="ReporingManger"
                                    value={ReporingManger}
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Manager</option>
                                    <option value="Manager 1">Manager 1</option>
                                    <option value="Manager 2">Manager 2</option>
                                    <option value="Manager 3">Manager 3</option>
                                </select>
                            </div>

                            <div className="form-group col-6">
                                <label htmlFor="priority">Priority :</label>
                                <select 
                                    className="form-control rounded-lg mt-2"
                                    name="Priority"
                                    value={Priority}
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Priority</option>
                                    <option value="High">1-High</option>
                                    <option value="Medium">2-Medium</option>
                                    <option value="Low">3-Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-12 mb-2">
                                <label htmlFor="subject">Subject :</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="subject" 
                                    name="Subject" 
                                    value={Subject} 
                                    onChange={this.handleChange} 
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-12 mb-2">
                                <label htmlFor="description">Description :</label>
                                <textarea 
                                    className="form-control" 
                                    id="description" 
                                    name="Description" 
                                    value={Description} 
                                    onChange={this.handleChange} 
                                    maxLength={255}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                            <button 
                                className="btn btn-large btn-secondary rounded-0 me-3" 
                                type="button" 
                                onClick={this.resetForm}
                            >
                                Reset
                            </button>
                            <button 
                                className="btn btn-large btn-primary rounded-0" 
                                type="submit"
                            >
                                Add Request
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddRequest;

