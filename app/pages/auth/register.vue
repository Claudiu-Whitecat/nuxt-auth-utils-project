<script lang="ts" setup>
  import type { FormSubmitEvent } from '@nuxt/ui';
  import { z } from 'zod/v4';
  import register from '~/pages/auth/register.vue';

  const schema = z
    .object({
      name: z.string().min(1, 'Name is required').max(255),
      email: z.email('Invalid email address'),
      password: z.string().min(8, 'Password is required').max(255),
      passwordConfirm: z.string(),
    })
    .check((data) => {
      if (data.value.password !== data.value.passwordConfirm) {
        data.issues.push({
          code: 'custom',
          path: ['passwordConfirm'],
          message: "Passwords don't match",
          input: data.value.passwordConfirm,
        });
      }
    });
  type Schema = z.output<typeof schema>;
  const state = reactive({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const toast = useToast();
  const loading = ref(false);

  async function onRegister(event: FormSubmitEvent<Schema>) {
    try {
      loading.value = true;
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: {
          name: event.data.name,
          email: event.data.email,
          password: event.data.password,
        },
      });
      console.log(response.success);
      if (!response.success) {
        throw new Error('Registration failed.');
      }
      await navigateTo('/');
    } catch {
      toast.add({
        color: 'error',
        title: 'Failed to create account',
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
      <h1 class="text-bold my-4 text-center text-2xl font-bold">Register</h1>
      <UForm :schema :state @submit="onRegister" class="space-y-3">
        <UFormField name="name" label="Name">
          <UInput class="w-full" v-model="state.name" placeholder="Enter your Name" required />
        </UFormField>
        <UFormField name="email" label="Email Address">
          <UInput
            class="w-full"
            v-model="state.email"
            type="email"
            placeholder="Enter your email"
            required
          />
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
        <UFormField name="passwordConfirm" label="Confirm Password">
          <UInput
            class="w-full"
            v-model="state.passwordConfirm"
            type="password"
            placeholder="Confirm your password"
            required
          />
        </UFormField>
        <UButton :loading type="submit">Register</UButton>
      </UForm>
    </div>
  </div>
</template>
<style scoped></style>
