import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Button, Card, Container, Form } from "react-bootstrap"
import { useRedirectToLogin } from "@lib/session"
import { getCommentById, updateComment } from "@lib/api"

const defaultModel = {
    id: "",
    userId: 0,
    recipeId: 0,
    title: "",
    text: ""
}

function validateModel(comment) {
    const errors = {
        id: "",
        userId: 0,
        recipeId: 0,
        title: "",
        text: ""
    }

    let isValid = true

    if (!comment.title) {
        errors.title = "You need to enter a title for this comment"
        isValid = false
    }

    if (!comment.text) {
        errors.text = "You need to enter a text for this comment"
        isValid = false
    }

    return { errors, isValid }
}

export default function CommentEditPage({ session }) {
    useRedirectToLogin(session)
    const router = useRouter()
    const { id } = router.query
    const [comment, setComment] = useState(defaultModel)
    const [errors, setErrors] = useState(defaultModel)

    useEffect(() => {
        if (!id) return
        const loadCommentById = async () => {
            const response = await getCommentById(id)
            setComment(response)
        }
        loadCommentById()
    }, [id])

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        setComment({
            ...comment,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = validateModel(comment)

        
        if (!result.isValid) {
            setErrors(result.errors)
            return
        }

        await updateComment(comment)
        router.push(`/recipes/${comment.recipeId}`)
    }


    if (session.user && comment.userId != session.user.id && comment.userId != 0) {
        return (
            <center>
                <h1>Access denied ;)</h1>
            </center>
        )
    } else {
        return (
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="mt-5">Title</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="title" placeholder="Enter title" value={comment.title} />
                        {errors.title && errors.title}
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className="mt-3">Text</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="text" placeholder="Enter text" value={comment.text} />
                        {errors.text && errors.text}
                    </Form.Group>
                    <Button className="mt-3" variant="primary" type="create" name="submit">
                        ✔
                    </Button>
                </Form>
            </Container>
        )
    }
}