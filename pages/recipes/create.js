import RecipeForm from "@components/RecipeForm"
import { useRedirectToLogin } from "@lib/session"

export default function CreatePage({ session }) {
    useRedirectToLogin(session)
    return (
        <div>
            <RecipeForm session={session}/>
        </div>
    )
}