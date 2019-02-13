<template>
    <div class="w-full max-height flex">
        <div class="w-64">
            <div class="flex justify-center">
                  <img class="max-height" src="../assets/hhs-grijs.png" />
            </div>
        </div>
        <div class="flex-1 flex flex-row-reverse mr-10">
            <div class="flex flex-col justify-center">
                <AppButton v-on:clickActivate="logout">
                    <template slot="icon">
                        <i class="fas fa-sign-out-alt"></i>
                    </template>
                    <template slot="body">
                        Logout
                    </template>
                </AppButton>
            </div>
        </div>
    </div>
</template>

<script>
import AppButton from '@/components/AppButton.vue'

export default {
    components:{
        AppButton
    },
    methods: {
        logout () {
            this.$auth.logout()
        }
    },
    data() {
        return {
        }
    }
}
</script>

<style>
.max-height{
    max-height: 8vh;
}

</style>
