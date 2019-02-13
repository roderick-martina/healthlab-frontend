import Vue from 'vue'
import { mapGetters } from 'vuex'

const User = {
    install (Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    loggedIn: 'auth/authenticated',
                    user: 'auth/user'
                })
            }
        })
    }

}

Vue.use(User)