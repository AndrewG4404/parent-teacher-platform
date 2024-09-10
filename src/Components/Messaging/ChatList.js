import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { Container, ListGroup, Button, Modal, Form, Alert } from 'react-bootstrap';

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newChatUsername, setNewChatUsername] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axiosInstance.get('/messages/chats', { headers: { 'Cache-Control': 'no-cache' } });
                console.log('Fetched chats:', response.data); // Log the fetched data for debugging
                setChats(response.data);
            } catch (error) {
                setError('Error fetching chats');
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, []);

    const handleStartChat = async () => {
        try {
            const response = await axiosInstance.post('/messages/start-chat', { username: newChatUsername });
            setShowModal(false);
            setNewChatUsername('');
            setError(null);
            setChats([...chats, response.data]);
            navigate(`/chat/${response.data.user._id}`);
        } catch (error) {
            setError('Error starting chat. Please try again.');
            console.error('Error starting chat:', error.response ? error.response.data : error);
        }
    };

    return (
        <Container className="bg-base p-4 mt-5 rounded">
            <h2 className="text-brand">Chats</h2>
            <Button variant="primary" className="btn-brand mb-3" onClick={() => setShowModal(true)}>
                Start New Chat
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
            <ListGroup>
                {chats.length > 0 ? (
                    chats.map(chat => (
                        <ListGroup.Item key={chat.user._id} className="bg-base2 text-brand">
                            <Link to={`/chat/${chat.user._id}`} className="text-brand">
                                <h3>{chat.user.username}</h3>
                                <p>{chat.lastMessage.content}</p>
                                <small>{new Date(chat.lastMessage.timestamp).toLocaleString()}</small>
                            </Link>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item className="bg-base2 text-brand">
                        No chats available.
                    </ListGroup.Item>
                )}
            </ListGroup>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Start New Chat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={newChatUsername}
                                onChange={(e) => setNewChatUsername(e.target.value)}
                                placeholder="Enter recipient's username"
                            />
                        </Form.Group>
                        <Button variant="primary" className="btn-brand mt-3" onClick={handleStartChat}>
                            Start Chat
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ChatList;
