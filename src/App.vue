<template>
  <div class="wrapper">
    <SideBar />
    <RouterView />
    <EmailModal v-if="showModal" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SideBar from "./components/SideBar.vue";
import EmailModal from "./components/EmailModal.vue";
export default {
  components: { SideBar, EmailModal },
  computed: {
    ...mapGetters(["showModal"]),
  },
};
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>
