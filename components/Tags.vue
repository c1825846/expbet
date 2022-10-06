<template>
  <div class="tags">
    <div class="tags__list">
      <div class="tag" v-for="tag in value">
        <div class="tag__text">
          {{ tag }}
        </div>
        <div class="tag__delete" @click="deleteTag(tag)">
          &times;
        </div>
      </div>
    </div>
    <input type="text" class="tags__input input" v-model="inputValue" @keydown.enter="addTag(inputValue)">
  </div>
</template>

<script>
export default {
  name: "Tags",
  props: {
    value: Array,
  },
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    addTag(tag) {
      this.$emit('input', [...this.value, tag])
      this.inputValue = ''
    },
    deleteTag(tag) {
      this.$emit('input', this.value.filter(t => t !== tag))
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  padding: 10px 0;
  &__input {
    font-size: 16px;
  }
  &__list {
    display: flex;
    gap: 10px;
    margin-bottom: 6px;
  }
}

.tag {
  display: flex;
  gap: 2px;
  padding: 2px 4px;
  border: 1px solid $color-gray;
  &__delete {
    cursor: pointer;
  }
}
</style>
