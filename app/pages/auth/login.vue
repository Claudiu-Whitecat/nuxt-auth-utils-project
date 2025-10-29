<script lang="ts" setup>
  import type { FormSubmitEvent } from '@nuxt/ui';
  import { z } from 'zod/v4';

  const schema = z.object({
    email: z.string().min(1, 'Email is required').max(255),
    password: z.string().min(8, 'Password is required').max(255),
  });
  type Schema = z.output<typeof schema>;
  const state = reactive({
    email: '',
    password: '',
  });
  const toast = useToast();
  const loading = ref(false);
  async function onLogin(event: FormSubmitEvent<Schema>) {
    try {
      loading.value = true;
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email: event.data.email,
          password: event.data.password,
        },
      });
      if (!response.success) {
        throw new Error('Login failed.');
      }
      await navigateTo('/');
    } catch {
      toast.add({
        color: 'error',
        title: 'Failed to Login',
        description: 'Please check your details and try again!',
      });
    } finally {
      loading.value = false;
    }
  }
</script>
<template>
  <div class="container">
    <div class="mx-auto max-w-[400px] pt-5 pb-5">
      <h1 class="text-bold my-4 text-center text-2xl font-bold">Login</h1>
      <UForm :schema :state @submit="onLogin" class="space-y-3">
        <UFormField name="email" label="Email">
          <UInput class="w-full" v-model="state.email" placeholder="Enter your email" required />
        </UFormField>
        <UFormField name="password" label="Password">
          <UInput
            class="w-full"
            v-model="state.password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </UFormField>
        <UButton type="submit" class="text-white">Login</UButton>
        <p>OR</p>
        <UButton leading-icon="ph:github-logo-duotone" to="/oauth/github">
          Login with Github
        </UButton>
      </UForm>
      <p class="pt-5">
        Do not have an account?
        <ULink class="underline" to="/auth/register">Register here</ULink>
      </p>
    </div>
  </div>
</template>
<style scoped></style>
