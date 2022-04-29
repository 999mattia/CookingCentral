import { Card } from 'react-bootstrap'
import { useState, useEffect } from "react"
import { getUserById } from "@lib/api"
import { useRedirectToLogin } from "@lib/session"

const defaultModel = {
    id: 0,
    email: ''
}

export default function MessageCard({ session, message }) {
    useRedirectToLogin(session)
    const [user, setUser] = useState(defaultModel)

    useEffect(() => {
        const loadUser = async () => {
            const response = await getUserById(message.userId, session.accessToken)
            setUser(response)
        }
        loadUser()
    }, [message.userId, session.accessToken])

    if (session.user && session.user.id == message.userId) {
        return (
            <center>
                <Card border="primary" className="mt-4">
                    <Card.Body>
                        <Card.Subtitle className="text-muted">By {session.user && session.user.id === user.id ? "You" : user.email} at {message.createdAt}</Card.Subtitle>
                        <Card.Text>
                            {message.text}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </center>
        )
    } else {
        return (
            <center>
                <Card className="mt-4">
                    <Card.Body>
                        <Card.Subtitle className="text-muted">By {session.user && session.user.id === user.id ? "You" : user.email} at {message.createdAt}</Card.Subtitle>
                        <Card.Text>
                            {message.text}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </center>
        )
    }




}