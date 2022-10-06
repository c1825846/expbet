<template>
  <div class="search"
       :id="id"
  >
    <div class="search__input-wrapper">
      <input
        type="text"
        class="search__input"
        :placeholder="placeholder"
        v-model.trim="searchQuery"
        @click="isResultListOpened = true"
        @focus="isResultListOpened = true"
        @keydown.down="nextItem"
        @keydown.up="prevItem"
        @keydown.enter="handleSelect"
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
          :class="{'search__result--current': item === currentItem}"
          v-for="(item, index) in listToShow"
          @click="handleSelect"
          @mousemove="makeCurrent(index)"
        >
          {{ item[fieldToShow] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    endpoint: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    fieldToShow: {
      type: String,
    },
    fieldToSearch: {
      type: String,
    },
    field2ToSearch: {
      type: String,
    },
    filter: {
      type: Object,
    }
  },
  computed: {
    listToShow() {
      return this.searchQuery ? this.list.filter(item => {
        return item[this.fieldToSearch].toLowerCase().includes(this.searchQuery.toLowerCase()) ||
               item[this.field2ToSearch]?.toLowerCase().includes(this.searchQuery.toLowerCase())
      }) : this.list
    },
    currentItem() {
      return this.listToShow[this.currentIndex]
    },
    queryFilter() {
      let query = ''
      if (this.filter) {
        query = '/?'
        Object.entries(this.filter).forEach(([k, v]) => {
          query += `${k}=${v}`
        })
      }
      return query
    }
  },
  data() {
    return {
      isResultListOpened: false,
      searchQuery: '',
      currentIndex: 0,
      id: 0,
      timerId: null,
      list: [],
    }
  },
  methods: {
    handleSelect() {
      this.$emit('select', this.currentItem)
      this.searchQuery = ''
      this.closeResults()
    },
    closeResults() {
      this.isResultListOpened = false
      this.currentIndex = 0
    },
    handleClickOutside(event) {
      if (event.target.closest(`.search`)?.id !== this.id || this.isResultListOpened && !(event.target.classList.contains('search__input') || event.target.classList.contains('search__results'))) {
        this.closeResults()
      }
    },
    prevItem() {
      this.currentIndex = this.currentIndex === 0 ? this.listToShow.length - 1 : this.currentIndex - 1
    },
    nextItem() {
      this.currentIndex = this.currentIndex === this.listToShow.length - 1 ? 0 : this.currentIndex + 1
    },
    makeCurrent(index) {
      this.currentIndex = index
    }
  },
  async created() {
    this.id = String(Math.random()).split('.')[1]
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  watch: {
    async searchQuery() {
      clearTimeout(this.timerId)
      if (this.searchQuery !== '') {
        this.timerId = setTimeout(async () => {
          this.currentIndex = 0
          this.list = await this.$axios.$get(this.endpoint + '/' + this.searchQuery + this.queryFilter)
          this.isResultListOpened = true
        }, 500)
      } else {
        this.list = []
      }
    },
  }
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

    &--current {
      background: $color-gray-light;
    }
  }
}
</style>
