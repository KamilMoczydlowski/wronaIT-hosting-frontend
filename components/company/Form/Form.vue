<template>
	<Form
		v-if="formVisible"
		v-slot="$form"
		:initialValues
		:resolver
		:validateOnValueUpdate="false"
		:validateOnBlur="true"
		@submit="onFormSubmit"
	>
		<span class="text-surface-500 dark:text-surface-400 block mb-8">
			Uzupełnij pola poniżej.
		</span>
		<div class="mb-4">
			<InputText name="name" placeholder="Nazwa*" autocomplete="off" fluid />
			<Message
				v-if="$form.name?.invalid"
				severity="error"
				size="small"
				variant="simple"
				>{{ $form.name.error.message }}</Message
			>
		</div>
		<div class="mb-4">
			<InputText name="nip" placeholder="NIP*" autocomplete="off" fluid />
			<Message
				v-if="$form.nip?.invalid"
				severity="error"
				size="small"
				variant="simple"
				>{{ $form.nip.error.message }}</Message
			>
		</div>
		<!-- FILE UPLOAD -->
		<div class="mb-8">
			<FileUpload
				ref="fileUpload"
				mode="basic"
				name="demo[]"
				url="/api/upload"
				accept="image/*"
				:max-file-size="1000000"
				@upload="onUpload"
			/>
		</div>
		<div class="flex justify-end gap-2">
			<Button
				type="button"
				label="Anuluj"
				severity="secondary"
				@click="closeDialog()"
			/>
			<Button type="submit" label="Zapisz" />
		</div>
	</Form>
	<div v-else-if="formState === 'delete'" class="flex justify-end gap-2">
		<Button
			type="button"
			label="Anuluj"
			severity="secondary"
			@click="closeDialog()"
		/>
		<Button type="button" label="Usuń" @click="deleteCompany" />
	</div>
</template>

<script setup>
import { useCompanyFormStore } from './stores/companyFormStore';
import { useDialogStore } from '../../layout/Dialog/stores/dialogStore';

const companyFormStore = useCompanyFormStore();
const formState = companyFormStore.getFormState;
const formVisible = computed(
	() => formState === 'create' || formState === 'edit'
);

const dialogStore = useDialogStore();
const closeDialog = () => dialogStore.toggleDialogVisibility(false)

const initialValues = reactive({
	name: '',
	nip: '',
	fileupload: '',
});

// const toast = useToast();

// const toastText = computed(() =>
// 	modalContent.value === 'create-company'
// 		? 'Do bazy danych została dodana nowa firma'
// 		: 'Do bazy danych został dodany nowy hosting'
// );

const resolver = ({ values }) => {
	const errors = {};

	if (!values.name) {
		errors.name = [{ message: 'Nazwa jest wymagana.' }];
	}

	if (!values.nip) {
		errors.nip = [{ message: 'NIP jest wymagany.' }];
	}

	return {
		errors,
	};
};
const upload = () => {
	initialValues.fileupload.upload();
};

const onUpload = () => {
	// prep and upload file to strapi
};
const onFormSubmit = ({ states, valid }) => {
	console.log(initialValues.fileupload);

	if (!valid) return;

	switch (formState.value) {
		case 'create':
			saveNewCompany(states);
			break;
		case 'edit':
			saveNewCompany(states);
			break;

		default:
			break;
	}

	closeDialog()
};
const saveNewCompany = async states => {
	const data = {
		name: states.name.value,
		nip: states.nip.value,
	};

	console.log(data);

	// await $fetch(`${strapiLocalUrl}/api/companies`, {
	// 	method: 'POST',
	// 	body: { data },
	// });

	// toast.add({
	// 	severity: 'success',
	// 	summary: 'Udało się!',
	// 	detail: toastText.value,
	// 	life: 5000,
	// });
};
const deleteCompany = async () => {
	// console.log(selectedItemId.value);

	// await $fetch(`${strapiLocalUrl}/api/companies/${selectedItemId.value}`, {
	// 	method: 'DELETE',
	// });

	// toast.add({
	// 	severity: 'warn',
	// 	summary: 'Nastąpiło usunięcie rekordu!',
	// 	detail: `Dane o ID ${selectedItemId.value} zostały usunięte`,
	// 	life: 5000,
	// });

	closeDialog()
	// selectedItemId.value = null;
};

// const resetValues = () => {
// 	initialValues.name = null;
// 	initialValues.nip = null;
// 	initialValues.fileupload = null;
// 	initialValues.cost = null;
// 	initialValues.description = null;
// 	initialValues.dateFrom = null;
// 	initialValues.dateTo = null;
// };
</script>
