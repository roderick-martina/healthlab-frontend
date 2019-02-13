<template>
  <div class="w-full">
    <div class="my-5 w-full">
      <h1>Bodpod</h1>
    </div>
    <div class="w-full flex">
      <AppSearch
        class="w-3/5"
        placeholder="Search Bodpod results by Test Number"
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
      <AppBodpodFilter v-on:filter="applyFilter" :activityOptions="activityOptions"/>
      <div class="w-full flex flex-wrap">
        <table class="ml-10 w-full shadow rounded">
          <thead>
            <tr class="bg-app-dark-blue text-white h-10 d">
              <th class="rounded-tl">Test Number</th>
              <th class>Gender</th>
              <th class>Age</th>
              <th class>Activity Level</th>
              <th class="rounded-tr">Methods</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in results" :key="index" class="text-center border-b">
              <td class="py-3">{{result.test_no}}</td>
              <td class="py-3">{{result.gender}}</td>
              <td class="py-3">{{result.age}}</td>
              <td class="py-3">{{result.activity_level}}</td>
              <td class="py-3">
                <!-- <nuxt-link :to="{ path: `bodpod/${result.test_no}`}" replace> -->
                <AppButton
                  class="bg-app-dark-blue hover:bg-app-green text-white no-shadow font-bold"
                  v-on:clickActivate="navigate(result.test_no)"
                >
                  <template slot="body">More</template>
                </AppButton>
                <!-- </nuxt-link> -->
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
import AppBodpodFilter from '@/components/AppBodpodFilter.vue'
import AppSearch from '@/components/AppSearch.vue'
import AppButton from '@/components/AppButton.vue'
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  layout: 'app',
  async fetch({ store }) {
    let bodpod = await store.$axios.get('bodpod')
    let activityOptions = await store.$axios.get('bodpod/activities')
    let pagination = {
      current_page: bodpod.data.meta.current_page,
      last_page: bodpod.data.meta.last_page,
      next_page_url: bodpod.data.links.next,
      prev_page_url: bodpod.data.links.prev
    }
    store.dispatch('bodpod/handleBodpodResults', bodpod)
    store.commit('bodpod/saveActivities', activityOptions.data)
  },
  data() {
    return {
      paramValues: {},
      importFile: null
    }
  },
  computed: {
    ...mapGetters({
      results: 'bodpod/results',
      pagination: 'bodpod/pagination',
      activities: 'bodpod/activities'
    }),
    activityOptions: function() {
      return this.activities.filter(function(el) {
        return el != null
      })
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
      if (!url.includes('bodpod')) {
        url = url.replace('?', '/api/bodpod?')
      }
      if (url.includes('herokuapp') && url.includes('http:')) {
        return url.replace('http', 'https')
      }
      return url
    },
    search: function(query) {
      this.$axios
        .get(`bodpod`, {
          params: {
            testnumber: query
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
            title: 'Fetch bodpod results',
            text: 'Cannot fetch bodpod results',
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
      this.$store.dispatch('bodpod/handleBodpodResults', res)
    },
    clearInput: function() {
      this.$refs.importFile.value = ''
      this.importFile = null
    },
    uploadFile: function() {
      this.importFile = this.$refs.importFile.files[0]

      let form = new FormData()
      form.append('bodpod', this.importFile)

      this.$axios
        .post('bodpod', form)
        .then(res => {
          this.$notify({
            title: 'Upload file',
            text: 'The file is being uploaded and imported in the database',
            type: 'success',
            speed: 600
          })
          this.clearInput()
        })
        .catch(err => {
          this.clearInput()
          this.$notify({
            title: 'Upload file',
            text: 'Failed to upload file to server',
            type: 'warn',
            speed: 600
          })
        })
    },
    exportDownload: function() {
      this.$axios({
        url: 'bodpod/export',
        method: 'GET',
        responseType: 'blob', // important
        params: this.paramValues
      })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'bodpod-results.xlsx')
          document.body.appendChild(link)
          link.click()
        })
        .catch(err => {
          this.$notify({
            title: 'Export file',
            text: 'Failed to export bodpod results',
            type: 'error',
            speed: 2000
          })
        })
    }
  },
  components: {
    Header,
    Sidebar,
    AppBodpodFilter,
    AppSearch,
    AppButton
  }
}
</script>
<style lang="scss">
</style>


