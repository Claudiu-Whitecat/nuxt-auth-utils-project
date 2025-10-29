<script setup lang="ts">
  const session = useUserSession();
  async function logout() {
    await session.clear();
    await navigateTo('/auth/login');
  }
</script>
<template>
  <header>
    <div class="container">
      <nav class="align-center flex h-14 justify-end px-10 py-4">
        <AuthState>
          <template #default="{ loggedIn }">
            <button v-if="loggedIn" @click="logout">
              Hello {{ session.user.value!.name }}! Logout
            </button>
            <NuxtLink v-else to="/auth/login">Login</NuxtLink>
          </template>
          <template #placeholder>
            <button disabled>Loading...</button>
          </template>
        </AuthState>
      </nav>
    </div>
  </header>
</template>
<style scoped></style>
