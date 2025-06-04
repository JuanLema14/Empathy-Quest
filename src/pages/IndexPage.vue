<template>
  <q-page class="flex flex-center text-white">
    <q-card
      flat
      class="q-pa-lg bg-glass"
      style="min-width: 300px; max-width: 400px; width: 90%; border-radius: 20px"
    >
      <q-card-section>
        <div class="text-h6 text-center">Bienvenido al Juego de Empatía</div>
        <div class="text-subtitle2 text-center">Ingresa tu nombre para comenzar</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="iniciarJuego" class="q-gutter-md">
          <q-input
            v-model="nombre"
            label="Tu nombre"
            outlined
            dense
            filled
            :rules="[(val) => !!val || 'El nombre es obligatorio']"
            autofocus
          />
          <q-btn
            type="submit"
            label="Comenzar"
            color="accent"
            class="full-width"
            unelevated
            no-caps
            style="border-radius: 10px"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEmpathyGameStore } from 'stores/empathyGame'

const router = useRouter()
const store = useEmpathyGameStore()

const nombre = ref('')

function iniciarJuego() {
  store.restartGame()
  store.setPlayerName(nombre.value)
  router.push('/juego')
}
</script>

<style scoped>
.bg-glass {
  background: rgba(148, 58, 150, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(14.1px);
  -webkit-backdrop-filter: blur(14.1px);
  border: 1px solid rgba(148, 58, 150, 0.4);
}
</style>
