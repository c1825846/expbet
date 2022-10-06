<template lang="pug">
  .error
    .title.main-title Страница не найдена
    .error-image
      .number 4
      SvgBallIcon.icon(width="90px" height="90px" )
      .number 4
    nuxt-link.link(to="/") На главную
</template>

<script>
export default {
  name: "error"
}
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}
.error-image{
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  font-size: 100px;
  font-weight: 700;
  font-style: italic;
  margin-bottom: 30px;
}
.icon {
  margin-left: 16px;
}
.link {
  font-size: 20px;
}
</style>
