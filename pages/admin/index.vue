<template>
  <div class="w-full flex flex-wrap">
    <div class="my-5 w-full">
      <h1>Settings</h1>
    </div>
    <div class="w-full flex">
      <AppSearch
        v-if="user.role == 'admin'"
        class="w-3/5"
        placeholder="Search by student email"
        @enterActivate="search"
      />
      <div class="w-full flex flex-row-reverse">
        <AppButton
          v-if="user.role == 'admin'"
          v-on:clickActivate="$modal.show('register-user')"
          class="ml-4"
        >
          <template slot="body">Add student</template>
        </AppButton>
        <AppButton v-on:clickActivate="$modal.show('change-password')">
          <template slot="body">Change password</template>
        </AppButton>
      </div>
    </div>
    <div v-if="user.role == 'admin'" class="w-full mt-5">
      <table class="w-full shadow rounded">
        <thead>
          <tr class="bg-app-dark-blue text-white h-10 d">
            <th class="rounded-tl">Studentnumber</th>
            <th class="rounded-tr">Methods</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredUsers.length == 0">
            <th class="py-3">There are no students</th>
          </tr>
          <tr v-for="(user,index) in filteredUsers" :key="index" class="text-center border-b">
            <td class="py-3">{{user.email}}</td>
            <td class="py-3">
              <AppButton
                v-on:clickActivate="showDeleteModal(user)"
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
      <div v-if="user.role == 'admin'" class="flex w-full justify-center mt-5">
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
</template>

<script>
import AppButton from '@/components/AppButton'
import AppSearch from '@/components/AppSearch.vue'

export default {
  async asyncData({ $axios }) {
    let users = await $axios.get('users')
    return {
      users: users.data.data,
      pagination: {
        current_page: users.data.meta.current_page,
        last_page: users.data.meta.last_page,
        next_page_url: users.data.links.next,
        prev_page_url: users.data.links.prev
      }
    }
  },
  middleware: 'auth',
  layout: 'app',
  components: {
    AppButton,
    AppSearch
  },
  computed: {
    filteredUsers: function() {
      return this.users.filter(function(user) {
        return user.role !== 'admin'
      })
    }
  },
  data() {
    return {
      users: [],
      pagination: {
        current_page: null,
        last_page: null,
        next_page_url: null,
        prev_page_url: null
      }
    }
  },
  methods: {
    search: function(query) {
      this.$axios
        .get(`users`, {
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
    convertToHttps: function(url) {
      if(url.includes('herokuapp')) {
        return url.replace('http', 'https')
      }
      return url
    },
    fetchResults: function(url) {
      this.$axios
        .get(url)
        .then(res => {
          this.setResults(res)
        })
        .catch(err => console.log(err))
    },
    setResults: function(res) {
      this.users = res.data.data
      this.pagination = {
        current_page: res.data.meta.current_page,
        last_page: res.data.meta.last_page,
        next_page_url: res.data.links.next,
        prev_page_url: res.data.links.prev
      }
    },
    showDeleteModal: function(user) {
      this.$modal.show('dialog', {
        title: 'Delete',
        text: `Are you sure you want to delete <b>${user.name}</b>`,
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
              this.deleteUser(user.id)
            }
          }
        ]
      })
    },
    deleteUser: function(id) {
      this.$axios
        .delete(`users/${id}`)
        .then(res => {
          window.location.reload(true)
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
