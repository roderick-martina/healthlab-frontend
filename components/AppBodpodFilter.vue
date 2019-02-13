<template>
  <div class="border rounded-lg bg-white">
    <div
      class="bg-app-dark-blue rounded-tr rounded-tl h-10 text-white flex flex-col justify-center pl-6 text-bold"
    >
      <span class="font-bold">Filters</span>
    </div>
    <div class="mx-6">
      <div class="flex flex col mt-2">
        <label class="font-bold">Gender</label>
      </div>
      <div class="flex py-2 mb-1">
        <input type="radio" id="1" value="Male" v-model="filter.gender" name="gender">
        <label for="1" class="ml-2">Male</label>
        <input
          type="radio"
          id="2"
          name="gender"
          v-model="filter.gender"
          value="Female"
          class="ml-4"
        >
        <label for="2" class="ml-2">Female</label>
        <input type="radio" id="3" name="gender" v-model="filter.gender" value="Both" class="ml-4">
        <label for="3" class="ml-2">Both</label>
      </div>
      <div class="border-b"></div>
      <div class="flex flex-col mt-2">
        <label class="font-bold">Age</label>
        <div class="py-2 mb-1">
          <input
            class="h-8 w-16 border rounded pl-5 focus:outline-none"
            placeholder="18"
            v-model="filter.minAge"
          >
          -
          <input
            class="h-8 w-16 border rounded pl-5 focus:outline-none"
            placeholder="90"
            v-model="filter.maxAge"
            :disabled="filter.minAge == ''"
          >
        </div>
      </div>
      <div class="border-b"></div>
      <div class="border-b"></div>
      <div class="flex flex-col mt-2">
        <label class="font-bold">Activities</label>
        <div class="py-2 mb-1">
          <select v-model="filter.activity" class="h-8 border bg-white w-full focus:outline-none">
            <option selected value>Choose activity</option>
            <option
              v-for="(option,index) in activityOptions"
              :key="index"
              :value="option"
            >{{option}}</option>
          </select>
        </div>
      </div>
      <div class="border-b"></div>
      <div class="flex flex-col mt-2">
        <label class="font-bold">Date</label>
        <div class="pt-2">
          <input
            class="h-8 w-64 border rounded pl-5 outline-none"
            type="date"
            v-model="filter.dateCreated"
          >
        </div>
      </div>
    </div>
    <div class="flex justify-center my-4">
      <AppButton
        v-on:clickActivate="applyFilter"
        class="w-full mx-6 bg-app-dark-blue hover:bg-app-green text-white py-3 rounded"
      >
        <template slot="body">Apply Filters</template>
      </AppButton>
    </div>
  </div>
</template>
<script>
import AppButton from '@/components/AppButton.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    AppButton
  },
  props: ['activityOptions', 'ethnicityOptions'],
  data() {
    return {
      filter: {
        gender: null,
        minAge: '',
        maxAge: '',
        dateCreated: null,
        activity: ''
      }
    }
  },
  computed: {
    gender: function() {
      if (this.filter.gender == 'Both') {
        return null
      } else {
        return this.filter.gender
      }
    },
    age: function() {
      if (this.filter.maxAge == null || this.filter.maxAge == '') {
        return this.filter.minAge
      } else {
        return `${this.filter.minAge}-${this.filter.maxAge}`
      }
    },
  },
  methods: {
    applyFilter: function() {
      let paramValues = this.getParams()
      this.$axios
        .get('bodpod', {
          params: paramValues
        })
        .then(res => {
          this.$emit('filter', { data: res, params: paramValues })
        })
        .catch(err => console.log(err))
    },
    getParams: function() {
      let params = {
        age: this.age,
        gender: this.gender,
        activity: this.filter.activity,
        date: this.filter.dateCreated
      }
      return params
    }
  }
}
</script>
<style>
</style>

