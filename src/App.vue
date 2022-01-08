<template>
  <div>
    <TheContent />
    <BaseToastMessage />
    <BasePopup />
    <BaseLoading />
  </div>
</template>

<script>
import TheContent from "./components/layout/TheContent.vue";
import BasePopup from "./components/base/BasePopup.vue";
import BaseToastMessage from "./components/base/BaseToastMessage.vue";
import BaseLoading from "./components/base/BaseLoading.vue";

export default {
  name: "App",

  components: {
    TheContent,
    BasePopup,
    BaseToastMessage,
    BaseLoading
  },

};
</script>

<style>
@import url("./styles/main.css");
</style>