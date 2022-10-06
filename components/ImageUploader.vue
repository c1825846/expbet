<template>
  <div class="uploader">
    <div class="preview" v-if="showPreview">
      <img :src="`/uploads/${imagePath}`" alt="">
    </div>
    <input type="file" @change="handleSelectImage">
  </div>
</template>

<script>
export default {
  name: "imageUploader",
  data() {
    return {
      imagePath: null,
      showPreview: false,
    }
  },
  methods: {
    async handleSelectImage(e) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      try {
        this.showPreview = false
        const response = await this.$api.$post('/api/upload', formData)
        this.imagePath = response.filePath
        this.$nextTick(() => {
          this.showPreview = true
        })
        this.$emit('upload', this.imagePath)
      } catch (e) {

      }

    }
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  border: 1px dashed $color-gray;
  max-width: 300px;
}
.preview {

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
