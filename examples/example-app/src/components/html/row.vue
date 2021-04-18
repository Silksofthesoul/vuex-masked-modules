<template>
  <div :class="$style.row"><slot></slot></div>
</template>
<script type="text/javascript">
  export default {
    name: 'row'
  }
</script>
<style lang="less" module>
  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
  }
</style>
