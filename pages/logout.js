import {useRouter} from "next/router"
import { Button } from "react-bootstrap";

export default function LogoutPage({ session }) {
    const router = useRouter()

    const handleLogout = () => {
        session.logout()
        router.push("/")
    }

    return (
        <center>
            <h1 className=" mt-5">Log out?</h1>
                <center>
                    <Button variant="danger" className="text-center mt-5" onClick={handleLogout}>Log out</Button>
                </center>
        </center>
    )
}