<template>
  <div class="border-b border-grey-lightest cursor-pointer" @click="navigate(item.link)">
    <div class="w-3/5 mx-auto h-16 flex flex-col justify-center">
      <ul class="list-reset flex text-white text-xl">
        <li>
          <i :class="item.icon"></i>
        </li>
        <li class="pl-4">{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    navigate: function(link) {
      this.$router.push({ name: link })
    }
  }
}
</script>

<style>
</style>
