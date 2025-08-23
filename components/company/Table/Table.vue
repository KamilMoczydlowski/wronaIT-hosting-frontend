<template>
	<DataTable
		v-model:expandedRows="expandedRows"
		:value="companies"
		data-key="id"
		sortField="name"
		:sortOrder="1"
		size="small"
		:pt="{
			column: {
				headerCell: {
					class: ['!py-3 !bg-white !text-zinc-800 !border-zinc-300'],
				},
			},
		}"
	>
		<Column expander class="w-20" />
		<Column field="id" header="ID" />
		<Column header="Logo">
			<template #body="slotProps">
				<NuxtImg
					v-if="slotProps?.data?.logo?.url"
					:src="concatUrl(strapiLocalUrl, slotProps?.data?.logo?.url)"
					width="50"
				/>
				<p v-else>-</p>
			</template>
		</Column>
		<Column field="name" header="Nazwa" />
		<Column field="nip" header="NIP" />
		<Column header="Opcje">
			<template #body="slotProps">
				<Button
					type="button"
					icon="pi pi-ellipsis-v"
					variant="text"
					size="small"
					aria-haspopup="true"
					aria-controls="overlay_menu"
					@click="toggleOptionsMenuVisibility($event, slotProps)"
				/>
				<Menu
					id="overlay_menu"
					ref="companyOptionsMenu"
					:model="companyOptionsMenuItems"
					:popup="true"
				/>
			</template>
		</Column>
		<template #expansion="slotProps">
			<div class="p-3">
				<div v-if="slotProps.data.hostings.length > 0">
					<h4 class="mb-4">Hostingi firmy {{ slotProps.data.name }}</h4>
					<HostingTable :hostings="slotProps.data.hostings" />
				</div>
				<p v-else>
					Niestety ta firma nie ma jescze żadnych przypisanych hostingów.
				</p>
			</div>
		</template>
	</DataTable>
</template>

<script setup>
import { useCompanyTableStore } from './stores/companyTableStore';
const config = useRuntimeConfig();
const strapiLocalUrl = config.public.strapiLocalUrl;
const { data } = await useFetch(`${strapiLocalUrl}/api/companies?populate=*`);

const companyTableStore = useCompanyTableStore();
companyTableStore.setCompanies(data.value.data);
const companies = computed(() => companyTableStore.getCompanies);
const expandedRows = computed(() => companyTableStore.getExpandedRows);
const selectedItemId = computed(() => companyTableStore.getItemId);

const optionsMenuVisible = ref();

const concatUrl = (a, b) => {
	return a + b;
};

const toggleOptionsMenuVisibility = (event, slotProps) => {
	selectedItemId.value = slotProps.data.documentId;
	optionsMenuVisible.value.toggle(event);
};

const companyOptionsMenuItems = ref([
	{
		label: 'Opcje',
		items: [
			{
				label: 'Edytuj',
				icon: 'pi pi-pen-to-square',
				command: () => {
					openModal('edit-company');
				},
			},
			{
				label: 'Usuń',
				icon: 'pi pi-trash',
				command: () => {
					openModal('delete-company');
				},
			},
		],
	},
]);
</script>
