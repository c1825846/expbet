<template>
  <div class="app">
    <Header/>
    <main class="main">
      <nuxt/>
    </main>
    <Footer/>
  </div>
</template>

<script>
export default {
  name: "default",
  mounted() {
    if (localStorage.getItem('accessToken')){
      this.$store.dispatch('user/checkAuth')
    }
    if (this.$store.getters['user/accessToken']) {
      localStorage.setItem('accessToken', this.$store.getters['user/accessToken'])
    }
  },
}
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main {
  flex: 1;
  //padding: 20px 0;
}
</style>
