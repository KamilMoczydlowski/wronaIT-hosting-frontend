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
		<div class="flex items-center gap-4 mb-4">
			<FloatLabel variant="on">
				<DatePicker
					id="dateFrom"
					name="dateForm"
					showIcon
					dateFormat="dd/mm/yy"
					iconDisplay="input"
				/>
				<label for="dateFrom">Data od</label>
			</FloatLabel>
			<FloatLabel variant="on">
				<DatePicker
					id="dateTo"
					name="dateTo"
					show-icon
					date-format="dd/mm/yy"
					icon-display="input"
				/>
				<label for="dateTo">
					Data do <span class="text-red-500">*</span>
				</label>
			</FloatLabel>
		</div>
		<div class="mb-4">
			<FloatLabel variant="on">
				<InputNumber
					id="cost"
					name="cost"
					mode="currency"
					currency="PLN"
					locale="pl-PL"
					:min-fraction-digits="0"
					:max-fraction-digits="2"
					fluid
				/>
				<label for="cost">Koszt</label>
			</FloatLabel>
		</div>
		<div class="mb-8">
			<FloatLabel variant="on">
				<Textarea
					id="description"
					name="description"
					rows="5"
					cols="30"
					style="resize: none"
					fluid
				/>
				<label for="description">Opis</label>
			</FloatLabel>
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
	<div
		v-else-if="modalContent === 'delete-hosting'"
		class="flex justify-end gap-2"
	>
		<Button
			type="button"
			label="Anuluj"
			severity="secondary"
			@click="closeDialog()"
		/>
		<Button type="button" label="Usuń" @click="closeDialog()" />
	</div>
</template>

<script setup>
import { useHostingFormStore } from './stores/hostingFormStore';
import { useDialogStore } from '../../layout/Dialog/stores/dialogStore';

const hostingFormStore = useHostingFormStore();
const formState = hostingFormStore.getFormState;
const formVisible = computed(
	() => formState === 'create' || formState === 'edit'
);

const dialogStore = useDialogStore();
const closeDialog = () => dialogStore.toggleDialogVisibility(false)

const initialValues = reactive({
	name: '',
	cost: '',
	description: '',
	dateFrom: '',
	dateTo: '',
});

const resolver = ({ values }) => {
	const errors = {};

	if (!values.name) {
		errors.name = [{ message: 'Nazwa jest wymagana.' }];
	}

	if (!values.dateTo) {
		errors.nip = [
			{ message: 'Data do kiedy hosting jest wykupiony jest wymagana.' },
		];
	}

	return {
		errors,
	};
};
</script>
