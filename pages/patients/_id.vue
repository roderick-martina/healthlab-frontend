<template>
  <div class="w-full">
    <div class="w-full my-5 flex">
      <div class="w-24">
        <AppButton class="bg-white" v-on:clickActivate="$router.push({name:'patients'})">
          <template slot="icon">
            <i class="fas fa-arrow-left"></i>
          </template>
          <template slot="body">Back</template>
        </AppButton>
      </div>
      <div class="flex-1 ml-3">
        <h1 class>
          Patient:
          {{patient.identifier}}
        </h1>
      </div>
      <div class="w-3/5 flex flex-row-reverse">
        <div class="w-full">
          <AppButton
            v-if="user.role == 'admin'"
            class="bg-white float-right ml-4"
            v-on:clickActivate="showDeleteModal(patient.id)"
          >
            <template slot="body">Delete patient</template>
          </AppButton>
          <AppButton
            class="bg-white float-right ml-4"
            v-on:clickActivate="exportDownload(patient.identifier)"
          >
            <template slot="icon">
              <i class="fas fa-download"></i>
            </template>
            <template slot="body">Download</template>
          </AppButton>
          <AppButton class="bg-white float-right ml-4" v-on:clickActivate="showModal">
            <template slot="body">Add CustomField</template>
          </AppButton>
        </div>
      </div>
    </div>
    <div v-if="patient.manuel_created" class="w-full my-5">
      <h2>Manuel created patient information</h2>
      <div class="mt-5 w-full flex flex-wrap border rounded shadow bg-white px-5">
        <div>
          <div class="w-full flex justify-center py-3">
            <span
              v-if="patient.research_project"
              class="font-bold mr-3"
            >(research) project: {{patient.research_project}}</span>
            <span class="font-bold mr-3">Gender: {{patient.gender}}</span>
            <span class="font-bold">Age: {{patient.age}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="patient.mbca_results[0]" class="w-full">
      <h2>Mbca Results</h2>
      <AppMbcaTable :result="mbcaResult"/>
      <AppButton
        v-if="patient.mbca_results[0 + 1]"
        :disabled="mbcaNewItem"
        v-on:clickActivate="mbcaPrevButton"
        class="my-4"
      >
        <template slot="body">Previous result</template>
      </AppButton>
      <AppButton
        v-if="patient.mbca_results[0 + 1]"
        :disabled="mbcaOlderItem"
        v-on:clickActivate="mbcaNextButton"
        class="my-4"
      >
        <template slot="body">Next result</template>
      </AppButton>
    </div>
    <div v-if="patient.bodpod_results[0]" class="w-full my-5">
      <h2>Bodpod Results</h2>
      <AppBodpodTable :result="bodpodResult"/>
      <AppButton
        v-if="patient.bodpod_results[0 + 1]"
        :disabled="bodpodNewItem"
        v-on:clickActivate="bodpodPrevButton"
        class="my-4"
      >
        <template slot="body">Previous result</template>
      </AppButton>
      <AppButton
        v-if="patient.bodpod_results[0 + 1]"
        :disabled="bodpodOlderItem"
        v-on:clickActivate="bodpodNextButton"
        class="my-4"
      >
        <template slot="body">Next result</template>
      </AppButton>
    </div>
    <div v-if="patient.patient_custom_field.length > 0" class="w-full my-5">
      <h2>Patient Customfields Results</h2>
      <AppCustomFieldTable :results="patient.patient_custom_field"/>
    </div>

    <!-- <div class="w-full">

    </div>-->
  </div>
</template>

<script>
import AppMbcaTable from '@/components/AppMbcaTable.vue'
import AppBodpodTable from '@/components/AppBodpodTable.vue'
import AppCustomFieldTable from '@/components/AppCustomFieldTable.vue'
import AppButton from '@/components/AppButton.vue'

export default {
  middleware: 'auth',
  async asyncData({ $axios, error, params }) {
    // try {
    let patient = await $axios.get(`patients/${params.id}`)
    return {
      patient: patient.data.data
    }
    // } catch (err) {
    //   error({ statusCode: 401, message: 'user credentials are incorrect' })
    // }
  },
  computed: {
    mbcaResult: function() {
      return this.patient.mbca_results[this.mbcaIndex]
    },
    bodpodResult: function() {
      return this.patient.bodpod_results[this.bodpodIndex]
    },
    mbcaOlderItem: function() {
      if (this.patient.mbca_results[this.mbcaIndex + 1]) {
        return false
      }
      return true
    },
    mbcaNewItem: function(index) {
      if (this.patient.mbca_results[this.mbcaIndex + -1]) {
        return false
      }
      return true
    },
    bodpodOlderItem: function() {
      if (this.patient.mbca_results[this.bodpodIndex + 1]) {
        return false
      }
      return true
    },
    bodpodNewItem: function() {
      if (this.patient.mbca_results[this.bodpodIndex + -1]) {
        return false
      }
      return true
    }
  },
  data() {
    return {
      patient: null,
      mbcaIndex: 0,
      bodpodIndex: 0
    }
  },
  methods: {
    mbcaNextButton: function() {
      this.mbcaIndex++
    },
    mbcaPrevButton: function() {
      this.mbcaIndex--
    },
    bodpodNextButton: function() {
      this.bodpodIndex++
    },
    bodpodPrevButton: function() {
      this.bodpodIndex--
    },
    exportDownload: function(id) {
      this.$axios({
        url: `patients/export/${id}`,
        method: 'GET',
        responseType: 'blob' // important
      })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `patient-${id}.xlsx`)
          document.body.appendChild(link)
          link.click()
        })
        .catch(err => alert('Export failed!'))
    },
    showModal: function(id) {
      this.$modal.show('add-field', { patient_id: this.patient.id })
    },
    deletePatient: function(id) {
      this.$axios
        .delete(`patients/${id}`)
        .then(res => {
          this.$modal.hide('dialog')
          this.$router.push({
            name: 'patients'
          })
        })
        .catch(err => {
          alert(`Something when't wrong deleting ${patient.identifier}!`)
          console.dir(err)
        })
    },
    showDeleteModal: function() {
      this.$modal.show('dialog', {
        title: 'Delete',
        text: `Are you sure you want to delete <b>${
          this.patient.identifier
        }</b>!`,
        buttons: [
          {
            title: 'Cancel', // Button title
            class: 'focus:outline-none py-3 text-xs border-r',
            default: true // Will be triggered by default if 'Enter' pressed.
          },
          {
            title: 'Delete',
            class: 'focus:outline-none py-3 text-xs',
            handler: () => {
              this.deletePatient(this.patient.id)
            }
          }
        ]
      })
    }
  },
  layout: 'app',
  components: {
    AppMbcaTable,
    AppBodpodTable,
    AppCustomFieldTable,
    AppButton
  }
}
</script>

<style>
</style>
