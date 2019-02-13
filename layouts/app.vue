<template>
  <div class="container mx-auto">
    <Header/>
    <div class="w-full flex">
      <Sidebar/>
      <div class="w-full bg-app-grey">
        <div class="flex flex-wrap mx-10">
          <AppAddFieldModal/>
          <AppAddCustomField/>
          <EditCustomField/>
          <AppAddPatientModal/>
          <AppRegisterModal/>
          <AppChangePasswordModal/>
          <v-dialog/>
          <notifications position="bottom right"/>
          <nuxt/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import AppAddFieldModal from '@/components/AppAddFieldModal.vue'
import AppAddCustomField from '@/components/AppAddCustomField.vue'
import EditCustomField from '@/components/EditCustomField.vue'
import AppAddPatientModal from '@/components/AppAddPatientModal.vue'
import AppRegisterModal from '@/components/AppRegisterModal.vue'
import AppChangePasswordModal from '@/components/AppChangePasswordModal.vue'

export default {
  components: {
    Header,
    Sidebar,
    AppAddFieldModal,
    AppAddCustomField,
    EditCustomField,
    AppAddPatientModal,
    AppRegisterModal,
    AppChangePasswordModal
  },
  mounted() {
    this.$store.commit('echo/setToken',localStorage.getItem('auth._token.local'))
    this.$store.dispatch('echo/initEcho',localStorage.getItem('auth._token.local'));

    window.Echo.private(`users.${this.$auth.user.id}`)
      .listen('.mbca-finished', e => {
        this.$store.dispatch('mbca/handleMbcaResults', e)
        this.$notify({
          title: 'Upload file',
          text: 'Mbca results are imported!',
          type: 'success',
          speed: 2000
        })
      })
      .listen('.bodpod-finished', e => {
        console.log(e)
        this.$store.dispatch('bodpod/handleBodpodResults', e)
        this.$notify({
          title: 'Upload file',
          text: 'Bodpod results are imported!',
          type: 'success',
          speed: 2000
        })
      })
      .listen('.mbca-failed', e => {
        this.$notify({
          title: 'Upload file',
          text:
            'Failed to import mbca results</br> check if the file is valid or corrupted',
          type: 'error',
          speed: 2000
        })
      })
      .listen('.bodpod-failed', e => {
        this.$notify({
          title: 'Upload file',
          text:
            'Failed to import bodpod results</br> check if the file is valid or corrupted',
          type: 'error',
          speed: 2000
        })
      })
  }
}
</script>


<style>
.vue-notification {
  font-size: 16px;
}
</style>
