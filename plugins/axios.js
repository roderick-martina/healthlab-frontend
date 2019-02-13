import { reject } from "q";

export default function ({$axios, store }) {
    $axios.onError(error => {
        console.dir(error.response)
        if (error.response.status === 422) {
           
            store.dispatch('validation/setErrors', error.response.data.errors)
        }

        return Promise.reject(error)
        
    })

    $axios.onRequest(() => {
        store.dispatch('validation/clearErrors')
    })
}