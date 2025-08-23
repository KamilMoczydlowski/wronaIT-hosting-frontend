<template>
	<DataTable
		:value="hostings"
		:pt="{
			column: {
				headerCell: ({ context }) => ({
					class: [
						'!py-3 !border-zinc-300',
						context.sorted ? '!bg-red-600' : '',
					],
				}),
			},
		}"
	>
		<Column field="name" header="Nazwa" />
		<Column field="from" header="Data od" sortable />
		<Column field="to" header="Data do" sortable />
		<Column field="cost" header="Koszt" sortable>
			<template #body="slotProps">
				{{ formatCurrency(slotProps.data.cost) }}
			</template>
		</Column>
		<Column field="description" header="Opis" />
		<Column header="Opcje">
			<template #body="slotProps">
				<Button
					type="button"
					icon="pi pi-ellipsis-v"
					variant="text"
					size="small"
					aria-haspopup="true"
					aria-controls="overlay_menu"
					@click="toggleHostingOptionsMenu($event, slotProps)"
				/>
				<Menu
					id="overlay_menu"
					ref="hostingOptionsMenu"
					:model="hostingOptionsMenuItems"
					:popup="true"
				/>
			</template>
		</Column>
	</DataTable>
</template>

<script setup>
defineProps({
  hostings: {
    type: Array,
    required: true,
  },
});

// const selectedItemId = ref(null);
const hostingOptionsMenu = ref();

const toggleHostingOptionsMenu = (event, slotProps) => {
	selectedItemId.value = slotProps.data.documentId;
	hostingOptionsMenu.value.toggle(event);
};
const formatCurrency = val => {
	return val.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });
};
const hostingOptionsMenuItems = ref([
	{
		label: 'Opcje',
		items: [
			{
				label: 'Edytuj',
				icon: 'pi pi-pen-to-square',
				command: () => {
					openModal('edit-hosting');
				},
			},
			{
				label: 'Usuń',
				icon: 'pi pi-trash',
				command: () => {
					openModal('delete-hosting');
				},
			},
		],
	},
]);
</script>