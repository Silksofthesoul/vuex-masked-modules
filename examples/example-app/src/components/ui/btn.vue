<template>
  <button
  :class="$style.btn"
  @click="push"
  ><slot></slot></button>
</template>
<script>
export default {
  name: 'btn',
  methods: {
    push() {
      this.$emit('push');
    }
  }
}
</script>
<style lang="less" module>
  .btn {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background-color: #ccc;
  }
</style>
