import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { getRecipeById, deleteRecipe, getAllComments, createComment } from "@lib/api"
import { Button, Card, Container, Form } from "react-bootstrap"
import CommentCard from "@components/CommentCard"

const defaultRecipe = {
    name: "",
    name: "",
    imgURL: "",
    instructions: ""
}

const defaultComment = {
    id: 0,
    userId: 0,
    recipeId: 0,
    title: "",
    text: ""
}

function validateModel(comment) {
    const errors = {
        id: 0,
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

export default function RecipePage({ session }) {
    const router = useRouter()
    const { id } = router.query
    const [recipe, setRecipe] = useState(defaultRecipe)
    const [comment, setComment] = useState(defaultComment)
    const [comments, setComments] = useState([])
    const [errors, setErrors] = useState(defaultComment)

    useEffect(() => {
        if (!id) return
        const loadRecipeById = async () => {
            let response = await getRecipeById(id)
            setRecipe(response)
        }
        loadRecipeById()
    }, [id])

    useEffect(() => {
        const loadComments = async () => {
            const response = await getAllComments()
            const filtered = response.filter(comment => comment.recipeId === recipe.id)
            setComments(filtered)
        }
        loadComments()
    }, [recipe.id, comments])

    const handleEdit = async () => {
        router.push(`/recipes/${id}/edit`)
    }

    const handleDelete = async () => {
        await deleteRecipe(id)
        router.push('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors(defaultComment)

        const result = validateModel(comment)


        if (!result.isValid) {
            setErrors(result.errors)
            return
        }

        comment.userId = session.user.id
        comment.recipeId = parseInt(id)
        const x = await createComment(comment)
        setComment(defaultComment)
        const response = await getAllComments
        setComments(comments)
    }

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        setComment({
            ...comment,
            [name]: value
        })
    }

    return (
        <div>
            <center>
                <h1 className="mt-5">{recipe.name}</h1>
                <Card style={{ width: '&0%' }} className="mt-5 mr-5 mb-5">
                    <Card.Img variant="top" src={recipe.imgURL} />
                    <Card.Body>
                        <Card.Subtitle className="mt-3">Ingredients</Card.Subtitle>
                        <Card.Text>
                            {recipe.ingredients}
                        </Card.Text>
                        <Card.Subtitle>Instructions</Card.Subtitle>
                        <Card.Text className="mb-3">
                            {recipe.instructions}
                        </Card.Text>
                        {session.user && recipe.userId === session.user.id && <><Button className="mx-1" variant="primary" onClick={handleEdit}>Edit</Button><Button className="mx-1" variant="danger" onClick={handleDelete}>Delete</Button></>}
                    </Card.Body>
                </Card>
                <h2>Comments</h2>
            </center>
            {session.user &&
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
                        <Button className="mt-3 mb-5" variant="primary" type="create" name="submit">
                            Post comment
                        </Button>
                    </Form>
                </Container>
            }

            {
                comments.map(comment => {
                    return <CommentCard key={comment.id} session={session} comment={comment} />
                })
            }
        </div>
    )
}
