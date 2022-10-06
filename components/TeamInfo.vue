<template>
  <div
    class="info"
    :class="{'info--ltr': ltr}"
  >
    <div class="info__row info__row--title" :style="'color:' + color">
      {{ this.name }}
    </div>
    <div class="" v-if="ltr">
      <div class="info__row">
        {{ this.defensiveStyle }}
        <div class="info__icon">
          <SvgShieldIcon/>
        </div>
      </div>
      <div class="info__row">
        {{ this.buildUpPlay }}
        <div class="info__icon">
          <SvgSwordIcon/>
        </div>
      </div>
      <div class="info__row">
        {{ this.chanceCreation }}
        <div class="info__icon">
          <SvgBallIcon/>
        </div>
      </div>
    </div>
    <div class="" v-else>
      <div class="info__row">
        <div class="info__icon">
          <SvgShieldIcon/>
        </div>
        {{ this.defensiveStyle }}
      </div>
      <div class="info__row">
        <div class="info__icon">
          <SvgSwordIcon/>
        </div>
        {{ this.buildUpPlay }}
      </div>
      <div class="info__row">
        <div class="info__icon">
          <SvgBallIcon/>
        </div>
        {{ this.chanceCreation }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamInfo",
  components: {},

  props: {
    name: {
      type: String,
      default: 'Название команды',
    },
    defensiveStyle: {
      type: String,
      default: 'Защитный стиль',
    },
    buildUpPlay: {
      type: String,
      default: 'Стиль нападения',
    },
    chanceCreation: {
      type: String,
      default: 'Голевые моменты',
    },
    color: String,
    ltr: Boolean,
  }
}
</script>

<style lang="scss" scoped>
.info {
  &--ltr &__row {
    justify-content: flex-end;
  }

  &__row {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 300;

    &--title {
      margin-bottom: 6px;
      font-weight: 700;
    }
  }

  &__icon {
    margin: 0 4px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
