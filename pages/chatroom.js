import MessageCard from "@components/MessageCard"
import { getAllMessages, createMessage } from "@lib/api"
import { useState, useEffect, useRef } from "react"
import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import moment from "moment";

const defaultModel = {
    id: 0,
    text: "",
    userId: 0
}

function validateModel(message) {
    const errors = {
        id: 0,
        text: "",
        userId: 0
    }

    let isValid = true

    if (!message.text) {
        errors.text = "You need to enter a message"
        isValid = false
    }

    return { errors, isValid }
}

export default function ChatPage({ session }) {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState(defaultModel)
    const [errors, setErrors] = useState(defaultModel)
    const messagesEndRef = useRef()

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    async function loadMessages() {
        const response = await getAllMessages()
        setMessages(response)
    }

    useEffect(() => {
        loadMessages()
    }, [])

    useEffect(() => {
        setInterval(() => {
            loadMessages()
        }, 750);
    }, []);

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors(defaultModel)

        const result = validateModel(message)


        if (!result.isValid) {
            setErrors(result.errors)
            return
        }

        message.userId = session.user.id

        message.createdAt = moment().format("DD-MM hh:mm")

        const x = await createMessage(message)

        setMessage(defaultModel)

        await loadMessages()
    }

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        setMessage({
            ...message,
            [name]: value
        })
    }

    return (
        <center>
            {
                messages.map(message => {
                    return (
                        <MessageCard key={message.id} message={message} session={session} />
                    )
                })
            }
            <Form id="form" className="mt-5">
                <Form.Group controlId="formBasicMessage">
                    <Form.Control onChange={handleChange} type="text" name="text" placeholder="Enter message" value={message.text} />
                    {errors.text && errors.text}
                </Form.Group>
                <Button className="mt-3 mb-3" variant="primary" name="send" onClick={handleSubmit}>
                    💬
                </Button>
            </Form>
            <div ref={messagesEndRef}></div>
        </center>
    )
}