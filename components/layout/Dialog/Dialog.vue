<template>
	<Dialog
		v-model:visible="visible"
		modal
		:header="modalHeader"
		class="w-[25rem]"
	>
		<CompanyForm
			v-if="
				modalContent === 'create-company' || modalContent === 'edit-company'
			"
		/>
		<HostingForm
			v-else-if="
				modalContent === 'create-hosting' || modalContent === 'edit-hosting'
			"
		/>
	</Dialog>
</template>

<script setup>
import { useDialogStore } from './stores/dialogStore';

const dialogStore = useDialogStore();
const { visible } = storeToRefs(dialogStore);

const modalContent = ref('');
const modalHeader = ref('');
</script>
