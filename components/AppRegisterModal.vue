<template>
  <modal name="register-user" :clickToClose="false" height="auto">
    <form @submit.prevent class="p-10">
      <div class="flex flex-col mb-6">
        <div>
          <label class="font-bold uppercase tacking-wide">Email</label>
          <input
            v-model="newUser.email"
            autocomplete="false"
            type="text"
            placeholder="Enter student email"
            class="pl-2 mt-2 h-8 w-full w-full bg-white border border-grey-light hover:border-grey rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
        </div>
        <div class="mt-4">
          <label class="font-bold uppercase tacking-wide">Password</label>
          <input
            v-model="newUser.password"
            autocomplete="false"
            type="password"
            placeholder="Enter research project"
            class="pl-2 mt-2 h-8 w-full w-full bg-white border border-grey-light hover:border-grey rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
        </div>
      </div>
      <div class="flex">
        <AppButton v-on:clickActivate="closeModal" class="bg-grey text-white mr-4 flex-1">
          <template slot="body">Cancel</template>
        </AppButton>
        <AppButton v-on:clickActivate="savePatient" class="bg-app-green text-white flex-1">
          <template slot="body">Save</template>
        </AppButton>
      </div>

      <div v-if="feedback" class="mt-6">
        <span v-for="(error, index) in feedback" :key="index" class="text-xsm text-red block pb-2">{{error[0]}}</span>
      </div>
    </form>
  </modal>
</template>

<script>
import AppButton from '@/components/AppButton.vue'

export default {
  components: {
    AppButton
  },
  data() {
    return {
      feedback: '',
      newUser: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    closeModal: function() {
      this.$modal.hide('register-user')
    },
    savePatient: function() {
      this.$axios
        .post('register', this.newUser)
        .then(res => {
          this.newUser = {
            email: null,
            password: null
          }
          this.$modal.hide('register-user')
          window.location.reload(true)
        })
        .catch(err => {
          this.feedback = err.response.data.errors
          console.dir(this.feedback)
        })
    }
  }
}
</script>

<style>
</style>
