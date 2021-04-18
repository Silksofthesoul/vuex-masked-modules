<template>
  <row> Sign Up Form </row>
  <row>
    <btn @push="confirm">Sign up</btn>
    <btn @push="cancel">Cancel</btn>
  </row>
</template>
<script>

// components
import row from '@cmp/html/row.vue';
import btn from '@cmp/ui/btn.vue';
import modalMixin from '@/mixins/modals';

export default {
  name: 'signup',
  data() {
    return { };
  },
  mixins: [modalMixin],
  created() { },
  methods: {
    confirm() { this.$emit('confirm', {abc: 123}); },
    cancel() { this.$emit('close'); }
  },
  components: {
    row,
    btn,
  }
};
</script>
