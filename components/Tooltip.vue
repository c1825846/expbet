<template>
<div class="tooltip" :id="id">
  <div class="tooltip__icon" @click="toggleTooltip">
    i
    <div class="tooltip__body" v-show="isTooltipOpened">
      <slot></slot>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Tooltip',
  data () {
    return {
      isTooltipOpened: false,
      id: 0,
    }
  },
  methods: {
    toggleTooltip() {
      this.isTooltipOpened = !this.isTooltipOpened
    },
    closeTooltip() {
      this.isTooltipOpened = false
    },
    handleClickOutside(event) {
      if (event.target.closest(`.tooltip`)?.id !== this.id || this.isResultListOpened && !(event.target.classList.contains('tooltip__body')) ) {
        this.closeTooltip()
      }
    },
  },
  mounted() {
    this.id = String(Math.random()).split('.')[1]
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },
}
</script>

<style lang="scss" scoped>
.tooltip{
  display: inline-grid;
  &__icon {
    position: relative;
    border: 1px solid $color-gray;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
  }
  &__body {
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    border: 1px solid $color-gray;
    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, .7);
    background: $color-white;
    border-radius: 10px;
    padding: 10px;
    width: 250px;
    font-size: 14px;
    z-index: 2;
    text-align: left;
  }
}
</style>
