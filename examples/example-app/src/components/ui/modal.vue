<template>
  <div
  v-if="isShow"
  :class="$style.modalWrapper">
  <div :class="$style.closeCover" @click="close"></div>
  <div :class="$style.modalBody">
    <slot></slot>
  </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modals';

export default {
  name: 'modal',
  mixins: [modalMixin],
  props: ['name'],
  data() { return { }; },
  methods: {
    close() {
      const {name} = this.$props;
      this.hide({name});
    },
    fixBody() { document.body.style.overflow = 'hidden'; },
    unfixBody() { document.body.style.overflow = 'auto'; }
  },
  watch: {
    isShow(val) {
      if(val) this.fixBody();
      else this.unfixBody();
    }
  },
  computed: {
    isShow() {
      const {name} = this.$props;
      const {isShowThis} = this;
      return isShowThis({name});
    }
  }
};
</script>
<style lang="less" module>
  .modalWrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;

    width: 100%;
    height: 100%;

    overflow-y: hidden;

    position: fixed;
    top: 0;
    left: 0;

    background-color: rgb(0 8 29 / 64%);

    .modalBody {
      position: relative;
      background-color: #fff;
      height: 50vh;
      min-height: min(100%, 256px);

      max-width: ~'clamp(256px, 20vw, 50vw)';
      min-width: 256px;

      overflow-y: auto;

    }
    .closeCover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: fade(red, 0%);
    }

  }
</style>
