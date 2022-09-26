<template>
  <div class="sidebar">
    <div class="top-buttons">
      <button class="btn btn__nav" @click="navigate('/')">
        Inbox ({{ inboxCount }})
      </button>
      <button class="btn btn__nav" @click="navigate('/archive')">
        Archive ({{ archivedCount }})
      </button>
    </div>
    <div class="bottom-button">
      <button class="btn btn__nav">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["inboxCount", "archivedCount"]),
  },
  methods: {
    navigate(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
  width: 25%;
  background: #373636;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
}

.sidebar .top-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn__nav {
  width: 100%;
  background: #f9f9f9;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
</style>
