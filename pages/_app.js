import useSession from "@lib/session"
import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap'

export default function App({ Component, pageProps }) {
    const session = useSession()
    const newPageProps = {
        ...pageProps,
        session
    }
    return (
        <main className="page">
            <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Link href="/" passHref>
                        <Navbar.Brand href="/">CookingCentral</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/recipes/all" passHref>
                                <Nav.Link href="/recipes/all">Recipes</Nav.Link>
                            </Link>
                            <Link href="/recipes/create" passHref>
                                <Nav.Link href="/recipes/create">Create new recipe</Nav.Link>
                            </Link>
                            <Link href="/chatroom" passHref>
                                <Nav.Link href="/chatroom">Chatroom</Nav.Link>
                            </Link>
                            {session.user ? <Link href="/logout" passHref><Nav.Link href="/logout">Logout from {session.user.email}</Nav.Link></Link> : <Link href="/login" passHref><Nav.Link href="/login">Login</Nav.Link></Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Component {...newPageProps} />
            </Container>
        </main>
    )
}