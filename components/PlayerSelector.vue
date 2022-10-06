<template>
  <div class="list">
    <div class="show-button button" @click="toggleOpened">
      {{ isOpened ? 'Скрыть игроков' : 'Показать игроков' }}
    </div>
    <div class="" v-if="isOpened">
      <div class="buttons" v-if="this.orderedPlayers">
        <div class="list__button button" @click="selectAll">
          Выбрать всех
        </div>
        <div class="list__button button" @click="removeAll">
          Очистить всех
        </div>
      </div>
      <div
        class="item"
        :class="{'item--selected': selectedPlayers.includes(player)}"
        v-for="(player, index) in orderedPlayers"
      >
        <div class="item__id" v-show="false">
          {{ player._id }}
        </div>
        <div class="item__cell item__number">
          {{ player.number }}
        </div>
        <div class="item__cell item__name">
          <a :href="player.tLink" target="_blank">
            {{
              player.name?.split(' ').length > 1 ? player.name.split(' ')[0][0] + '. ' + player.name.split(' ').slice(1).join(' ') : player.name
            }}
          </a>
        </div>
        <div class="item__cell item__position" v-if="player?.position">
          {{ player.position.match(/[A-Z]/g)?.join('') }}
        </div>
        <div class="item__cell" v-else></div>
        <div class="item__cell item__age">
          {{ calculateAge(new Date(player.age)) }}
        </div>
        <div class="item__cell item__market-value">
          {{ player.marketValue }}
        </div>
        <div
          v-if="player.overallRating"
          class="item__cell item__rating rating"
          :class="{
            'rating-very-low': player.overallRating < 50 && selectedPlayers.find(p => p === player),
            'rating-low': player.overallRating >= 50 && player.overallRating <= 60 && selectedPlayers.find(p => p === player),
            'rating-middle': player.overallRating > 60 && player.overallRating <= 70 && selectedPlayers.find(p => p === player),
            'rating-high': player.overallRating >70 && player.overallRating <= 80 && selectedPlayers.find(p => p === player),
            'rating-very-high': player.overallRating > 80 && selectedPlayers.find(p => p === player),
            }"
        >
          {{ player.overallRating / 10 }}
        </div>
        <div class="item__cell" v-else></div>
        <div
          v-if="validPlayers.includes(player)"
          class="item__cell item__checkbox"
          :class="{'item__checkbox--checked': selectedPlayers.includes(player)}"
          @click="selectPlayer(player)"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerSelector',
  props: {
    allPlayers: Array,
    selectedPlayers: Array,
  },
  data() {
    return {
      isOpened: true,
    }
  },
  computed: {
    validPlayers() {
      return this.allPlayers.filter(p => {
        return p.overallRating
      })
    },
    orderedPlayers() {
      return this.orderPlayers(this.allPlayers)
    },
  },
  methods: {
    selectPlayer(player) {
      if (!this.selectedPlayers.find(p => p === player))
        this.$emit('select', [...this.selectedPlayers, player])
      else
        this.$emit('select', this.selectedPlayers.filter(p => p !== player))
    },
    selectAll() {
      this.$emit('select', this.allPlayers)
    },
    removeAll() {
      this.$emit('select', [])
    },
    deletePlayer(player) {
      this.$emit('select', this.selectedPlayers.filter(p => p !== player))
      this.$emit('delete', player)
    },
    toggleOpened() {
      this.isOpened = !this.isOpened
    },
    windowResizeHandler() {
      let width = document.documentElement.clientWidth
      if (width >= 1400) {
        this.isOpened = true
      }
    },
    orderPlayers(players) {
      return [
        ...players.filter(p => p.position === 'Goalkeeper'),
        ...players.filter(p => p.position.split('-')[1] === 'Back'),
        ...players.filter(p => p.position.split(' ')[1] === 'Midfield'),
        ...players.filter(p => p.position.split(' ')[1] === 'Winger'),
        ...players.filter(p => p.position.split(' ')[1] === 'Striker'),
        ...players.filter(p => p.position.split('-')[1] === 'Forward'),
      ]
    },
    calculateAge(birthday) { // birthday is a date
      const ageDifMs = Date.now() - birthday.getTime()
      const ageDate = new Date(ageDifMs) // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    }
  },
  created() {
    window.addEventListener('resize', this.windowResizeHandler)
  }
  ,
  destroyed() {
    window.removeEventListener('resize', this.windowResizeHandler)
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  margin-bottom: 6px;
}

.list {
  padding: 10px 0;

  &__button {
    font-size: 12px;
    padding: 4px 10px;
    height: auto;
  }
}

.show-button {
  display: none;
  font-size: 14px;
  margin-bottom: 10px;
  @media (max-width: 1399px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.item {
  display: grid;
  grid-template-columns: 16px 1fr 24px 20px 50px 21px 16px;
  gap: 4px;
  padding: 1px 0;
  font-size: 12px;

  &--selected {
    font-weight: 600;
  }

  &__cell {
    padding: 2px;
  }

  &__checkbox {
    border: 1px solid #000;
    height: 16px;
    width: 16px;
    align-self: center;
    position: relative;
    cursor: pointer;

    &--checked {

      &:after {
        position: absolute;
        content: '';
        width: 8px;
        height: 8px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #000;
      }
    }
  }

  &__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__position {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:nth-child(odd) {
    background: $color-gray-light;
  }

}

.rating {

  &-very-low {
    background: #de7070;
  }

  &-low {
    background: #f38f60;
  }

  &-middle {
    background: #eace7a;
  }

  &-high {
    background: #a6cea0;
  }

  &-very-high {
    background: #df92f8;
  }
}
</style>
