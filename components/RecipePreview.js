import { Card, Button } from 'react-bootstrap'
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function RecipePreview({ id, name, imgURL, userId, session }) {
    const router = useRouter()

    useEffect(() => {
    }, [router])

    const handleClick = () => {
        router.push(`/recipes/${id}`)
    }

    if (session.user && session.user.id == userId) {
        return (
            <center>
                <Card border="primary" style={{ width: '70%' }} className="mt-5 mr-5 mb-5">
                    <Card.Img variant="top" src={imgURL} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Button variant="primary" onClick={handleClick}>Read more</Button>
                    </Card.Body>
                </Card>
            </center>
        )
    } else {
        return (
            <center>
                <Card style={{ width: '70%' }} className="mt-5 mr-5 mb-5">
                    <Card.Img variant="top" src={imgURL} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Button variant="primary" onClick={handleClick}>Read more</Button>
                    </Card.Body>
                </Card>
            </center>
        )
    }
}