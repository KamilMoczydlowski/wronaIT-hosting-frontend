import { defineStore } from 'pinia';

export const useCompanyFormStore = defineStore('companyForm', {
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
