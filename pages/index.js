import { getAllRecipes, getRecipeById } from "@lib/api"
import { useState, useEffect } from "react"
import RecipePreview from "@components/RecipePreview"

const defaultRecipe = {
    name: "",
    imgURL: "",
    instructions: ""
}

export default function IndexPage( { session }) {
    const [randomRecipe, setRandomRecipe] = useState(defaultRecipe)


    useEffect(() => {
        const loadRandomRecipe = async () => {
            let allRecipes = await getAllRecipes()
            let randomId = Math.floor(Math.random() * (allRecipes.length - 1) + 1)
            if (randomId < 1) {
                randomId = 1
            }
            let randomRecipe = await getRecipeById(randomId)
            setRandomRecipe(randomRecipe)
        }
        loadRandomRecipe()
    }, [])

    return (
        <div className="text-center mt-5">
            <h1>Welcome to CookingCentral</h1>
            <h2>Here is a random recipe for you</h2>
            <center>
                <RecipePreview id={randomRecipe.id} name={randomRecipe.name} imgURL={randomRecipe.imgURL} userId={randomRecipe.userId} session={session}/>
            </center>
        </div>
    )
}