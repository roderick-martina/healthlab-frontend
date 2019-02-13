<template>
    <button @click="click" class=" shadow  rounded px-3 py-2 no-outline">
        <slot name="icon"></slot>
        <slot name="body"></slot>
    </button>
</template>

<script>
export default {
    methods:{
        click:function() {
            this.$emit('clickActivate')
        }
    }
}
</script>

<style lang="scss">
.no-outline:focus{
      outline:none;
}
</style>
