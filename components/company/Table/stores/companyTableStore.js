import { defineStore } from 'pinia';

export const useCompanyTableStore = defineStore('companyTable', {
	state: () => ({
		companies: null,
		expandedRows: {},
		selectedItemId: null,
	}),
	getters: {
		getCompanies(state) {
			return state.companies;
		},
		getExpandedRows(state) {
			return state.expandedRows;
		},
		getItemId(state) {
			return state.selectedItemId;
		},
	},
	actions: {
		setCompanies(value) {
			this.companies = value;
		},
		setExpandedRows(value) {
			this.expandedRows = value;
		},
		setItemID(value) {
			this.selectedItemId = value;
		},
	},
});
