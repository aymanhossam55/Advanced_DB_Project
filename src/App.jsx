import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Customer from './pages/Customer';
import Staff from './pages/Staff';
import Food from './pages/Food';
import Store from './pages/Store';
import Order from './pages/Order';
// import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="content">
                    <Routes>
                        <Route path="/customer" element={<Customer />} />
                        <Route path="/staff" element={<Staff />} />
                        <Route path="/food" element={<Food />} />
                        <Route path="/store" element={<Store />} />
                        <Route path="/order" element={<Order />} />
                        {/* <Route path="/profile-page" element={<ProfilePage />} /> */}
                        {/* <Route path="/orderfood" element={<OrderFood />} /> */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
