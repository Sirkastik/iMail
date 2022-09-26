import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      allEmails: [
        {
          id: 1,
          subject: "Your 7-figure plan goes bye-bye at midnight",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          read: false,
          archived: false,
        },
        {
          id: 2,
          subject: "[WEEKEND ONLY] Get this NOW before",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          read: false,
          archived: false,
        },
        {
          id: 3,
          subject: "Uh-oh your prescription is expiring",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          read: true,
          archived: false,
        },
      ],
      openEmailId: null,
    };
  },
  mutations: {
    archiveMail(state, mailId) {
      const mailToBeArchived = state.allEmails.find(
        (mail) => mail.id === mailId
      );
      const mailIndex = state.allEmails.findIndex((mail) => mail.id == mailId);
      state.allEmails = state.allEmails.filter((mail) => mail.id !== mailId);
      state.allEmails.splice(mailIndex, 0, {
        ...mailToBeArchived,
        archived: true,
      });
    },
    unArchiveMail(state, mailId) {
      const mailToBeUnArchived = state.allEmails.find(
        (mail) => mail.id === mailId
      );
      const mailIndex = state.allEmails.findIndex((mail) => mail.id == mailId);
      state.allEmails = state.allEmails.filter((mail) => mail.id !== mailId);
      state.allEmails.splice(mailIndex, 0, {
        ...mailToBeUnArchived,
        archived: false,
      });
    },
    setRead(state, mailId) {
      const mailToBeRead = state.allEmails.find(
        (mail) => mail.id === mailId
      );
      const mailIndex = state.allEmails.findIndex((mail) => mail.id == mailId);
      state.allEmails = state.allEmails.filter((mail) => mail.id !== mailId);
      state.allEmails.splice(mailIndex, 0, {
        ...mailToBeRead,
        read: true,
      });
    },
    setOpenEmailId(state, mailId) {
      state.openEmailId = mailId;
    },
  },
  actions: {
    addToArchive({ commit }, mailId) {
      commit("archiveMail", mailId);
    },
    removeFromArchive({ commit }, mailId) {
      commit("unArchiveMail", mailId);
    },
    markAsRead({ commit }, mailId) {
      commit("setRead", mailId);
    },
    openMail({ commit }, mailId) {
      commit("setOpenEmailId", mailId);
      commit("setRead", mailId);
    },
    closeMail({ commit }) {
      commit("setOpenEmailId", null);
    },
  },
  getters: {
    inboxCount(state) {
      return state.allEmails.filter((email) => !email.archived).length;
    },
    archivedCount(state) {
      return state.allEmails.filter((email) => email.archived).length;
    },
    inboxMails(state) {
      return state.allEmails.filter((email) => !email.archived);
    },
    archivedMails(state) {
      return state.allEmails.filter((email) => email.archived);
    },
    showModal(state) {
      return Boolean(state.openEmailId);
    },
    openedEmail(state) {
      return state.allEmails.find((email) => email.id === state.openEmailId);
    },
  },
});

export default store;
