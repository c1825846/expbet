<template>
<div class="player-finder">
  <div class="player-finder__title">
    Добавить игрока
  </div>
  <AsyncSearchInput
    class="player-finder__input"
    endpoint="/api/players"
    placeholder="Начните вводить для поиска"
    field-to-show="name"
    field-to-search="fullName"
    field2-to-search="name"
    @select="handleSelect($event)"
  />
</div>
</template>

<script>
export default {
  name: "PlayerFinder",
  data() {
    return {
      players: [],
    }
  },
  methods: {
    handleSelect(player) {
      this.$emit('select', player)
    }
  }
}
</script>

<style lang="scss" scoped>
.player-finder {
  &__title{
    font-size: 14px;
  }
}
</style>
