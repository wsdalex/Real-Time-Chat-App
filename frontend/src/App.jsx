import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const SOCKET_SERVER_URL = "http://localhost:3000";
function App() {
  const [messages, setMessages] = useState(["Test message"]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    newSocket.on("chat-message", (message) => {
      setMessages([...messages, message]);
    });

    return () => newSocket.disconnect();
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit("chat-message", message);
      setMessage("");
      console.log(messages);
    }
  };

  return (
    <>
      <Container>
        <h1>Will's Chat App</h1>
        <Row className="d-flex justify-content-center">
          <Col className="text-center">
            <h2>Messages:</h2>
            <div>
              {messages.map((msg, index) => {
                return <h3 key={index}>{msg}</h3>;
              })}
            </div>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Form>
            <Form.Label>New Message:</Form.Label>
            <Form.Control
              type="textarea"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></Form.Control>
            <Button onClick={sendMessage}>Send Message</Button>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default App;
