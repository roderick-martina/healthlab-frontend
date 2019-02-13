<template>
  <div class="w-full">
    <div class="my-5 w-full flex flex">
      <div class="w-1/5">
        <h1>Customfields</h1>
      </div>
      <div class="w-4/5 flex flex-row-reverse">
        <AppButton class="bg-white" v-on:clickActivate="showModal">
          <template slot="body">Add CustomField</template>
        </AppButton>
      </div>
    </div>
    <div class="w-full flex"></div>
    <!-- <p v-for="(custom,index) in customfields" :key="index">{{custom.field_name}}</p> -->
    <table class="w-full shadow rounded">
      <thead>
        <tr class="bg-app-dark-blue text-white h-10 d">
          <th class="rounded-tl">Fieldname</th>
          <th class="rounded-tr">Methods</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="customfields.length == 0">
          <th class="py-3">There are no customfields</th>
        </tr>
        <tr v-for="(custom,index) in customfields" :key="index" class="text-center border-b">
          <td class="py-3">{{custom.field_name}}</td>
          <td class="py-3">
            <AppButton
              v-on:clickActivate="showModal(custom.field_name, custom.id)"
              class="bg-app-dark-blue hover:bg-app-green text-white no-shadow font-bold"
            >
              <template slot="icon">
                <i class="fas fa-edit"></i>
              </template>
            </AppButton>
            <AppButton
              v-if="user.role == 'admin'"
              v-on:clickActivate="showDeleteModal(custom.id)"
              class="bg-app-dark-blue hover:bg-app-green text-white no-shadow font-bold"
            >
              <template slot="icon">
                <i class="fas fa-trash-alt"></i>
              </template>
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
</template>

<script>
import AppButton from '@/components/AppButton.vue'
export default {
  middleware: 'auth',
  layout: 'app',
  async asyncData({ $axios, error }) {
    // try {
    let customfields = await $axios.get('customfields', {
      params: {
        paginate: true
      }
    })

    return {
      customfields: customfields.data.data,
      pagination: {
        current_page: customfields.data.meta.current_page,
        last_page: customfields.data.meta.last_page,
        next_page_url: customfields.data.links.next,
        prev_page_url: customfields.data.links.prev
      }
    }
    // } catch (err) {
    //   // error({ statusCode: 422, message: 'Could not load data' })
    // }
  },
  data() {
    return {
      customfields: null,
      pagination: null
    }
  },
  methods: {
    convertToHttps: function(url) {
      if (url.includes('herokuapp')) {
        return url.replace('http', 'https')
      }
      return url
    },
    fetchResults: function(url) {
      this.$axios
        .get(url, {
          params: {
            paginate: true
          }
        })
        .then(res => {
          this.setResults(res)
        })
        .catch(err => console.log(err))
    },
    setResults: function(res) {
      this.customfields = res.data.data
      this.pagination = {
        current_page: res.data.meta.current_page,
        last_page: res.data.meta.last_page,
        next_page_url: res.data.links.next,
        prev_page_url: res.data.links.prev
      }
    },
    showModal: function(fieldname, id) {
      if (fieldname != null) {
        this.$modal.show('edit-custom-field', { field: fieldname, id: id })
      } else {
        this.$modal.show('add-custom-field')
      }
    },
    showDeleteModal: function(id) {
      this.$modal.show('dialog', {
        title: 'Delete',
        text:
          'Are you sure you want to delete the custom field. All data refering to this customfield will be deleted!',
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
              this.deleteCustomfield(id)
            }
          }
        ]
      })
    },
    deleteCustomfield: function(id) {
      this.$axios
        .delete(`customfields/${id}`)
        .then(res => {
          window.location.reload(true)
        })
        .catch(err => {
          alert("Something when't wrong deleting the customfield.")
          console.dir(err)
        })
    }
  },
  components: {
    AppButton
  }
}
</script>

<style>
</style>
