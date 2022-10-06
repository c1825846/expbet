<template>
  <div class="admin">
    <div class="admin__menu">
      <nuxt-link class="button" to="/admin/parse-player">Парсинг игрока</nuxt-link>
      <nuxt-link class="button" to="/admin/manage-user">Управление пользователями</nuxt-link>
    </div>
    <nuxt-child/>
  </div>
</template>

<script>
export default {
  name: "admin",
  middleware: ['admin'],
  fetch(context){
    console.log(context.req)
  },
}
</script>

<style lang="scss" scoped>
.admin {
  padding: 20px;
}
</style>
