<template>
  <div class="post">
    <div class="post__body">
      <div class="post__meta">
        <div class="post__data">{{ new Date(post.createdDate).toLocaleString('ru', {
          year: 'numeric', month: 'numeric', day: 'numeric',
        }) }}</div>
        <nuxt-link :to="`/posts/edit/${post._id}`" class="post__edit"
                   v-if="$store.getters['user/user']?.roles?.map(r => r.name).includes('blogger')">Редактировать
        </nuxt-link>
      </div>
      <h1 class="post__title">{{ post.title }}</h1>
      <div class="post__tags">
        <div class="post__tag" v-for="tag in post.tags">
          {{ tag }}
        </div>
      </div>
      <div class="post__description">{{ post.description }}</div>
      <div class="post__image">
        <img :src="`/uploads/${post.imagePath}`" alt="">
      </div>
      <MarkdownDisplay class="post__text" :text="post.text"/>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$axios, route}) {
    const post = await $axios.$get(`/api/post/${route.params.id}`)
    return {post}
  },
  name: "Post",
  head() {
    return {
      title: `Expbet - ${this.post.title}`,
      meta: [
        {hid: 'description', name: 'description', content: this.post.description},
        {name: 'keywords', content: ['Прогноз', ...this.post.tags].join(', ')}
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  padding: 20px 20px 0;
  line-height: 1.5;

  &__meta {
    font-size: 12px;
    display: flex;
    gap: 6px;
  }

  &__title {
    font-weight: 700;
    font-size: 32px;
  }

  &__description {
    font-size: 20px;
    margin-bottom: 20px;
  }

  &__body {
    max-width: 900px;
    margin: 0 auto;
  }

  &__image {
    overflow: hidden;
    margin-bottom: 20px;
    height: 400px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>

<style lang="scss">
.post {
  &__tags {
    display: flex;
    gap: 6px;
  }

  &__tag {
    border: 1px solid $color-gray;
    padding: 0 4px;
  }

  &__text {
    p {
    }

    a {
      color: $color-main;
    }

    h2 {
      font-size: 20px;
      font-weight: 700;
    }

    h3 {
      font-size: 24px;
    }

    ul li {
      list-style-position: inside;
      list-style-type: disc;
    }

    ol li {
      list-style-position: inside;
      list-style-type: decimal;
    }

    hr {
      border: none;
      height: 10px;
    }
  }
}
</style>
