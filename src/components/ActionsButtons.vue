<template>
  <div class="actions">
    <button
      class="btn btn__actions mark-read"
      v-if="isInbox"
      @click="toggleRead"
    >
      Mark as read (r)
    </button>
    <button class="btn btn__actions archive" @click="toggleArchive">
      {{ archiveText }} (a)
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: { ids: Array },
  computed: {
    ...mapGetters(["inboxMails", "archivedMails"]),
    currentPage() {
      return this.$route.name;
    },
    isInbox() {
      return this.currentPage === "inbox";
    },
    mails() {
      return this.isInbox ? this.inboxMails : this.archivedMails;
    },
    allMarked() {
      return this.ids.length && this.ids.length === this.mails.length;
    },
    archiveText() {
      return this.isInbox ? "Archive" : "Unarchive";
    },
  },
  created() {
    document.addEventListener("keypress", this.handleKeyPress);
  },
  destroyed() {
    document.removeEventListener("keypress", this.handleKeyPress);
  },
  methods: {
    handleKeyPress(e) {
      if (e.key === "r") {
        this.toggleRead();
      }
      if (e.key === "a") {
        this.toggleArchive();
      }
    },
    toggleSelectAll() {
      if (this.allMarked) this.ids.splice(0);
      else {
        this.mails.forEach((mail) => {
          if (this.ids.includes(mail.id)) return;
          else this.ids.push(mail.id);
        });
      }
    },
    toggleSelect(mailId) {
      const alreadyids = this.ids.findIndex((id) => id === mailId);
      if (alreadyids !== -1) {
        this.ids = this.ids.filter((id) => id !== mailId);
      } else this.ids.push(mailId);
    },
    toggleArchive() {
      this.ids.forEach((maild) => {
        const action = this.isInbox ? "addToArchive" : "removeFromArchive";
        this.$store.dispatch(action, maild);
      });
      this.ids.splice(0);
    },
    toggleRead() {
      this.ids.forEach((mailId) => {
        this.$store.dispatch("markAsRead", mailId);
      });
      this.ids.splice(0);
    },
    openMail(emailId) {
      this.$store.dispatch("openMail", emailId);
    },
  },
};
</script>

<style scoped>
.actions {
  margin: 2rem 0;
}

.btn__actions {
  background: #f9f9f9;
  border: 1px solid #777;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-inline: 1rem;
}
</style>
