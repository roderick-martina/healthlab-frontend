<template>
  <div class="w-full">
    <div class="my-5 w-full">
      <h1>Mbca</h1>
    </div>
    <div class="w-full flex">
      <AppSearch
        class="w-3/5"
        placeholder="Search MBCA results by Identifier"
        @enterActivate="search"
      />
      <div class="w-full flex flex-row-reverse">
        <div class="mt-3 ml-5">
          <label class="shadow rounded px-3 py-3 bg-white cursor-pointer">
            <i class="fas fa-upload"></i>
            Import
            <input
              @change="uploadFile"
              ref="importFile"
              type="file"
              class="hidden"
            >
          </label>
        </div>
        <AppButton class="bg-white" v-on:clickActivate="exportDownload">
          <template slot="icon">
            <i class="fas fa-download"></i>
          </template>
          <template slot="body">Download</template>
        </AppButton>
      </div>
    </div>
    <div class="w-full flex mt-10">
      <AppMbcaFilter v-on:filter="applyFilter" :ethnicityOptions="ethnicities"/>
      <div class="w-full flex flex-wrap">
        <table class="ml-10 w-full shadow rounded">
          <thead>
            <tr class="bg-app-dark-blue text-white h-10 d">
              <th class="rounded-tl">Identifier</th>
              <th class>Gender</th>
              <th class>Age</th>
              <th class>Bmi</th>
              <th class="rounded-tr">Methods</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in results" :key="index" class="text-center border-b">
              <td class="py-3">
                {{result.patient_identifier}}
                <span v-if="!result.valid_identifier">
                  <i class="fas fa-exclamation text-red"></i>
                </span>
              </td>
              <td class="py-3">{{result.gender}}</td>
              <td class="py-3">{{result.age}}</td>
              <td class="py-3">{{result.bmi_value}}</td>
              <td class="py-3">
                <AppButton
                  class="bg-app-dark-blue hover:bg-app-green text-white no-shadow font-bold"
                  v-on:clickActivate="navigate(result.id)"
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
import AppMbcaFilter from '@/components/AppMbcaFilter.vue'
import AppSearch from '@/components/AppSearch.vue'
import AppButton from '@/components/AppButton.vue'
import { mapGetters } from 'vuex'

export default {
  layout: 'app',
  // async asyncData({ $axios }) {
  //   // try {
  //   let mbca = await $axios.get('mbca')
  //   // let researchProject = await $axios.get('mbca/research-project')
  //   let ethnicityOptions = await $axios.get('mbca/ethnicicties')
  //   return {
  //     results: mbca.data.data,
  //     pagination: {
  //       current_page: mbca.data.meta.current_page,
  //       last_page: mbca.data.meta.last_page,
  //       next_page_url: mbca.data.links.next,
  //       prev_page_url: mbca.data.links.prev
  //     },
  //     ethnicities: ethnicityOptions.data
  //   }
  // },
  middleware: 'auth',
  async fetch({ store }) {
    let mbca = await store.$axios.get('mbca')
    let ethnicityOptions = await store.$axios.get('mbca/ethnicicties')
    let pagination = {
      current_page: mbca.data.meta.current_page,
      last_page: mbca.data.meta.last_page,
      next_page_url: mbca.data.links.next,
      prev_page_url: mbca.data.links.prev
    }
    store.dispatch('mbca/handleMbcaResults', mbca)
    store.commit('mbca/saveEthnicities', ethnicityOptions.data)
  },
  computed: {
    ...mapGetters({
      results: 'mbca/results',
      pagination: 'mbca/pagination',
      ethnicities: 'mbca/ethnicities'
    })
  },
  data() {
    return {
      // results: [],
      // pagination: null,
      paramValues: {},
      importFile: null
      // ethnicities: []
    }
  },

  methods: {
    navigate: function(id) {
      if (window.location.href.includes('127')) {
        window.location = `http://127.0.0.1:3000/${
          this.$router.currentRoute.name
        }/${id}`
      } else {
        window.location = `https://healthlab.netlify.com/${
          this.$router.currentRoute.name
        }/${id}`
      }
    },
    convertToHttps: function(url) {
      if (!url.includes('mbca')) {
        url = url.replace('?', '/api/mbca?')
      }
      if (url.includes('herokuapp') && url.includes('http:')) {
        return url.replace('http', 'https')
      }
      return url
    },
    search: function(query) {
      this.$axios
        .get(`mbca`, {
          params: {
            identifier: query
          }
        })
        .then(res => {
          this.setResults(res)
        })
        .catch(err => {
          this.$notify({
            title: 'Search',
            text: "Something when't wrong searching for a specific mbca result",
            type: 'error',
            speed: 2000
          })
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
        .catch(err => {
          this.$notify({
            title: 'Fetch mbca results',
            text: 'Cannot fetch mbca results',
            type: 'error',
            speed: 2000
          })
        })
    },
    applyFilter: function(res) {
      this.setResults(res.data)
      this.paramValues = res.params
    },
    setResults: function(res) {
      this.$store.dispatch('mbca/handleMbcaResults', res)
    },
    clearInput: function() {
      this.$refs.importFile.value = ''
      this.importFile = null
    },
    uploadFile: function() {
      // console.dir(this.$refs.importFile)
      // console.log('log')
      this.importFile = this.$refs.importFile.files[0]

      let form = new FormData()
      form.append('mbca', this.importFile)

      this.$axios
        .post('mbca', form)
        .then(res => {
          this.$notify({
            title: 'Upload file',
            text: 'The file is being uploaded and imported in the database',
            type: 'success',
            speed: 600
          })
          // this.importFile = null
          this.clearInput()
          this.fetchResults('mbca')
        })
        .catch(err => {
          this.clearInput()
          this.$notify({
            title: 'Upload file',
            text: 'Failed to upload file to server',
            type: 'error',
            speed: 600
          })
        })
    },
    exportDownload: function() {
      this.$axios({
        url: 'mbca/export',
        method: 'GET',
        responseType: 'blob', // important
        params: this.paramValues
      })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'mbca-results.xlsx')
          document.body.appendChild(link)
          link.click()
        })
        .catch(err => {
          this.$notify({
            title: 'Export file',
            text: 'Failed to export mbca results',
            type: 'error',
            speed: 2000
          })
        })
    }
  },
  components: {
    Header,
    Sidebar,
    AppMbcaFilter,
    AppSearch,
    AppButton
  }
}
</script>
<style lang="scss">
</style>


