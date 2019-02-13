<template>
  <modal name="add-field" @before-open="beforeOpen" @before-close="beforeClose" :clickToClose="false" height="auto">
    <form @submit.prevent class="p-10">
      <div class="flex flex-col mb-6">
        <label class="font-bold uppercase tacking-wide">Custom fields</label>
        <select
          v-model="selectedCustomField"
          class="mt-2 h-8 w-full w-full bg-white border border-grey-light hover:border-grey rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option selected value>Choose customfield</option>
          <option v-for="(custom,index) in customfields" :key="index" :value="custom.id">{{custom.field_name}}</option>
        </select>
      </div>
      <div class="flex flex-col mb-6">
        <label class="font-bold uppercase tacking-wide">value</label>
        <input
          @keyup.enter.native="savePatientCustomField"
          v-model="value"
          type="text"
          placeholder="Enter custom field value"
          class="pl-2 mt-2 h-8 w-full w-full bg-white border border-grey-light hover:border-grey rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
      </div>
      <div class="flex">
        <AppButton v-on:clickActivate="closeModal" class="bg-grey text-white mr-4 flex-1">
          <template slot="body">Cancel</template>
        </AppButton>
        <AppButton v-on:clickActivate="savePatientCustomField" class="bg-app-green text-white flex-1">
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
      patient_id: null,
      customfields: null,
      selectedCustomField: '',
      value: '',
      feedback: null
    }
  },
  methods: {
    beforeOpen(event) {
      this.patient_id = event.params.patient_id
    },
    beforeClose(event) {
      this.feedback = null
    },
    closeModal: function() {
      this.$modal.hide('add-field')
    },
    savePatientCustomField: function() {
      this.$axios.post('patients/customfields', {
        'patient_id': this.patient_id,
        'custom_field_id': this.selectedCustomField,
        'value': this.value
      })
      .then(res => {
         window.location.reload(true)
      })
      .catch(err => {
        this.feedback = err.response.data.errors
      })
    }
  },
  mounted() {
    this.$axios
      .get('customfields')
      .then(res => {
        this.customfields = res.data.data
      })
      .catch(err =>
        console.log("Something when't wrong getting the customfields options")
      )
  }
}
</script>

<style>
</style>
