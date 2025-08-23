import { defineStore } from 'pinia';

export const useHostingFormStore = defineStore('hostingForm', {
  state: () => ({
    form: 'create',
  }),
  getters: {
    getFormState(state) {
      return state.form;
    },
  },
  actions: {
    setFormState(value) {
      this.form = value;
    },
  },
});
