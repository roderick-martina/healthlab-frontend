<template>
  <section class="w-64 bg-app-green sidebar-h">
    <div>
      <SidebarItem v-for="(item, index) in filteredItems" :key="index" :item="item"/>
    </div>
  </section>
</template>

<script>
import SidebarItem from '../components/SidebarItem.vue'
export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  computed: {
    filteredItems: function() {
      if (this.$auth.user.role !== 'admin') {
        return this.items.filter(item => {
          return item.link != 'admin'
        })
      }
      return this.items.filter(item => {
        return item.link != 'settings'
      })
    }
  },
  data() {
    return {
      items: [
        {
          title: 'Dashboard',
          icon: 'fas fa-tachometer-alt',
          link: 'index'
        },
        {
          title: 'Patients',
          icon: 'fas fa-address-card',
          link: 'patients'
        },
        {
          title: 'Mbca',
          icon: 'fas fa-notes-medical',
          link: 'mbca'
        },
        {
          title: 'BodPod',
          icon: 'fas fa-notes-medical',
          link: 'bodpod'
        },
        {
          title: 'Customfield',
          icon: 'fas fa-keyboard',
          link: 'customfields'
        },
        {
          title: 'Settings',
          icon: 'fas fa-tools',
          link: 'settings'
        },
        {
          title: 'Settings',
          icon: 'fas fa-tools',
          link: 'admin'
        }
      ]
    }
  }
}
</script>

<style>
.sidebar-h {
  min-height: 92vh;
  overflow: hidden;
}
</style>
