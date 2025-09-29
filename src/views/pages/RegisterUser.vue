<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import apiClient, { register } from '@/service/AuthService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const register_status = ref(null);
const router= useRouter();

const handlerSingUpClick = async () => {
   register_status.value = await register({"name": name.value, "email": email.value, "password": password.value});
   if(register_status.value.success){
       name.value = "";
       email.value = "";
       password.value = "";
    setTimeout(() => {
        router.push("/auth/login");
    }, 2000);
   }else{
    password.value = "";
   }
}

</script>

<template>
    <FloatingConfigurator />
    <div class=" flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div class="text-center mb-8">
                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to
                    Ecommerce!</div>
                <span class="text-muted-color font-medium">Sign up to continue</span>
            </div>

            <div>
                <div v-if="register_status" class="p-3 mb-3 text-center" 
                :style="register_status.success 
                        ? { backgroundColor: '#d4edda', color: '#155724', borderRadius: '8px' } 
                        : { backgroundColor: '#ffcdd2', color: '#c63737', borderRadius: '8px' }">
                        {{ register_status.message }}
                    </div>
                <label for="email1"
                    class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Name</label>
                <InputText id="name" type="text" placeholder="Your name" class="w-full md:w-[30rem] mb-8"
                    v-model="name" />
                <label for="email1"
                    class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8"
                    v-model="email" />

                <label for="password1"
                    class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid
                    :feedback="false"></Password>
                <Button label="Sign Up" class="w-full" @click="handlerSingUpClick"></Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
