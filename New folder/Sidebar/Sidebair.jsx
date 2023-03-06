import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
// import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <ul>
        <li>
          <Link to="/admin_3xyftvk/sales">Input Sales</Link>
        </li>
        <li>
          <Link to="/page2">Ticket</Link>
        </li>
        <li>
          <Link to="/page3">Game Equip</Link>
        </li>
        <li>
          <Link to="/page4">Game Stat</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
