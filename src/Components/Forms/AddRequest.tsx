import * as React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import './Form.css';
import { CreateNewTicket } from '../../Services/TicketService'; 
import { ITicket } from '../../Interfaces/ITickets'; 
import {generateUniqueId} from '../../Services/Helper';
 
interface AddRequestProps {
    show: boolean;
    onHide: () => void;
}

class AddRequest extends React.Component<AddRequestProps, ITicket> {
    constructor(props: AddRequestProps) {
        super(props);
        this.state = {
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
        };
    }

    handleRequestTypeSelect = (eventKey: any) => {
        this.setState({ RequestType: eventKey });
    };

    handleAssetSelect = (eventKey: any) => {
        this.setState({ Asset: eventKey });
    };

    handleManagerSelect = (eventKey: any) => {
        this.setState({ ReporingManger : eventKey });
    };

    handleStatusSelect = (eventKey: any) => {
        this.setState({ Status: eventKey });
    };

    handlePriority = (eventKey: any) => {
        this.setState({ Priority: eventKey });
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<ITicket, keyof ITicket>);
    };

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const currentDateTime = new Date().toString();
        const newTicket: ITicket = {
            TicketId: generateUniqueId(),
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
        };
        CreateNewTicket(newTicket);
        this.resetForm();
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
            ReporingManger : '',
        });
    };

    render() {
        const { RequestType, Asset, ReporingManger, Priority, Subject, Description } = this.state;
        const { show, onHide } = this.props;

        return (
            <Modal
                show={show} onHide={onHide}
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
                                <DropdownButton id="requestType" title={RequestType || "Select Request Type"} className="mt-2" onSelect={this.handleRequestTypeSelect}>
                                    <Dropdown.Item eventKey="Software">Software</Dropdown.Item>
                                    <Dropdown.Item eventKey="Hardware">Hardware</Dropdown.Item>
                                </DropdownButton>
                            </div>

                            <div className="form-group col-6">
                                <label htmlFor="assets">Assets :</label>
                                <DropdownButton id="assets" title={Asset || "Select Asset"} className="mt-2" onSelect={this.handleAssetSelect} disabled={RequestType !== 'Hardware'}>
                                    <Dropdown.Item eventKey="Laptop">Laptop</Dropdown.Item>
                                    <Dropdown.Item eventKey="Keyboard">Keyboard</Dropdown.Item>
                                    <Dropdown.Item eventKey="Mouse">Mouse</Dropdown.Item>
                                    <Dropdown.Item eventKey="Charger">Charger</Dropdown.Item>
                                    <Dropdown.Item eventKey="Headphones">Headphones</Dropdown.Item>
                                    <Dropdown.Item eventKey="RAM">RAM</Dropdown.Item>
                                    <Dropdown.Item eventKey="Others...">Others...</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="manager">Manager :</label>
                                <DropdownButton id="manager" title={ReporingManger || "Select Manager"} className="mt-2" onSelect={this.handleManagerSelect}>
                                    <Dropdown.Item eventKey="Manager 1">Manager 1</Dropdown.Item>
                                    <Dropdown.Item eventKey="Manager 2">Manager 2</Dropdown.Item>
                                    <Dropdown.Item eventKey="Manager 3">Manager 3</Dropdown.Item>
                                </DropdownButton>
                            </div>

                            <div className="form-group col-6">
                                <label htmlFor="impact">Priority :</label>
                                <DropdownButton id="priority" title={Priority || "Select Priority"} className="mt-2" onSelect={this.handlePriority}>
                                    <Dropdown.Item eventKey="1-High">1-High</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-Medium">2-Medium</Dropdown.Item>
                                    <Dropdown.Item eventKey="3-Low">3-Low</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-12 mb-2">
                                <label htmlFor="details">Details :</label>
                                <input type="text" className="form-control" id="details" name="details" maxLength={255} disabled={RequestType !== 'Hardware'} required />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-12 mb-2">
                                <label htmlFor="subject">Subject :</label>
                                <input type="text" className="form-control" id="subject" name="subject" value={Subject} onChange={this.handleInputChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-12 mb-2">
                                <label htmlFor="description">Description :</label>
                                <textarea className="form-control" id="description" name="description" value={Description} onChange={this.handleInputChange} maxLength={255}></textarea>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                            <button className="btn btn-large btn-secondary rounded-0 me-3" type="button" onClick={this.resetForm}>Reset</button>
                            <button className="btn btn-large btn-primary rounded-0" type="submit">Add Request</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddRequest;
