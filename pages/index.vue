<template>
  <div class="w-full">
    <div class="my-5 w-full">
      <h1>Welcome {{user.name}}</h1>
    </div>
    <div class="w-full flex">
      <button @click="$router.push({ name: 'mbca'})" class="w-24 mr-10 focus:outline-none hover:shadow rounded-full">
        <img src="../assets/mbca.jpg" class="rounded-full mb-2"/>
        <span class="font-bold mb-2">Mbca</span>
      </button>
      <button @click="$router.push({ name: 'bodpod'})" class="w-24 focus:outline-none hover:shadow rounded-full">
        <img src="../assets/bodpod.jpg" class="rounded-full mb-2"/>
        <span class="font-bold">Bodpod</span>
      </button>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'
import AppButton from '../components/AppButton.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'app',
  middleware: 'auth',
  components: {
    Sidebar,
    Header,
    AppButton
  },
  data() {
    return {
      buttons: [
        {
          name: 'Patients',
          icon: 'fas fa-fas fa-address-card',
          link: 'patients'
        },
        {
          name: 'Mbca',
          icon: 'fas fa-fas fa-download',
          link: 'mbca'
        },
        {
          name: 'Bodpod',
          icon: 'fas fa-fas fa-download',
          link: 'bodpod'
        }
      ]
    }
  }
}
</script>

<style>
</style>
