<template>
  <div class="user">
    <div class="user__name">
      {{ user.name }}
    </div>
    <div class="user__subscription" v-if="user.subscribeUntil">
      Подписка действительна до {{ new Date(user.subscribeUntil).toLocaleString('ru', {
      year: 'numeric', month: 'numeric', day: 'numeric'
    }) }}
    </div>
    <div class="user__subscription" v-else>
      Нет активной подписки
    </div>
    <div class="user__buttons">
      <div class="user__button">
        <div class="user__subscription-button button button--primary" @click="fullSubscription">
          {{ user.subscribeUntil ? 'Продлить подписку на месяц' : 'Оформить подписку на месяц' }}
        </div> - 3000 р.
      </div>
      <div class="user__button">
        <div class="user__subscription-button button button--primary" @click="shortSubscription">
          {{ user.subscribeUntil ? 'Продлить подписку на два дня' : 'Оформить подписку на два дня' }}
        </div> - 300 р.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      user: {},
    }
  },
  methods: {
    async fullSubscription() {
      const result = await this.$api.$get('/api/payment/full-subscription')
      window.location.href = result.link
    },
    async shortSubscription() {
      const result = await this.$api.$get('/api/payment/short-subscription')
      window.location.href = result.link
    },
  },
  async mounted() {
    this.user = await this.$api.$get('/api/user/me')
  }
}
</script>

<style lang="scss" scoped>
.user {
  padding: 20px 20px 0;

  &__name {
    font-size: 30px;
    margin-bottom: 20px;
  }

  &__subscription {
    font-size: 18px;
    margin-bottom: 10px;

    span {
      font-size: 24px;
    }
  }

  &__button {
    margin-bottom: 10px;
  }

  &__ref {
    display: flex;
    align-items: center;
    gap: 4px;

    &-link {
      padding: 10px 4px;
      border: 1px solid $color-main;
      cursor: pointer;

      &--copied {
        border: 1px solid $color-second;
      }
    }
  }
}
</style>
