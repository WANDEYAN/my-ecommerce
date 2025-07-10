<script setup>
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';

const toast = useToast();

const userName = ref('João Silva');
const userEmail = ref('joao.silva@example.com');

const newPassword = ref('');
const confirmNewPassword = ref('');
const currentPasswordInput = ref('');

const showPasswordFields = ref(false);

const currentPasswordDialogVisible = ref(false);

const submitted = ref(false);

const onNewPasswordInput = () => {
    if (newPassword.value.length > 0) {
        showPasswordFields.value = true;
    } else if (newPassword.value.length === 0 && confirmNewPassword.value.length === 0) {
        showPasswordFields.value = false;
        submitted.value = false;
    }
};

const submitPasswordChange = () => {
    submitted.value = true;

    let isValid = true;
    let message = '';

    if (!newPassword.value || newPassword.value.length < 6) {
        isValid = false;
        message = 'Password must be at least 6 characters long';
    } else if (newPassword.value !== confirmNewPassword.value) {
        isValid = false;
        message = 'Passwords do not match';
    }

    if (!isValid) {
        toast.add({ severity: 'error', summary: 'Erro de Validação', detail: message, life: 3000 });
        return;
    }

    currentPasswordDialogVisible.value = true;
    currentPasswordInput.value = '';
};

const validateCurrentPassword = () => {
    if (currentPasswordInput.value === 'senha123') {
        toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Password has been changed successfully', life: 3000 });
        resetForm();
    } else {
        toast.add({ severity: 'error', summary: 'Erro', detail: 'Current password id incorrect', life: 3000 });
    }
    currentPasswordDialogVisible.value = false;
};

const resetForm = () => {
    newPassword.value = '';
    confirmNewPassword.value = '';
    currentPasswordInput.value = '';
    showPasswordFields.value = false;
    submitted.value = false;
};

const cancelPasswordChange = () => {
    currentPasswordDialogVisible.value = false;
    currentPasswordInput.value = '';
};
</script>

<template>
    <div class="flex justify-center items-start min-h-screen p-6 bg-surface-50">
        <Toast />
        <Card class="w-full shadow-xl rounded-lg overflow-hidden">
            <template #title>
                <div class="flex items-center gap-3 text-2xl font-bold text-gray-800">
                    <i class="pi pi-user-edit text-primary-500"></i>
                    My Account Information
                </div>
            </template>
            <template #content>
                <div class="p-fluid flex flex-col gap-6">
                    <div class="border-b pb-4 mb-4 border-surface-200">
                        <div class="flex items-center gap-3 mb-2">
                            <i class="pi pi-id-card text-lg text-surface-600"></i>
                            <p class="text-lg text-surface-800 ml-2">{{ userName }}</p>
                        </div>

                        <div class="flex items-center gap-3 mt-4 mb-2">
                            <i class="pi pi-envelope text-lg text-surface-600"></i>
                            <p class="text-lg text-surface-800 ml-2">{{ userEmail }}</p>
                        </div>
                    </div>

                    <div class="flex flex-col gap-5">
                        <div class="flex items-center gap-3">
                            <i class="pi pi-lock text-lg text-primary-500"></i>
                            <h2 class="text-xl font-semibold text-gray-700">Change Password</h2>
                        </div>

                        <div class="field">
                            <FloatLabel>
                                <InputText id="new_password" type="password" v-model="newPassword"
                                    @input="onNewPasswordInput"
                                    :class="{ 'p-invalid': submitted && (!newPassword || newPassword.length < 6) }"
                                    class="w-full" />
                                <label for="new_password">New Password</label>
                            </FloatLabel>
                            <small v-if="submitted && (!newPassword || newPassword.length < 6)" class="p-error">Password
                                must be at least 6 characters long.</small>
                        </div>

                        <div v-if="showPasswordFields"
                            class="flex flex-col gap-5 transition-all duration-300 ease-in-out">
                            <div class="field">
                                <FloatLabel>
                                    <InputText id="confirm_new_password" type="password" v-model="confirmNewPassword"
                                        :class="{ 'p-invalid': submitted && newPassword !== confirmNewPassword }"
                                        class="w-full" />
                                    <label for="confirm_new_password">Confirm new password</label>
                                </FloatLabel>
                                <small v-if="submitted && newPassword !== confirmNewPassword" class="p-error">Passwords
                                    do not match</small>
                            </div>

                            <Button label="Alterar Senha" icon="pi pi-check" severity="primary"
                                class="w-full p-button-lg mt-3" @click="submitPasswordChange" />
                        </div>
                    </div>
                </div>
            </template>
        </Card>

        <Dialog v-model:visible="currentPasswordDialogVisible" modal header="Confirm your current password"
            :style="{ width: '30rem' }" :draggable="false" :closable="false">
            <div class="flex flex-col gap-4">
                <p class="text-surface-700">Please, enter your current password to confirm the change.</p>
                <FloatLabel>
                    <InputText id="current_password_input" type="password" v-model="currentPasswordInput" autofocus
                        class="w-full" @keyup.enter="validateCurrentPassword" />
                    <label for="current_password_input">Current Password</label>
                </FloatLabel>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="cancelPasswordChange" />
                <Button label="Confirmar" icon="pi pi-check" @click="validateCurrentPassword" />
            </template>
        </Dialog>
    </div>
</template>