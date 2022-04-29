const URL = "http://localhost:3001"

export async function getAllRecipes() {
    const response = await fetch(`${URL}/recipes`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getRecipeById(id) {
    const response = await fetch(`${URL}/recipes/${id}`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function createRecipe(recipe) {
    const response = await fetch(`${URL}/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function updateRecipe(recipe) {
    const response = await fetch(`${URL}/recipes/${recipe.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function deleteRecipe(id) {
    const response = await fetch(`${URL}/recipes/${id}`, {
    method: 'DELETE',
    headers: {
        
    }})

    if (!response.ok) {
        return Promise.reject(response)
    }
}

export async function getAllComments() {
    const response = await fetch(`${URL}/comments`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getCommentById(id) {
    const response = await fetch(`${URL}/comments/${id}`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function createComment(comment) {
    const response = await fetch(`${URL}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function updateComment(comment) {
    const response = await fetch(`${URL}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function deleteComment(id) {
    const response = await fetch(`${URL}/comments/${id}`, {
    method: 'DELETE',
    headers: {
        
    }})

    if (!response.ok) {
        return Promise.reject(response)
    }
}

export async function getAllMessages() {
    const response = await fetch(`${URL}/messages`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function createMessage(message) {
    const response = await fetch(`${URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getUserById(id, token) {

    const response = await fetch(`${URL}/users/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function login({ email, password }) {
    const response = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function register({ email, password }) {
    const response = await fetch(`${URL}/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}