import { Card, Button } from 'react-bootstrap'
import { useState, useEffect } from "react"
import { getUserById, deleteComment } from "@lib/api"
import { useRouter } from "next/router"

const defaultModel = {
    id: '0',
    email: ''
}

export default function CommentCard({ session, comment }) {
    const [user, setUser] = useState(defaultModel)
    const router = useRouter()

useEffect(() => {
    const loadUsers = async () => {
        const response = await getUserById(comment.userId, session.accessToken)
        setUser(response)
    }
    loadUsers()
}, [user, comment.userId]);

const handleEdit = () => {
    router.push(`/comments/${comment.id}/edit`)
}

const handleDelete = async () => {
    await deleteComment(comment.id)
}

    if (session.user && session.user.id == comment.userId) {
        return (
            <Card style={{ width: '70%' }} className="mb-5 mt-5" border="primary">
                <Card.Body>
                    <Card.Title>{comment.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By {session.user && user.email && session.user.id === user.id ? "You" : user.email}</Card.Subtitle>
                    <Card.Text>
                        {comment.text}
                    </Card.Text>
                    {session.user && session.user.id === comment.userId && <><Button className="mx-1" variant="primary" onClick={handleEdit}>Edit</Button><Button className="mx-1" variant="danger" onClick={handleDelete}>Delete</Button></>}
                </Card.Body>
            </Card>
        )  
    } else {
        return (
            <Card style={{ width: '70%' }} className="mb-5 mt-5">
                <Card.Body>
                    <Card.Title>{comment.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By {session.user && user.email && session.user.id === user.id ? "You" : user.email}</Card.Subtitle>
                    <Card.Text>
                        {comment.text}
                    </Card.Text>
                    {session.user && session.user.id === comment.userId && <><Button className="mx-1" variant="primary" onClick={handleEdit}>Edit</Button><Button className="mx-1" variant="danger" onClick={handleDelete}>Delete</Button></>}
                </Card.Body>
            </Card>
        ) 
    }

}
