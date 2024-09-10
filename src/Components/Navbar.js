import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const NavigationBar = () => {
    const { user, logout } = useAuth();

    return (
        <Navbar bg="dark" expand="lg" className="navbar">
            <Navbar.Brand><span>Parent-Teacher Platform</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {user && (
                        <>
                            <Nav.Link as={Link} to="/messages" className="nav-link">Messages</Nav.Link>
                            <Nav.Link as={Link} to="/assignments" className="nav-link">Assignments</Nav.Link>
                            {user.role === 'Teacher' && (
                                <>
                                    <Nav.Link as={Link} to="/add-assignment" className="nav-link">Add Assignment</Nav.Link>
                                    <Nav.Link as={Link} to="/add-grade" className="nav-link">Add Grade</Nav.Link>
                                    <Nav.Link as={Link} to="/add-event" className="nav-link">Add Event</Nav.Link>
                                </>
                            )}
                            <Nav.Link as={Link} to="/grades" className="nav-link">Grades</Nav.Link>
                            <Nav.Link as={Link} to="/events" className="nav-link">Events</Nav.Link>
                        </>
                    )}
                    {!user && (
                        <>
                            <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
                        </>
                    )}
                </Nav>
                {user && (
                    <Nav className="ml-auto">
                        <Nav.Link onClick={logout} className="nav-link">Logout</Nav.Link>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
