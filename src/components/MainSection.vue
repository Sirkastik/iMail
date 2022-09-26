<template>
  <main>
    <h3 class="page-name">{{ currentPage }}</h3>
    <h1 class="selected-title">Emails Selected ({{ selected.length }})</h1>
    <div class="allActions">
      <CheckBox :isMarked="allMarked" @click="toggleSelectAll" />
      <ActionsButtons :ids="selected" />
    </div>
    <ul class="mailList">
      <li
        v-for="mail in mails"
        :key="mail.id"
        class="mail"
        :class="{ 'mail--read': mail.read }"
        @click="openMail(mail.id)"
      >
        <CheckBox
          :isMarked="selected.includes(mail.id)"
          @click.stop="toggleSelect(mail.id)"
          class="checkbox"
        />
        <span class="subject">{{ mail.subject }}</span>
      </li>
    </ul>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import CheckBox from "./CheckBox.vue";
import ActionsButtons from "./ActionsButtons.vue";
export default {
  components: { CheckBox, ActionsButtons },
  data() {
    return {
      selected: [],
    };
  },
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
      return Boolean(
        this.selected.length && this.selected.length === this.mails.length
      );
    },
  },
  methods: {
    toggleSelectAll() {
      if (this.allMarked) this.selected.splice(0);
      else {
        this.mails.forEach((mail) => {
          if (this.selected.includes(mail.id)) return;
          else this.selected.push(mail.id);
        });
      }
    },
    toggleSelect(mailId) {
      const alreadySelected = this.selected.findIndex((id) => id === mailId);
      if (alreadySelected !== -1) {
        this.selected = this.selected.filter((id) => id !== mailId);
      } else this.selected.push(mailId);
    },
    openMail(emailId) {
      this.$store.dispatch("openMail", emailId);
    },
  },
};
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
  padding: 2rem;
}

.page-name {
  text-transform: capitalize;
  font-size: 1.25rem;
}

.selected-title {
  font-size: 2rem;
  font-weight: 700;
}

.allActions {
  display: flex;
  padding-left: 1rem;
  align-items: center;
}

.mailList {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mail {
  border: 1px solid #777;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.mail--read {
  opacity: 0.5;
}
</style>
