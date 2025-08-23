<template>
	<Toolbar
		:pt="{
			root: { class: 'mb-4 !bg-white !text-zinc-800 !border-zinc-300' },
		}"
	>
		<template #start>
			<h1>Panel do hostingów</h1>
		</template>
		<template #center>
			<div class="flex flex-wrap justify-end gap-2">
				<Button
					icon="pi pi-plus"
					label="Rozwiń"
					size="small"
					variant="text"
					raised
					:pt="{
						root: {
							class: '!text-zinc-800',
						},
					}"
					@click="expandAll"
				/>
				<Button
					icon="pi pi-minus"
					label="Zwiń"
					size="small"
					variant="text"
					raised
					:pt="{
						root: {
							class: '!text-zinc-800',
						},
					}"
					@click="collapseAll"
				/>
			</div>
		</template>
		<template #end>
			<Button
				icon="pi pi-plus"
				size="normal"
				variant="text"
				raised
				rounded
				aria-haspopup="true"
				aria-controls="overlay_menu"
				@click="toggleMenu"
			/>
			<Menu
				id="overlay_menu"
				ref="menuVisibility"
				:model="items"
				:popup="true"
			/>
		</template>
	</Toolbar>
</template>

<script setup>
import { useCompanyTableStore } from '../../company/Table/stores/companyTableStore';
import { useDialogStore } from '../Dialog/stores/dialogStore';

const companyTableStore = useCompanyTableStore();
const dialogStore = useDialogStore();

const menuVisibility = ref();
const companies = computed(() => companyTableStore.getCompanies);

const toggleMenu = event => {
	menuVisibility.value.toggle(event);
};

const expandAll = () => {
	const rows = companies.value.reduce((acc, p) => (acc[p.id] = true) && acc, {});

	companyTableStore.setExpandedRows(rows);
};
const collapseAll = () => {
	companyTableStore.setExpandedRows(null);
};

const openModal = async contentName => {
	if (contentName === 'create-company' || contentName === 'create-hosting') {
		resetValues();
	}
	if (contentName === 'edit-company') {
		const item = await $fetch(
			`${strapiLocalUrl}/api/companies/${selectedItemId.value}`
		);
		initialValues.name = item.data.name;
		initialValues.nip = item.data.nip;
	}
	if (contentName === 'edit-hosting') {
		const item = await $fetch(
			`${strapiLocalUrl}/api/hostings/${selectedItemId.value}`
		);
		initialValues.name = item.data.name;
		initialValues.dateTo = item.data.to;
		// ifs to rest of data
	}
	visible.value = true;
	modalContent.value = contentName;

	switch (contentName) {
		case 'create-company':
			modalHeader.value = 'Wprowadź dane nowej firmy';
			break;
		case 'create-hosting':
			modalHeader.value = 'Wprowadź dane nowego hostingu';
			break;
		case 'edit-company':
			modalHeader.value = 'Edytuj dane firmy';
			break;
		case 'edit-hosting':
			modalHeader.value = 'Edytuj dane hostingu';
			break;
		case 'delete-company':
			modalHeader.value = 'Czy na pewno chcesz usunąć dane firmy?';
			break;
		case 'delete-hosting':
			modalHeader.value = 'Czy na pewno chcesz usunąć dane hostingu?';
			break;

		default:
			break;
	}
};

// const closeModal = () => {
// 	visible.value = false;
// 	resetValues();
// };

const items = ref([
	{
		label: 'Dodaj',
		items: [
			{
				label: 'Nowa firma',
				icon: 'pi pi-plus',
				command: () => {
					openModal('create-company');
				},
			},
			{
				label: 'Nowy hosting',
				icon: 'pi pi-plus',
				command: () => {
					openModal('create-hosting');
				},
			},
		],
	},
]);
</script>
