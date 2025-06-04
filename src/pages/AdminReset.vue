<template>
  <q-page class="q-pa-md flex flex-center bg-dark text-white">
    <q-card
      class="bg-grey-10 text-white shadow-10"
      style="max-width: 400px; width: 100%; border-radius: 18px"
    >
      <q-card-section class="q-pt-lg q-pb-sm">
        <div class="text-h5 text-center q-mb-xs">Resetear Leaderboard</div>
        <div class="text-subtitle2 text-center text-negative q-mt-xs">
          ⚠️ Esta acción eliminará todos los puntajes.
        </div>
      </q-card-section>

      <q-separator color="grey-8" />

      <q-card-section class="q-pt-md q-pb-lg">
        <q-input
          filled
          v-model="secret"
          label="Clave secreta"
          type="password"
          color="negative"
          class="q-mb-lg"
          dense
          rounded
          standout="bg-grey-9 text-white"
        />

        <q-btn
          label="Resetear"
          color="negative"
          :loading="loading"
          @click="handleReset"
          class="full-width"
          size="lg"
          unelevated
          rounded
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const secret = ref('')
const loading = ref(false)

const handleReset = async () => {
  if (!secret.value) {
    $q.notify({ type: 'warning', message: 'Debes ingresar la clave secreta.' })
    return
  }

  loading.value = true

  try {
    const res = await fetch(`/api/reset-leaderboard?secret=${secret.value}`)
    const data = await res.json()

    if (res.ok && data.success) {
      $q.notify({ type: 'positive', message: 'Leaderboard reseteado correctamente.' })
    } else {
      $q.notify({ type: 'negative', message: data.error || 'Error desconocido.' })
    }
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Error al contactar la API.' })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.q-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
}
.q-card {
  transition: box-shadow 0.2s;
}
</style>
