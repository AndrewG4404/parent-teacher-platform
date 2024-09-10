// src/Components/Messaging/Chat.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import io from 'socket.io-client';
import { Container, Form, Button, ListGroup, Alert } from 'react-bootstrap';

const socket = io('http://localhost:5001');

const Chat = () => {
    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axiosInstance.get(`/messages/chat/${userId}`);
                setMessages(response.data);
            } catch (error) {
                setError('Error fetching messages');
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [userId]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        try {
            const response = await axiosInstance.post('/messages/send', { recipient: userId, content: newMessage });
            setMessages([...messages, response.data]);
            setNewMessage('');
            socket.emit('send_message', response.data);
        } catch (error) {
            setError('Error sending message');
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    return (
        <Container className="bg-base p-4 mt-5 rounded">
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="chat-container">
                <div className="chat-messages">
                    <ListGroup>
                        {messages.map((message) => (
                            <ListGroup.Item key={message._id} className={`bg-base2 text-brand chat-message ${message.sender === user._id ? 'sent' : 'received'}`}>
                                {message.content}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
                <Form className="chat-input mt-3" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="btn-brand mt-2">Send</Button>
                </Form>
            </div>
        </Container>
    );
};

export default Chat;
