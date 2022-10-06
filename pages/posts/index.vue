<template>
  <div class="posts">
    <h1 class="main-title posts__title">Прогнозы на футбол</h1>
    <div class="posts__menu" v-if="$store.getters['user/user']?.roles?.map(r => r.name).includes('blogger')">
      <nuxt-link
        to="/posts/edit/new"
        class="post__button button"
      >Новый пост
      </nuxt-link>
      <nuxt-link
        to="/posts/groups"
        class="post__button button"
      >Группы
      </nuxt-link>
    </div>
    <div class="posts__body">
      <div class="posts__group-filter">
        <div class="posts__group" :class="{'posts__group--selected': selectedGroup === ''}" @click="selectGroup('')">
          Все посты
        </div>
        <div class="posts__group" :class="{'posts__group--selected': group._id === selectedGroup}"
             v-for="group in groups" @click="selectGroup(group._id)">
          {{ group.name }}
        </div>
      </div>
      <div class="posts__list">
        <nuxt-link :to="`/posts/${post._id}`" class="post" v-for="post in posts" :key="post._id">
          <div class="post__image">
            <img :src="`/uploads/${post.imagePath}`" alt="">
          </div>
          <div class="post__body">
            <div class="post__meta">
              <div class="post__date">{{
                  new Date(post.createdDate).toLocaleString('ru', {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                  })
                }}
              </div>
              <div class="post__tag" v-for="tag in post.tags">
                {{ tag }}
              </div>
            </div>
            <h2 class="post__title">{{ post.title }}</h2>
            <div class="post__description">{{ post.description }}</div>
            <div class="post__buttons">
              <div class="post__button">
                Читать далее
              </div>
            </div>
          </div>
        </nuxt-link>
        <div class="post__pagination pagination">
          <div class="pagination__button pagination__button-prev" @click="prevPage">пред</div>
          <div class="pagination__button pagination__button-next" @click="nextPage">след</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$axios}) {
    const postsPerPage = 3
    const posts = await $axios.$get(`/api/post/all?skip=0&limit=${postsPerPage}`)
    const groups = await $axios.$get('/api/post/group/all')
    return {posts, groups, postsPerPage}
  },
  name: "index",
  middleware: ['admin'],
  head() {
    return {
      title: `Прогнозы на футбол на сегодня от профессионалов`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Здесь Вы найдёте прогнозы на футбол на сегодня. Наша команда профессионалов ежедневно и бесплатно публикует прогнозы на футбол с высокой проходимостью. Каждый прогноз подкреплён разбором с помощью нашего инструмента для анализа.'
        },
        {
          name: 'keywords',
          content: 'Прогнозы футбол, прогнозы на футбол на сегодня, прогнозы на футбол от профессионалов, прогноз футбол на сегодня от профессионалов, бесплатный прогнозы на футбол, точные прогнозы на футбол, футбол разбор, разборы матчей футбол, футбол разбор по составу, анализ футбола, футбол прогноз на анализе'
        }
      ],
    }
  },
  data() {
    return {
      posts: [],
      selectedGroup: '',
      skipPosts: 0,
    }
  },
  methods: {
    async selectGroup(group) {
      this.selectedGroup = group
      this.posts = await this.$axios.$get(`/api/post/all?group=${this.selectedGroup}&skip=${this.skipPosts}&limit=${this.postsPerPage}`)
      // if (group !== '') {
      //
      // } else {
      //   this.posts = await this.$axios.$get(`/api/post/all`)
      // }
    },
    async prevPage() {
      this.skipPosts -= this.postsPerPage
      this.skipPosts = this.skipPosts < 0 ? 0 : this.skipPosts
      this.posts = await this.$axios.$get(`/api/post/all?group=${this.selectedGroup}&skip=${this.skipPosts}&limit=${this.postsPerPage}`)
    },
    async nextPage() {
      this.skipPosts += this.postsPerPage
      this.posts = await this.$axios.$get(`/api/post/all?group=${this.selectedGroup}&skip=${this.skipPosts}&limit=${this.postsPerPage}`)
    },
  }
}
</script>

<style lang="scss" scoped>
.posts {
  padding: 20px 20px;
  max-width: 1200px;
  margin: 0 auto;

  &__menu {
    padding: 10px 0;
  }

  &__body {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
    @media (min-width: 1024px) {
      grid-template-columns: 300px 1fr;
    }
  }

  &__group-filter {

  }

  &__group {
    background: $color-gray-light;
    padding: 10px;
    margin: 1px 0;
    cursor: pointer;

    &--selected {
      background: $color-gray;
    }
  }

  &__list {
    display: grid;
    grid-gap: 6px;
  }
}

.post {
  border: 1px solid $color-gray;
  display: grid;
  grid-template-columns: 1fr;
  height: 360px;
  flex-direction: column;

  &__image {
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__body {
    padding: 10px;
    line-height: 1.3;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__meta {
    font-size: 12px;
    display: flex;
    gap: 3px;
    align-items: center;
  }

  &__title {
    font-weight: 700;
    font-size: 20px;
  }

  &__description {
    flex: 1;
    overflow: hidden;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
  }
  @media (min-width: 768px) {
    height: 160px;
    grid-template-columns: 300px 1fr;
  }
}
</style>
