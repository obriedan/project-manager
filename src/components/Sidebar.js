import { NavLink } from 'react-router-dom';

// styles & icons
import './Sidebar.css';
import AddIcon from '../assets/add_icon.svg';
import DashboardIcon from '../assets/dashboard_icon.svg';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
          {/* Avatar and username here later */}
          <p>Hey user</p>
        </div>
        <nav class='links'>
          <ul>
            <li>
              <NavLink to='/'>
                <img src={DashboardIcon} alt='Dashboard Icon' />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/create'>
                <img src={AddIcon} alt='Add Project Icon' />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}