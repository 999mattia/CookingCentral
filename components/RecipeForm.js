import { Container, Form, Button } from "react-bootstrap"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { createRecipe, updateRecipe } from "@lib/api"
import { useRef } from "react"
import { useRedirectToLogin } from "@lib/session"

const defaultModel = {
    name: "",
    imgURL: "",
    ingredients: "",
    instructions: "",
    userId: 0
}

function validateModel(recipe) {
    const errors = {
        name: "",
        imgURL: "",
        insctructions: "",
        ingredients: ""
    }

    let isValid = true

    if (!recipe.name) {
        errors.name = "You need to enter a name for this recipe"
        isValid = false
    }

    if (!recipe.ingredients) {
        errors.ingredients = "You need to enter the ingredients for this recipe"
        isValid = false
    }

    if (!recipe.instructions) {
        errors.instructions = "You need to enter instructions for this recipe"
        isValid = false
    }

    return { errors, isValid }
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})

export default function RecipeForm({ recipeToEdit, session }) {
    useRedirectToLogin(session)

    const router = useRouter()
    const [errors, setErrors] = useState(defaultModel)
    const [recipe, setRecipe] = useState(defaultModel)

    const [imagePath, setImagePath] = useState("")
    const [base64Image, setBase64Image] = useState("")

    const fileInput = useRef(null)

    useEffect(() => {
        if (recipeToEdit) {
            setRecipe(recipeToEdit)
        }
    }, [recipeToEdit])

    useEffect(() => {
        if (!base64Image) return

        const uploadImage = async () => {
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    base64Image
                })
            })

            const data = await response.json()
            setImagePath(data.filePath)
        }

        uploadImage()
    }, [base64Image])

    const onFileInputChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const base64 = await toBase64(file)
        setBase64Image(base64)
    }

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        setRecipe({
            ...recipe,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors(defaultModel)

        const result = validateModel(recipe)

        if (!result.isValid) {
            setErrors(result.errors)
            return
        }

        if (recipe.id) {
            if(imagePath) {
                recipe.imgURL = imagePath
            }

            await updateRecipe(recipe)
            router.push(`/recipes/${recipe.id}`)

        } else {
            recipe.userId = session.user.id
            recipe.imgURL = imagePath
            const newRecipe = await createRecipe(recipe)
            router.push(`/recipes/${newRecipe.id}`)
        }
    }

    if (session.user && recipe.userId != session.user.id && recipe.userId != 0) {
        return (
            <center>
                <h1 className="mt-5">Access denied ;)</h1>
            </center>
        )
    } else {
        return (
            <Container>
                <Form className="mt-5" onSubmit={handleSubmit}>

                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="name" placeholder="Enter name" defaultValue={recipe.name} />
                        {errors.name && errors.name}
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="mt-3">Ingredients</Form.Label>
                        <Form.Control as="textarea" rows={5} onChange={handleChange} type="text" name="ingredients" placeholder="Enter ingredients" defaultValue={recipe.ingredients} />
                        {errors.ingredients && errors.ingredients}
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="mt-3">Instructions</Form.Label>
                        <Form.Control as="textarea" rows={10} onChange={handleChange} type="text" name="instructions" placeholder="Enter instructions" defaultValue={recipe.instructions} />
                        {errors.instructions && errors.instructions}
                    </Form.Group>

                
                    <Form.Group controlId="formFileMultiple">
                        <Form.Label className="mt-3">Image</Form.Label>
                        <Form.Control onChange={onFileInputChange} type="file" name="imgURL" defaultValue={recipe.imgURL} />
                    </Form.Group>
                    
                    <Button className="mt-3" variant="primary" type="submit" name="submit">
                        ✔
                    </Button>
                </Form>
            </Container>
        )
    }
}