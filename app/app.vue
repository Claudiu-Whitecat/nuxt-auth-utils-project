<script setup lang="ts">
  import { useSeoMetadata } from '~/composables/useSeoMeta';

  useSeoMetadata({
    title: 'Nuxt Auth Utils',
    description: 'Trying to implement auth with nuxt-auth-utils',
    ogImage: '/images/og-meta.jpg',
    ogType: 'website',
    twitterCard: 'summary',
  });
</script>
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
