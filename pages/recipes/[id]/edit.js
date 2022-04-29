import { useRedirectToLogin } from "@lib/session"
import { getRecipeById } from "@lib/api"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import RecipeForm from "@components/RecipeForm"

const defaultModel = {
    name: "",
    imgURL: "",
    ingredients: "",
    instructions: "",
    userId: 0
}

export default function EditPage({ session }) {
    useRedirectToLogin(session)
    const router = useRouter()
    const {id} = router.query
    const [recipe, setRecipe] = useState(defaultModel)

    useEffect(() => {
        if (!id) return
        const loadRecipeById = async () => {
            let response = await getRecipeById(id)
            setRecipe(response)
        }
        loadRecipeById()
    }, [id])
    
        return <RecipeForm recipeToEdit={recipe} session={session}/>
    
}