import React, { Component } from 'react';
import './TicketCard.css';
import { ITicket } from '../../Interfaces/ITickets';
import { Priority } from '../../Common/Enum';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { UpdateTicket } from '../../Services/TicketService';
import { toast } from 'react-toastify';

interface ITicketCardProps {
    ticketData?: ITicket;
    RequestedFrom : string;
    reloadData: () => void;
}

interface ITicketCardState {
    isModalOpen: boolean;
    comments: string;
}

export default class TicketCard extends Component<ITicketCardProps, ITicketCardState> {
    constructor(props: ITicketCardProps) {
        super(props);

        this.state = {
            isModalOpen: false,
            comments: this.props.ticketData?.comments || ''
        };
    }

    getTicketClassName = (priority: any) => {
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

    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const comments = event.target.value;
        this.setState({ comments });

        const updatedTicket = {
            ...this.props.ticketData,   
            comments
        };

        UpdateTicket(updatedTicket as ITicket);
    };

    handleApprove = () => {
        if (this.props.ticketData) {
            const updatedTicket = {
                ...this.props.ticketData,
                Status: 'In Progress'
            };
            UpdateTicket(updatedTicket as ITicket);
            this.setState({ isModalOpen: false });
        }
        toast.success("Request Approved")
        this.props.reloadData();
    };

    handleClose = () => {
        if (this.props.ticketData) {
            const updatedTicket = {
                ...this.props.ticketData,
                Status: 'Closed'
            };
            UpdateTicket(updatedTicket as ITicket);
            this.setState({ isModalOpen: false });
        }
        toast.success("Ticked Closed")
        this.props.reloadData();
    };

    handleReject = () => {
        if (this.props.ticketData) {
            const updatedTicket = {
                ...this.props.ticketData,
                Status: 'Rejected'
            };
            UpdateTicket(updatedTicket as ITicket);
            this.setState({ isModalOpen: false });
        }
        toast.error("Request Rejected")
        this.props.reloadData();
    };

    render() {
        const { ticketData } = this.props;
        const { isModalOpen, comments } = this.state;
        return (
            <div className='p-4 border'>
                <div className='d-flex justify-content-between'>
                    <div className='title d-flex gap-3 '>
                        <div className={`ticket-status rounded rounded-5 ${this.getTicketClassName(ticketData?.Priority)}`}>
                        </div>
                        <div className='ticket-id'>
                            {ticketData?.TicketId}
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        Ticket {ticketData?.Status}
                    </div>  
                </div>
                <div className='align-items-center d-flex gap-3 subject-container d-flex'>
                    <div className='subject'>
                        {ticketData?.Subject}
                    </div>
                    <div className={`p-1 priority px-3 rounded-5 text-white ${this.getTicketClassName(ticketData?.Priority)}`}>
                        {ticketData?.Priority}
                    </div>
                </div>
                <div className='description'>
                    {ticketData?.Description}
                </div>
               
                <hr className=''></hr>
                <div className='d-flex justify-content-end gap-3'>
                    <div  className='d-flex justify-content-end  text-primary discussions'>Discussions</div>
                    <div className='d-flex justify-content-end text-primary open-ticket' onClick={this.openModal}>
                        Open Ticket
                    </div>
                </div>

                <Modal
                    show={isModalOpen}
                    onHide={this.closeModal}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{ticketData?.TicketId}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="ticket-details">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Employee ID:</strong> {ticketData?.EmpId}</p>
                                    <p><strong>Asset:</strong> {ticketData?.Asset}</p>
                                    <p><strong>Status:</strong> {ticketData?.Status}</p>      
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Employee Name:</strong> {ticketData?.EmpName}</p>
                                    <p><strong>Priority:</strong> {ticketData?.Priority}</p>
                                    <p><strong>Assigned To:</strong> {ticketData?.AssignedTo}</p> 
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12 mb-2">
                                    <label htmlFor="comments"><strong>Description:</strong></label>
                                    <textarea 
                                        className="form-control" 
                                        value={ticketData?.Description}
                                        disabled
                                    ></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12 mb-2">
                                    <label htmlFor="comments"><strong>Comments:</strong></label>
                                    <textarea 
                                        className="form-control" 
                                        id="comments" 
                                        name="comments" 
                                        value={comments} 
                                        onChange={this.handleChange} 
                                        maxLength={255}
                                        disabled={this.props.RequestedFrom !== 'Approvals'}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    {this.props.RequestedFrom.toLocaleLowerCase() === "approvals" &&  (this.props.ticketData?.Status==="Active") && (
                    <Modal.Footer>
                        <Button className='btn' variant="danger" onClick={this.handleReject}>
                        Reject
                        </Button>
                        <Button className='btn' variant="success" onClick={this.handleApprove}>
                        Approve
                        </Button>
                    </Modal.Footer>
                    )}

                    {(this.props.RequestedFrom.toLocaleLowerCase() === "dashboard" && (this.props.ticketData?.Status!="Closed")) && (
                    <Modal.Footer>
                        <Button className='btn' variant="success" onClick={this.handleClose}>
                            Close Ticket
                        </Button>
                    </Modal.Footer>
                    )}

                </Modal>
            </div>
        );
    }
}
