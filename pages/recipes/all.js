import { getAllRecipes } from "@lib/api"
import { useState, useEffect } from "react"
import RecipePreview from "@components/RecipePreview"
import { Form, Button } from "react-bootstrap"
import { useRouter } from "next/router"

export default function RecipesPage({ session }) {
    const [recipes, setRecipes] = useState([])
    const [recipesToRender, setRecipesToRender] = useState(recipes)
    const [recipesWithMatchingIngredients, setRecipesWithMatchingIngredients] = useState([])
    const [recipesWithMatchingInstructions, setRecipesWithMatchingInstructions] = useState([])
    const [query, setQuery] = useState("")
    const router = useRouter()

    useEffect(() => {
        const loadRecipes = async () => {
            let response = await getAllRecipes()
            setRecipes(response)
        }
        loadRecipes()

    }, [])

    useEffect(() => {
        const filterIt = () => {
            if (query.trim() != "") {
                const filtered = recipes.filter(recipe => (recipe.name.toLowerCase().includes(query.toLowerCase())))
                setRecipesToRender(filtered)
    
                const filteredWithIngredients = recipes.filter(recipe => (recipe.ingredients.toLowerCase().includes(query.toLowerCase())))
                setRecipesWithMatchingIngredients(filteredWithIngredients)
    
                const filteredWithInstructions = recipes.filter(recipe => (recipe.instructions.toLowerCase().includes(query.toLowerCase())))
                setRecipesWithMatchingInstructions(filteredWithInstructions)
            } else {
                setRecipesToRender(recipes)
                setRecipesWithMatchingInstructions([])
                setRecipesWithMatchingIngredients([])
            }
        }
        filterIt()
    }, [recipes, query])

    const handleChange = (e) => {
        const target = e.target
        const value = target.value
        setQuery(value)
    }

    const handleClick = () => {
        router.push('/recipes/create')
    }

    return (
        <div>
            <Form>
                <Form.Control className="mt-5" onChange={handleChange} type="text" name="query" placeholder="What are you looking for?" value={query} />
            </Form>
            {
                recipesToRender.map(recipe => {
                    return (
                        <RecipePreview key={recipe.id} id={recipe.id} name={recipe.name} imgURL={recipe.imgURL} userId={recipe.userId} session={session}/>
                    )
                })
            }

            {query && recipesWithMatchingIngredients.length > 0 && <center><h3>{`Recipes with "${query}" in the ingredients:`}</h3></center>}
            {
                recipesWithMatchingIngredients.map(recipe => {
                    return (
                        <RecipePreview key={recipe.id} id={recipe.id} name={recipe.name} imgURL={recipe.imgURL} userId={recipe.userId} session={session}/>
                    )
                })
            }

            {query && recipesWithMatchingInstructions.length > 0 && <center><h3>{`Recipes with "${query}" in the instructions:`}</h3></center>}
            {
                recipesWithMatchingInstructions.map(recipe => {
                    return (
                        <RecipePreview key={recipe.id} id={recipe.id} name={recipe.name} imgURL={recipe.imgURL} userId={recipe.userId} session={session}/>
                    )
                })
            }

            <center>
                <h3 className="mt-5">A recipe is missing? Post it!</h3>
                <Button className="mt-3 mb-5" onClick={handleClick}>Create new recipe</Button>
            </center>
        </div>
    )
}