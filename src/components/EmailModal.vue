<template>
  <div @click="closeModal" class="modal">
    <div @click.stop="" class="email">
      <button class="btn btn__underlined" @click="closeModal">Close</button>
      <ActionsButtons :ids="[openedEmail.id]" />
      <h1 class="subject">{{ openedEmail.subject }}</h1>
      <p>{{ openedEmail.body }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ActionsButtons from "./ActionsButtons.vue";
export default {
  components: { ActionsButtons },
  computed: {
    ...mapGetters(["openedEmail"]),
  },
  methods: {
    closeModal() {
      this.$store.dispatch("closeMail");
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 40, 0.5);
  z-index: 10;
  overflow: hidden;
}

.email {
  background: white;
  margin-left: auto;
  width: 50%;
  height: 100%;
  padding: 1.5rem;
}

.btn__underlined {
  text-decoration: underline;
}

.subject {
  font-weight: bold;
  font-size: 1.25rem;
  padding-block: 1rem;
}
</style>
