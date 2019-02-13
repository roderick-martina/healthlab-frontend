<template>
  <modal name="add-custom-field" :clickToClose="false">
    <form @submit.prevent class="p-20">
      <div class="flex flex-col mb-6">
        <label class="font-bold uppercase tacking-wide">Customfield</label>
        <input
          v-model="customfield"
          type="text"
          placeholder="Enter custom field"
          class="pl-2 mt-2 h-8 w-full w-full bg-white border border-grey-light hover:border-grey rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
      </div>
      <div class="flex">
        <AppButton v-on:clickActivate="closeModal" class="bg-grey text-white mr-4 flex-1">
          <template slot="body">Cancel</template>
        </AppButton>
        <AppButton v-on:clickActivate="saveCustomField" class="bg-app-green text-white flex-1">
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

export default {
  components: {
    AppButton
  },
  data() {
    return {
      customfield: null,
      feedback: ''
    }
  },
  methods: {
    closeModal: function() {
      this.$modal.hide('add-custom-field')
    },
    saveCustomField: function() {
      this.$axios
        .post('customfields', {
          field_name: this.customfield
        })
        .then(res => {
          window.location.reload(true)
        })
        .catch(err => {
          this.feedback = err.response.data.errors.field_name[0]
          console.dir(err)
        })
    }
  }
}
</script>

<style>
</style>
