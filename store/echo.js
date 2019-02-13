import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export const state = () => ({
    token: null
})

export const mutations = {
    setToken (state, token) {
        return state.token = token
    }
}

export const actions = {
    initEcho ({state}, token) {
        window.Echo = new Echo({
            auth: {
              headers: {
                Authorization: token,
                Accept: 'application/json'
              }
            },
            authEndpoint: process.env.PUSHER_AUTH_ENDPOINT,
            broadcaster: 'pusher',
            key: process.env.PUSHER_KEY,
            cluster: process.env.PUSHER_CLUSTER,
            encrypted: true,
          })
    }
}

