import * as React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import { IFormState } from '../../Interfaces/IForm';

interface RequestDeviceProps {
    show: boolean;
    onHide: () => void;
}

class RequestDevice extends React.Component<RequestDeviceProps, IFormState> {
    constructor(props: RequestDeviceProps) {
        super(props);
        this.state = {
            requestType: 'Facilities',
            asset: '',
            details: '',
            priority: '',
            subject: '',
            description: '',
            status: ''
        };
    }

    handleAssetSelect = (eventKey: any) => {
        this.setState({ asset: eventKey });
    };

    handleManagerSelect = (eventKey: any) => {
        this.setState({ details: eventKey });
    };

    handleStatusSelect = (eventKey: any) => {
        this.setState({ status: eventKey });
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<IFormState, keyof IFormState>);
    };

    handlePriority = (eventKey: any) => {
        this.setState({ priority: eventKey });
    };

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.resetForm();
    };

    resetForm = () => {
        this.setState({
            requestType: 'Facilities',
            asset: '',
            details: '',
            priority: '',
            subject: '',
            description: '',
            status: ''
        });
    };

    render() {
        const { asset, details, priority, subject, description } = this.state;
        const { show, onHide } = this.props;

        return (
            <Modal 
                show={show} onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered  
                >
                <Modal.Header closeButton>
                    <Modal.Title>Request Device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='d-flex flex-column gap-3 mt-3' onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="form-group col-4">
                                <label htmlFor="assets">Assets :</label>
                                <DropdownButton id="assets" title={asset || "Select Asset"} className="mt-2" onSelect={this.handleAssetSelect}>
                                    <Dropdown.Item eventKey="Laptop">Laptop</Dropdown.Item>
                                    <Dropdown.Item eventKey="Keyboard">Keyboard</Dropdown.Item>
                                    <Dropdown.Item eventKey="Mouse">Mouse</Dropdown.Item>
                                    <Dropdown.Item eventKey="Charger">Charger</Dropdown.Item>
                                    <Dropdown.Item eventKey="Headphones">Headphones</Dropdown.Item>
                                    <Dropdown.Item eventKey="RAM">RAM</Dropdown.Item>
                                    <Dropdown.Item eventKey="Others...">Others...</Dropdown.Item>
                                </DropdownButton>
                            </div>

                            <div className="form-group col-4">
                                <label htmlFor="manager">Manager :</label>
                                <DropdownButton id="manager" title={details || "Select Manager"} className="mt-2" onSelect={this.handleManagerSelect}>
                                    <Dropdown.Item eventKey="Manager 1">Hemanth</Dropdown.Item>
                                    <Dropdown.Item eventKey="Manager 2">Chandhana</Dropdown.Item>
                                    <Dropdown.Item eventKey="Manager 3">Pradeep</Dropdown.Item>
                                </DropdownButton>
                            </div>

                            <div className="form-group col-4">
                                <label htmlFor="impact">Priority :</label>
                                <DropdownButton id="priority" title={priority || "Select Priority"} className="mt-2" onSelect={this.handlePriority}>
                                    <Dropdown.Item eventKey="1-High">1-High</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-Medium">2-Medium</Dropdown.Item>
                                    <Dropdown.Item eventKey="3-Low">3-Low</Dropdown.Item>
                                </DropdownButton>
                            </div>

                        </div>

                        <div className="row">
                            <div className="form-group col-12 mb-2">
                                <label htmlFor="subject">Subject :</label>
                                <input type="text" className="form-control" id="subject" name="subject" value={subject} onChange={this.handleInputChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-12 mb-2">
                                <label htmlFor="description">Description :</label>
                                <textarea className="form-control" id="description" name="description" value={description} onChange={this.handleInputChange} maxLength={255}></textarea>
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

export default RequestDevice;
