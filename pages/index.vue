<template>
	<Card>
		<template #title>
			<LayoutToolbar />
		</template>
		<template #content>
			<CompanyTable />
		</template>

		<teleport to="body">
			<LayoutDialog />
			<Toast
				position="top-center"
				:pt="{ detail: { class: '!text-zinc-800' } }"
			/>
		</teleport>
	</Card>
</template>

<script setup>
// TODO
// edycja danych firmy
// tworzenie hostingu z przypisaniem do firmy
// edycja hostingu
// usuwanie hostingu
// odświeżanie listy po CRUD
</script>
