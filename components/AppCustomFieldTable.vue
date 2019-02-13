<template>
  <div class="mt-5 w-full flex flex-wrap border rounded shadow bg-white px-5">
    <div
      v-for="(result,index) in results"
      :key="index"
      class="w-1/3 h-10 my-3 flex cursor-pointer"
      @click="showDeleteModal(result)"
    >
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">{{result.custom_field.field_name}}:</span>
        <span class="font-bold">Date:</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.value}}</span>
        <span>{{result.created_at}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['results'],
  data() {
    return {
      deleteHover: false
    }
  },
  methods: {
    showDeleteModal: function(result) {
      this.$modal.show('dialog', {
        title: 'Delete',
        text: `Are you sure you want to delete <b>${
          result.custom_field.field_name
        } : ${result.value}</b> result!`,
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
              this.deletePatientCustomField(result.id)
            }
          }
        ]
      })
    },
    deletePatientCustomField: function(id) {
      this.$axios.delete(`patients/customfields/${id}`)
        .then(res => {
          window.location.reload(true)
        })
        .catch(err => {
          alert("Something when't wrong deleting the patient customfield result.")
          console.dir(err)
        })
    }
  }
}
</script>

<style>
</style>
