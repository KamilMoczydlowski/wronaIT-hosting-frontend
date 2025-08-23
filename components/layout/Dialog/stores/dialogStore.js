import { defineStore } from 'pinia';

export const useDialogStore = defineStore('dialog', {
  state: () => ({
    visible: false,
    headerValue: '',
  }),
  getters: {
    getDialogVisibility(state) {
      return state.visible;
    },
  },
  actions: {
    toggleDialogVisibility(value) {
      this.visible = value ?? !this.visible;
    },
  },
});
