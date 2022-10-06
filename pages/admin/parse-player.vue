<template>
  <div class="parser">
    <div class="result-message">
      {{ resultMessage }}
    </div>
    <div class="form">
      <label class="label">id игрока</label>
      <input type="text" class="input" v-model.trim="parseParams.playerId">
      <label class="label">Ссылка</label>
      <input type="text" class="input" v-model.trim="parseParams.sLink">
      <button class="button" @click="parsePlayer">Начать</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'parse-player',
  data() {
    return {
      parseParams: {
        playerId: '',
        sLink: '',
      },
      resultMessage: '',
    }
  },
  methods: {
    async parsePlayer(playerId, sLink) {
      this.resultMessage = 'parsing'
      const res = await this.$api.$post('/api/parser/parse-s-player', this.parseParams)
      this.resultMessage = res.message
      this.clearParseParams()
    },
    clearParseParams() {
      this.parseParams = {
        playerId: '',
        sLink: '',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.result-message {
  padding: 10px;
}

.form {
  max-width: 420px;
}

.input {
  margin-bottom: 10px;
}
</style>
