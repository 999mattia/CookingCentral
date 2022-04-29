import { Container, Form, Button }from "react-bootstrap"
import {useRouter} from "next/router"
import { useState } from "react"
import { login } from "@lib/api"

const defaultModel = {
    email: "",
    password: ""
}

function validateModel(user) {
    const errors = {
        email: "",
        password: ""
    }

    let isValid = true

    if (!user.email) {
        errors.email = "You need to enter a email"
        isValid = false
    }

    if(!user.password) {
        errors.password = "You need to enter a password"
        isValid = false
    }

    return { errors, isValid }
}

export default function LoginForm({ session }) {
    const router = useRouter()
    const [user, setUser] = useState(defaultModel)
    const [errors, setErrors] = useState(defaultModel)

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors(defaultModel)

        const result = validateModel(user)

        if (!result.isValid) {
            setErrors(result.errors)
            return
        }

        const response = await login(user)

        session.login(response)

        router.push("/")
    }

    const handleClick = () => {
        router.push("/register")
    }

    return (
        <Container>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label className="mt-5">Email</Form.Label>
                <Form.Control onChange={handleChange} type="text" name="email" placeholder="Enter email" value={user.email} />
                {errors.email && errors.email}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label className="mt-3">Password</Form.Label>
                <Form.Control onChange={handleChange} type="password" name="password" placeholder="Enter password" value={user.password} />
                {errors.password && errors.password}
            </Form.Group>
            <Button className="mt-3" variant="primary" type="create" name="submit">
                Log in
            </Button>
            </Form>
            <h3 className="mt-5">No account? Create one!</h3>
            <Button className="mt-3"variant="primary" onClick={handleClick}>Register</Button>
    </Container>
    )
}