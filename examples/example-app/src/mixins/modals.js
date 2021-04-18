import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
  methods: {
    ...mapMutations({
      show: 'Modal/show',
      hide: 'Modal/hide',
      testModule: 'MMM/test'
    }),
  },
  computed: {
    ...mapState('Modal', {
      modals: ({modals}) => modals,
      helloWorld: ({helloWorld}) => helloWorld
    }),
    ...mapGetters({
      isShowThis: 'Modal/isShowThis'
    })
  }
};
