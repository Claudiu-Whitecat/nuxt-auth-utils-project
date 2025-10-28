<script lang="ts" setup>
  import type { FormSubmitEvent } from '@nuxt/ui';
  import { z } from 'zod/v4';

  const schema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    password: z.string().min(8, 'Password is required').max(255),
  });
  type Schema = z.output<typeof schema>;
  const state = reactive({
    name: '',
    password: '',
  });

  async function onLogin(event: FormSubmitEvent<Schema>) {
    console.log(event.data);
  }
</script>
<template>
  <div class="container">
    <div class="mx-auto max-w-[400px] pt-5 pb-5">
      <h1 class="text-bold my-4 text-center text-2xl font-bold">Login</h1>
      <UForm :schema :state @submit="onLogin" class="space-y-3">
        <UFormField name="name" label="Name">
          <UInput class="w-full" v-model="state.name" placeholder="Enter your Name" required />
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
        <UButton type="submit">Login</UButton>
      </UForm>
      <p class="pt-5">
        Do not have an account?
        <ULink class="underline" to="/auth/register">Register here</ULink>
      </p>
    </div>
  </div>
</template>
<style scoped></style>
