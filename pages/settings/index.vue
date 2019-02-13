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
        <!-- <AppButton
          v-if="user.role == 'admin'"
          v-on:clickActivate="$modal.show('register-user')"
          class="ml-4"
        >
          <template slot="body">Add student</template>
        </AppButton> -->
        <AppButton v-on:clickActivate="$modal.show('change-password')">
          <template slot="body">Change password</template>
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'
import AppSearch from '@/components/AppSearch.vue'

export default {
  middleware: 'auth',
  layout: 'app',
  components: {
    AppButton,
    AppSearch
  },
  data() {
    return {
    }
  },
  methods:{
  }
}
</script>

<style>
</style>
