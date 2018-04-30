export const patch = async (patch) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/messages/`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export const flipStar = async (id, star) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/messages/`, {
        method: 'PATCH',
        body: JSON.stringify(),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export const getEmails = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const json = await response.json()
    const emails = await json._embedded.messages
    return emails
}


export const post = async (message) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/`, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const email = await response.json()
    return email;
}

export const getBody = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/` + id)
    const message = await response.json()
    const body = await message.body
    return body;
}
