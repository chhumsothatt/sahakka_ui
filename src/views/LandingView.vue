<template>
  <div class="landing-page">
    <h1>Landing Page</h1>
    <RouterLink class="btn btn-primary" :to="{ name: 'login' }">
      Login
    </RouterLink>
  </div>
</template>

<script setup>
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
</style>
