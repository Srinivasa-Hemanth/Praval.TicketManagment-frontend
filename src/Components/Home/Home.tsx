import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import it_support from '../../Assets/Images/gear-fill.svg';
import facilities_logo from '../../Assets/Images/laptop.svg';
import resource_logo from '../../Assets/Images/people-fill.svg';
import { Link } from 'react-router-dom';
interface IHomeProps { }

class Home extends React.Component<IHomeProps> {
  renderCard(icon: string, title: string, description: string,path:string) {
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
    return (
      <div className='bg-dark'>
        <div className='space'></div>
        <div className='card-grid'>
          {this.renderCard(it_support, "IT Support", "Request support from our IT team","ITsupport")}
          {this.renderCard(facilities_logo, "Facilities", "Make a request for a device or supplies","Facilities")}
          {this.renderCard(resource_logo, "HR Support", "Open a ticket with Human Resources","")}
          {this.renderCard(resource_logo, "HR Support", "Open a ticket with Human Resources","")}
        </div>
      </div>
    );
  }
}

export default Home;
