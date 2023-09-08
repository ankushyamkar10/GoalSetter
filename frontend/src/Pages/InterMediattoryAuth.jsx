import React, { useEffect } from 'react'
import axios from 'axios'


const InterMediatoryAuth = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const code = queryParameters.get("code")

    useEffect(() => {
        async function fetchAccessToken() {
            const response = await axios.post('http://localhost:5000/api/users/getGoogleAuthCode', { code })
            console.log(response);
        }
        fetchAccessToken();
    }, [])

    return (
        <div>

        </div>
    )
}

export default InterMediatoryAuth
