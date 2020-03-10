<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{uploadedUrl}}</p>
    <ImageUpload @uploaded="uploadedImage"/>
  </div>
</template>

<script>
import ImageUpload from '@/components/ImageUpload'
export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      uploadedUrl: "empty"
    }
  },
  methods: {
    uploadedImage(value) {
      this.uploadedUrl = value;
    }
  }
}
</script>