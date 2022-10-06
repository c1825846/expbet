<template>
  <div class="search"
       :id="id"
  >
    <div class="search__input-wrapper">
      <input
        type="text"
        class="search__input"
        :class="{'search__input--selected': value}"
        v-model.trim="searchQuery"
        :placeholder="value?.name || placeholder"
        @click="isResultListOpened = true"
        @focus="isResultListOpened = true"
      >
      <div class="search__results" v-if="isResultListOpened">
        <div
          class="search__result"
          v-if="listToShow.length < 1"
        >
          Ничего не найдено
        </div>
        <div
          v-else
          class="search__result"
          v-for="(item, index) in listToShow"
          @click="handleSelect(item.value)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchInputNew",
  props: {
    list: {
      type: Array,
      required: true,
    },
    value: null,
    placeholder: String
  },
  computed: {
    listToShow() {
      return this.searchQuery ? this.list.filter(item => {
        return item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      }).sort(this.compareNames) : this.list.sort(this.compareNames)
    },
  },
  data() {
    return {
      isResultListOpened: false,
      searchQuery: '',
      id: 0,
    }
  },
  methods: {
    handleSelect(value) {
      this.$emit('input', value)
      this.closeResults()
      this.searchQuery = ''
    },
    closeResults() {
      this.isResultListOpened = false
    },
    handleClickOutside(event) {
      if (event.target.closest(`.search`)?.id !== this.id || this.isResultListOpened && !(event.target.classList.contains('search__input') || event.target.classList.contains('search__results'))) {
        this.closeResults()
      }
    },
    compareNames(a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    }
  },
  created() {
    this.id = String(Math.random()).split('.')[1]
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },
}
</script>

<style lang="scss" scoped>
.search {
  &__input {
    width: 100%;
    padding: 4px 10px;
    border: 1px solid $color-gray-dark;
    font-size: 14px;
    outline: none;

    &--selected {
      &::placeholder {
        color: $color-black;
      }
    }

    &:focus {
      outline: 1px solid $color-gray-dark;
    }

    &-wrapper {
      position: relative;
    }
  }

  &__results {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 2;
    border: 1px solid $color-gray-dark;
    border-top: none;
    max-height: 60vh;
    overflow: auto;
    font-size: 14px;
  }

  &__input:focus + &__results {
    outline: 1px solid $color-gray-dark;
  }

  &__result {
    padding: 4px 10px;
    cursor: pointer;
    font-size: 12px;

    &:nth-child(odd) {
      background: $color-gray-light;
    }

    &:hover {
      background: $color-gray;
    }

    &--current {
      background: $color-gray-light;
    }
  }
}
</style>
