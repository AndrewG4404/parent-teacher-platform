import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatList from './Components/Messaging/ChatList';
import ChatWindow from './Components/Messaging/ChatWindow';
import GradeList from './Components/Grades/GradeList';
import GradeForm from './Components/Grades/GradeForm';
import AssignmentList from './Components/Assignments/AssignmentList';
import AssignmentForm from './Components/Assignments/AssignmentForm';
import EventList from './Components/Events/EventList';
import EventForm from './Components/Events/EventForm';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // Ensure this is included
import './index.css'; // Ensure this is included

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <div id="content-wrapper">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/messages"
                        element={
                            <ProtectedRoute>
                                <ChatList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/chat/:userId"
                        element={
                            <ProtectedRoute>
                                <ChatWindow />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/assignments"
                        element={
                            <ProtectedRoute>
                                <AssignmentList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-assignment"
                        element={
                            <ProtectedRoute role="Teacher">
                                <AssignmentForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/grades"
                        element={
                            <ProtectedRoute>
                                <GradeList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-grade"
                        element={
                            <ProtectedRoute role="Teacher">
                                <GradeForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/events"
                        element={
                            <ProtectedRoute>
                                <EventList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-event"
                        element={
                            <ProtectedRoute role="Teacher">
                                <EventForm />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
