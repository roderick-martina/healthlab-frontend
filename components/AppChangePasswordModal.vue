<template>
  <modal name="change-password" :clickToClose="false" height="auto">
    <form @submit.prevent class="p-10">
      <div class="flex flex-col mb-6">
        <div>
          <label class="font-bold uppercase tacking-wide">Password</label>
          <input
            v-model="updateUser.password"
            autocomplete="false"
            type="password"
            placeholder="password"
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
        <span class="text-xsm text-red">{{feedback}}</span>
      </div>
    </form>
  </modal>
</template>

<script>
import AppButton from '@/components/AppButton.vue'
import Cookie from 'js-cookie'
export default {
  components: {
    AppButton
  },
  data() {
    return {
      feedback: '',
      updateUser: {
        password: null
      }
    }
  },
  methods: {
    closeModal: function() {
      this.$modal.hide('change-password')
    },
    savePatient: function() {
      this.$axios
        .post(`update`, this.updateUser)
        .then(res => {
          let auth = `Bearer ${res.data.token}`
          this.$auth.setToken('local', auth)
          this.updateUser = {
            password: null
          }
          window.location.reload(true)
        })
        .catch(err => {
          this.feedback = err.response.data.errors.password[0]
        })
    }
  }
}
</script>

<style>
</style>
