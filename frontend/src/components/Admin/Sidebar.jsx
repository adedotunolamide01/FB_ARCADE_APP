import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <ul>
        <li>
          <Link to="/admin_3xyftvk/sales">Sales</Link>
        </li>
        <li>
          <Link to="/page2">Page 2</Link>
        </li>
        <li>
          <Link to="/page3">Page 3</Link>
        </li>
        <li>
          <Link to="/page4">Page 4</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
