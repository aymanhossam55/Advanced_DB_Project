import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            {/* Logo Section */}
            <div className="sidebar-logo">
                <img src="your-logo.png" alt="Logo" className="logo" />
                <h2>Restaurant</h2>
            </div>

            {/* Navigation Menu */}
            <ul className="sidebar-menu">
                <li>
                    <Link to="/customer">
                        <span className="icon">👤</span>
                        Customer
                    </Link>
                </li>
                <li>
                    <Link to="/staff">
                        <span className="icon">🧑‍💼</span>
                        Staff
                    </Link>
                </li>
                <li>
                    <Link to="/food">
                        <span className="icon">🍔</span>
                        Food
                    </Link>
                </li>
                <li>
                    <Link to="/store">
                        <span className="icon">🏪</span>
                        Store
                    </Link>
                </li>
                <li>
                    <Link to="/order">
                        <span className="icon">📦</span>
                        Order
                    </Link>
                </li>
                {/* <li>
                    <Link to="/orderfood">
                        <span className="icon">🛒</span>
                        OrderFood
                    </Link>
                </li> */}
            </ul>
        </div>
    );
};

export default Sidebar;
