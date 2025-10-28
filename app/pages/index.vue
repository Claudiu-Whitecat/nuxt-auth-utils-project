<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
  });
</script>
<template>
  <section class="">
    <div class="container">
      <h1 class="p-10 text-center text-3xl font-bold">Protected Page</h1>
    </div>
  </section>
</template>
<style scoped></style>
