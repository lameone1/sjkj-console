<!-- Created by shi.pengyan on 2017-04-04. -->
<template>
  <keep-alive>
    <component :is="currentRouter" :moduleName="title"></component>
  </keep-alive>
</template>

<script type="text/babel">
  import dashboard from './dashboard.vue';

  export default{
    data() {
      return {
        routeName: '',
        currentRouter: '',
        title: ''
      }
    },
    created() {
      this.setCurrent();
    },
    methods: {
      setCurrent() {
        this.routeName = this.$route.params.name;
        this.title = this.$route.query.title;

        if (!this.$store.state.routes) {
          console.warn('dynamic routes not ready!');
          this.currentRouter = dashboard;
          return;
        }
        const component = this.$store.state.routes[this.routeName];

        if (component) {
          console.log('load dynamic component');
          this.currentRouter = component;
        } else {
          console.warn('dynamic component is null, set dashboard by default, plz check');
          this.currentRouter = dashboard;
        }

      }
    }
  }
</script>
