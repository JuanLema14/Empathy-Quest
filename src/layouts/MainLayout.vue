<template>
  <q-layout class="bg text-white">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup></script>

<style scoped>
.bg {
  background: url('src/assets/fondo.png') no-repeat center center;
  background-size: cover;
}
</style>
