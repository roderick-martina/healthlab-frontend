<template>
  <modal name="add-patient" :clickToClose="false" height="auto">
    <form @submit.prevent class="p-10">
      <div class="flex flex-col mb-6">
        <div>
          <label class="font-bold uppercase tacking-wide">Patient Identifier</label>
          <input
            v-model="patient.identifier"
            type="text"
            placeholder="Enter unique patient identifier"
            class="pl-2 mt-2 h-8 w-full w-full bg-white border border-grey-light hover:border-grey rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
        </div>
        <div class="mt-4">
          <label class="font-bold uppercase tacking-wide">(Reseach) project</label>
          <input
            v-model="patient.research_project"
            type="text"
            placeholder="Enter research project"
            class="pl-2 mt-2 h-8 w-full w-full bg-white border border-grey-light hover:border-grey rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
        </div>
        <div class="mt-4 flex flex-wrap">
          <label for="gender" class="w-full font-bold uppercase tacking-wide">Gender</label>
          <div class="mt-2">
            <input type="radio" id="Male" v-model="patient.gender" value="Male">
            <label for="Male">Male</label>
          </div>
          <div class="mt-2 ml-4">
            <input type="radio" id="Female" v-model="patient.gender" value="Female">
            <label for="Female">Female</label>
          </div>
        </div>
        <div class="mt-4">
          <label class="font-bold">Date of birth</label>
          <div class="pt-2">
            <input
              v-model="patient.date_of_birth"
              class="h-8 w-full border rounded pl-5 outline-none"
              type="date"
            >
          </div>
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
      patient: {
        identifier: null,
        research_project: null,
        gender: null,
        date_of_birth: ''
      }
    }
  },
  methods: {
    closeModal: function() {
      this.$modal.hide('add-patient')
    },
    savePatient: function() {
      this.$axios
        .post('patients', this.patient)
        .then(res => {
          this.patient = {
            identifier: null,
            gender: null,
            date_of_birth: ''
          }
          this.$modal.hide('add-patient')
          this.$router.push(`patients/${res.data.data.identifier}`)
        })
        .catch(err => {
          this.feedback = err.response.data.errors
        })
    }
  }
}
</script>

<style>
</style>
