<template>
  <div class="w-full">
    <div class="my-5 w-full">
      <h1>Patients</h1>
    </div>
    <div class="w-full flex">
      <AppSearch
        class="w-3/5"
        placeholder="Search Patients results by Identifier"
        @enterActivate="search"
      />
      <div class="w-full flex flex-row-reverse">
        <AppButton class="bg-white ml-4" v-on:clickActivate="showAddPatientModal">
          <template slot="body">Add patient</template>
        </AppButton>
        <AppButton class="bg-white float-right" v-on:clickActivate="exportDialog">
          <template slot="icon">
            <i class="fas fa-download"></i>
          </template>
          <template slot="body">Download</template>
        </AppButton>
      </div>
    </div>
    <div class="w-full flex mt-10">
      <AppPatientFilter v-on:filter="applyFilter" :researchProjectOptions="researchProjectOptions"/>
      <div class="w-full flex flex-wrap">
        <table class="ml-10 w-full shadow rounded">
          <thead>
            <tr class="bg-app-dark-blue text-white h-10 d">
              <th class="rounded-tl">Identifier</th>
              <th class>Gender</th>
              <th class>Age</th>
              <th class="rounded-tr">Methods</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in results" :key="index" class="text-center border-b">
              <td class="py-3">
                {{result.identifier}}
                <span v-if="!result.valid_identifier">
                  <i class="fas fa-exclamation text-red"></i>
                </span>
              </td>
              <td class="py-3">{{result.gender}}</td>
              <td class="py-3">{{result.age}}</td>
              <td class="py-3">
                <AppButton
                  class="bg-app-dark-blue hover:bg-app-green text-white no-shadow font-bold"
                  v-on:clickActivate="$router.push(`patients/${result.identifier}`)"
                >
                  <template slot="body">More</template>
                </AppButton>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex w-full justify-center mt-5">
          <AppButton
            class="bg-app-dark-blue text-white hover:bg-app-green h-10"
            v-on:clickActivate="fetchResults(convertToHttps(pagination.prev_page_url))"
            :disabled="!pagination.prev_page_url"
          >
            <template slot="body">Previous</template>
          </AppButton>
          <span class="mr-3 ml-3">Page {{pagination.current_page}} of {{pagination.last_page}}</span>
          <AppButton
            class="bg-app-dark-blue text-white hover:bg-app-green h-10"
            v-on:clickActivate="fetchResults(convertToHttps(pagination.next_page_url))"
            :disabled="!pagination.next_page_url"
          >
            <template slot="body">Next</template>
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import AppPatientFilter from '@/components/AppPatientFilter.vue'
import AppSearch from '@/components/AppSearch.vue'
import AppButton from '@/components/AppButton.vue'

export default {
  layout: 'app',
  middleware: 'auth',
  async asyncData({ $axios, error }) {
    // try {
    let patients = await $axios.get('patients')
    let researchProject = await $axios.get('patients/research-project')

    return {
      results: patients.data.data,
      pagination: {
        current_page: patients.data.meta.current_page,
        last_page: patients.data.meta.last_page,
        next_page_url: patients.data.links.next,
        prev_page_url: patients.data.links.prev
      },
      researchProject: researchProject.data
    }
    // } catch (err) {
    //   // error({ statusCode: 401, message: 'user credentials are incorrect' })
    // }
  },
  data() {
    return {
      results: [],
      pagination: null,
      paramValues: {},
      importFile: null,
      searchError: '',
      ethnicities: [],
      researchProject: null,
      customfield: false
    }
  },
  computed: {
    researchProjectOptions: function() {
      return this.researchProject.filter(function(el) {
        return el != null
      })
    }
  },
  methods: {
    exportDialog: function() {
      this.$modal.show('dialog', {
        title: 'Patient result options!',
        text: 'Do you want the export file to only have patients that have custom fields or all the patients in the database?',
        buttons: [
          {
            title: 'Only customfields',
            handler: () => {
              this.paramValues.customfield = true
              this.exportDownload()
              this.paramValues = {}
              this.$modal.hide('dialog')
              
            }
          },
          {
            title: 'All patients', // Button title
            default: true, // Will be triggered by default if 'Enter' pressed.
            handler: () => {
              this.exportDownload()
              this.$modal.hide('dialog')
            } // Button click handler
          },
          {
            title: 'Close'
          }
        ]
      })
    },
    exportDownload: function() {
      this.$axios({
        url: `patients/export`,
        method: 'GET',
        responseType: 'blob', // important
        params: this.paramValues
      })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `patients-results.xlsx`)
          document.body.appendChild(link)
          link.click()
        })
        .catch(err => alert('Export failed!'))
    },
    convertToHttps: function(url) {
      if (url.includes('herokuapp')) {
        return url.replace('http', 'https')
      }
      return url
    },
    search: function(query) {
      this.$axios
        .get(`patients`, {
          params: {
            identifier: query
          }
        })
        .then(res => {
          this.setResults(res)
          if (res.data.length == 0) {
            this.searchError = 'Found no search results'
          }
        })
        .catch(err => {
          this.searchError = err.data.message
        })
    },
    fetchResults: function(url) {
      this.$axios
        .get(url, {
          params: this.paramValues
        })
        .then(res => {
          this.setResults(res)
        })
        .catch(err => console.log(err))
    },
    applyFilter: function(res) {
      this.setResults(res.data)
      this.paramValues = res.params
    },
    setResults: function(res) {
      this.results = res.data.data
      this.pagination = {
        current_page: res.data.meta.current_page,
        last_page: res.data.meta.last_page,
        next_page_url: res.data.links.next,
        prev_page_url: res.data.links.prev
      }
    },
    showAddPatientModal: function() {
      this.$modal.show('add-patient')
    }
  },
  components: {
    Header,
    Sidebar,
    AppPatientFilter,
    AppSearch,
    AppButton
  }
}
</script>
<style lang="scss">
</style>


