<template>
  <div class="post">
    <div class="post__form">
      <div class="post__item">
        <div class="post__menu">
          <button class="post__button button" @click="savePost">Сохранить</button>
        </div>
      </div>
      <div class="post__item">
        <label class="post__label">Название</label>
        <input type="text" class="post__input input" v-model="post.title">
      </div>
      <div class="post__item">
        <label class="post__label">Описание</label>
        <input type="text" class="post__input input" v-model="post.description">
      </div>
      <div class="post__item">
        <label class="post__label">Группа</label>
        <SearchInput :list="groups" v-model="post.group" placeholder="Выберите группу"/>
      </div>
      <div class="post__item">
        <label class="post__label">Теги</label>
        <Tags v-model="post.tags"/>
      </div>
      <div class="post__item">
        <div class="post__image" v-if="post.imagePath">
          <img :src="`/uploads/${post.imagePath}`" alt="">
        </div>
        <ImageUploader @upload="handleUpload($event)"/>
      </div>
      <div class="post__item">
        <label class="post__label">Текст</label>
        <textarea class="post__input post__textarea input" v-model="post.text"></textarea>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  async fetch() {
    if (this.$route.params.id !== 'new')
      this.post = await this.$axios.$get(`/api/post/${this.$route.params.id}`)
  },
  name: "PostEdit",
  middleware: ['blogger'],
  data() {
    return {
      post: {
        title: '',
        description: '',
        tags: [],
        text: '',
        imagePath: '',
        group: '',
      },
      groups: [],
    }
  },
  methods: {
    async savePost() {
      if (this.$route.params.id !== 'new')
        await this.$api.$put(`/api/post/${this.post._id}`, {post: this.post})
      else
        await this.$api.$post(`/api/post/`, {post: this.post})
      this.$router.go(-1)
    },
    handleUpload(e) {
      this.post.imagePath = e
    }
  },
  async beforeMount() {
    const groups = await this.$axios.$get('/api/post/group/all')
    this.groups = groups.map(g => {
      return {name: g.name, value: g._id}
    })
  }
}
</script>

<style lang="scss" scoped>
.post {
  &__form {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__item {
    margin-bottom: 10px;
  }

  &__label {
    display: block;
    margin-bottom: 4px;
  }

  &__image {
    height: 400px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__input {
    font-size: 16px;
  }

  &__textarea {
    resize: vertical;
    width: 100%;
    min-height: 300px;
  }
}
</style>
