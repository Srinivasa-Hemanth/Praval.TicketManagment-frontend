import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import it_support from '../../Assets/Images/gear-fill.svg';
import facilities_logo from '../../Assets/Images/laptop.svg';
import resource_logo from '../../Assets/Images/people-fill.svg';
import finance_logo from '../../Assets/SVG/bank.svg';
import { Link } from 'react-router-dom';
import './Home.css';
import scam_img from '../../Assets/Images/Media.jpg';

interface IHomeProps {}

interface IHomeState {
  selectedImage: string;
  selectedText: string;
  selectedHead: string;
}

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      selectedImage: '',
      selectedText: '',
      selectedHead:'',
    };
  }

  handleCardClick = (text: string,head:string) => {
    this.setState({selectedText: text, selectedHead:head });
  };

  renderCard(icon: string, title: string, description: string, path: string) {
    return (
      <Link to={path} className='text-decoration-none text-dark'>
        <div className='card-item'>
          <div className='icon'>
            <img src={icon} width={50} alt={title} />
          </div>
          <div className='content'>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    const { selectedText, selectedHead } = this.state;

    return (
      <div className='home-content d-flex flex-column'>
        <div className='slider'>
          <div className="slider-left ms-4">
            {selectedText ? (
              <>
                <div>
                  <div className='d-flex justify-content-center slider-text mb-4'><h1>{selectedHead}</h1></div>
                  <div className="slider-text fs-3">{selectedText}</div>
                </div>
              </>
            ) : (
              <div className='Todays-update fs-1'>News of the Day</div>
            )}
          </div>
          <div className="container">
            <div
              className="glass text-primary"
              onClick={() => this.handleCardClick("Please ensure that you connect to the VPN (Sophos) daily to maintain a secure connection with the organization.","Attention")}
            >
              <p className="glass-text">Please Do Connect VPN Daily</p>
            </div>
            <div
              className="glass text-primary"
              onClick={() => this.handleCardClick("Two new help desks will be added soon: HR Resources and Finance Desk.","What's New")}
            >
              <p className="glass-text">New Fields are added soon</p>
            </div>
            <div
              className="glass"
              data-text="Beware"
              onClick={() => this.handleCardClick(`Please be aware that scam-related messages are being sent to employees. Remain vigilant and report any suspicious communications immediately.`,"Be Aware")}
            >
              <img src={scam_img} alt="Beware" className="glass-image" />
            </div>
          </div>
        </div>
        <div className='card-grid mt-5'>
          {this.renderCard(it_support, "IT Support", "Request support from our IT team", "ITsupport")}
          {this.renderCard(facilities_logo, "Facilities", "Make a request for a device or supplies", "Facilities")}
          {this.renderCard(resource_logo, "HR Support", "Open a ticket with Human Resources", "")}
          {this.renderCard(finance_logo, "Finance", "Open a ticket with Finance Support", "")}
        </div>
      </div>
    );
  }
}

export default Home;
