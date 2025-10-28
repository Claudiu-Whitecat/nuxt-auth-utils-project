<script lang="ts" setup>
  import type { FormSubmitEvent } from '@nuxt/ui';
  import { z } from 'zod/v4';

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

  async function onRegister(event: FormSubmitEvent<Schema>) {
    console.log(event.data);
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
        <UButton type="submit">Register</UButton>
      </UForm>
    </div>
  </div>
</template>
<style scoped></style>
