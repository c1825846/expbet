<template>
  <div class="groups">
    <div class="groups__list">
      <div class="groups__item item" v-for="group in groups">
        <div class="item__text">
          {{ group.name }}
        </div>
        <div class="item__delete" @click="deleteGroup(group._id)">&times;</div>
      </div>
    </div>
    <input type="text" class="groups__input input" v-model.trim="inputValue" @keydown.enter="addGroup">
  </div>
</template>

<script>
export default {
  name: "groups",
  middleware: ['blogger'],
  async asyncData({$api}) {
    const groups = await $api.$get('/api/post/group/all')
    return {groups}
  },
  data() {
    return {
      groups: [],
      inputValue: '',
    }
  },
  methods: {
    async addGroup(){
      await this.$api.$post('/api/post/group', {name: this.inputValue})
      this.inputValue = ''
      await this.refreshGroups()
    },
    async deleteGroup(id) {
      await this.$api.$delete(`/api/post/group/${id}`)
      await this.refreshGroups()
    },
    async refreshGroups(){
      this.groups = await this.$api.$get('/api/post/group/all')
    }
  }
}
</script>

<style lang="scss" scoped>
.groups {
  padding: 20px 20px 0;
  max-width: 400px;
  &__list{
    margin-bottom: 8px;
  }
}
.item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 2px 0;
  &__text {
    flex: 1;
  }
  &__delete {
    cursor: pointer;
  }
}
</style>
