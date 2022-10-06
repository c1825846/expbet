<template>
  <div class="moderator">
    <button class="button" @click="getUsers">req</button>
    <div class="user" v-for="(user, index) in users">
      <div class="">
        {{ index + 1 }}
      </div>
      <div class="">
        {{ user.name }}
      </div>
      <div class="">
        {{ user.email }}
      </div>
      <div class="">
        {{ user.registrationDate.slice(0, 10) }}
      </div>
      <div class="main-color" v-if="user.subscribeUntil">
        {{ user.subscribeUntil.slice(0, 10) }}
      </div>
      <div class="" v-else></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "moderator",
  middleware: ['moderator'],
  data() {
    return {
      users: [],
    }
  },
  methods: {
    async getUsers() {
      this.users = await this.$api.$get('/api/user/all')
    },
  }
}
</script>

<style lang="scss" scoped>
.moderator {
  padding: 20px;
}

.user {
  display: grid;
  grid-template-columns: 20px 1fr 1fr 1fr 1fr;
  justify-content: flex-start;
  grid-gap: 10px;
}

.main-color {
  color: $color-main;
}
</style>
