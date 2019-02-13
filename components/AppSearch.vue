<template>
  <form @submit.prevent="search" class="rounded bg-white shadow py-3 px-2 flex">
    <span>
      <i class="fas fa-search px-2 text-app-dark-blue"></i>
    </span>
    <input @keyup.enter="search" v-model="query" class="outline-none w-full" type="search" :placeholder="placeholder">
  </form>
</template>

<script>
export default {
    props: ['placeholder'],
    data() {
        return {
            query: ''
        }
    },
    methods: {
        search: function() {
             this.$emit('enterActivate',this.query)
        }
    }
}
</script>

<style>
</style>
