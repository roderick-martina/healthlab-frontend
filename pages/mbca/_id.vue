<template>
  <div class="w-full">
    <div class="w-full my-5 flex">
      <AppButton class="bg-white" v-on:clickActivate="$router.push({name:'mbca'})">
        <template slot="icon">
          <i class="fas fa-arrow-left"></i>
        </template>
        <template slot="body">Back</template>
      </AppButton>
      <div class="ml-10">
        <h1 class>
          Patient:
          {{result.identifier}}
        </h1>
      </div>

      <div class="flex flex-1 justify-end">
        <AppButton class="bg-white" v-on:clickActivate="exportDownload">
          <template slot="icon">
            <i class="fas fa-download"></i>
          </template>
          <template slot="body">Download</template>
        </AppButton>
        <AppButton v-if="user.role == 'admin'" class="bg-white ml-4" v-on:clickActivate="showDeleteModal(result)">
          <template slot="icon">
            <i class="fas fa-trash-alt"></i>
          </template>
          <template slot="body">Delete</template>
        </AppButton>
      </div>
    </div>
    <div class="w-full flex flex-wrap">
      <div class="w-full">
        <h2>MBCA Results</h2>
      </div>
      <AppMbcaTable :result="result"/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import AppButton from '@/components/AppButton.vue'
import AppMbcaTable from '@/components/AppMbcaTable.vue'

export default {
  middleware: 'auth',
  async asyncData({ $axios, error, params }) {
    let mbca = await $axios.get(`mbca/${params.id}`)
    return {
      result: mbca.data
    }

  },
  layout: 'app',
  components: {
    Header,
    Sidebar,
    AppButton,
    AppMbcaTable
  },
  methods: {
    exportDownload: function() {
      this.$axios({
        url: `mbca/export/${this.result.id}`,
        method: 'GET',
        responseType: 'blob' // important
      })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'mbca-result.xlsx')
          document.body.appendChild(link)
          link.click()
        })
        .catch(err => alert('Export failed!'))
    },
    showDeleteModal: function(result) {
      this.$modal.show('dialog', {
        title: 'Delete',
        text: `Are you sure you want to delete the mbca result from <b>${result.identifier}</b>`,
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
              this.deleteResult(result.id)
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    deleteResult: function(id) {
      this.$axios
        .delete(`mbca/${id}`)
        .then(res => {
          this.$router.push({name:'mbca'})
        })
        .catch(err => {
          alert("Something when't wrong deleting the user.")
          console.dir(err)
        })
    }
  }
}
</script>

<style>
</style>
