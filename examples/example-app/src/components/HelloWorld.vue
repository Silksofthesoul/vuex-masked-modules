<template>
  <row> Hello {{welcomeText}} </row>
  <modal name="signup">
    <signup
    @close="closeSignup"
    @confirm="confirmSignup"/>
  </modal>
<pre>{{modals}}</pre>
<pre>+{{helloWorld}}+</pre>
  <row>
    <btn @push="showSignUp">Sign up</btn>
  </row>
</template>
<script>

// components
import row from '@cmp/html/row.vue';
import btn from '@cmp/ui/btn.vue';
import modal from '@cmp/ui/modal.vue';
import signup from '@cmp/modals/Auth/signup.vue';

// mixins
import modalMixin from '@/mixins/modals';

export default {
  name: 'HelloWorld',
  data() {
    return {
      welcomeText: 'Friend'
    };
  },
  mixins: [modalMixin],
  created() {
    let slf = this;
    let count = 0;
    const y = _ => {
      if(++count % 2 ===0) slf.testModule('flip');
      else slf.testModule('flop');
      setTimeout(y, 500);
    };
    y();
  },
  methods: {
    showSignUp() { this.show({name: 'signup'}); },
    closeSignup() { this.hide({name: 'signup'}); },
    confirmSignup(ctx) {
      console.log('Hell Yeah', ctx);
      this.closeSignup();
    }
  },
  components: {
    row,
    btn,
    modal,
    signup
  }
};
</script>
