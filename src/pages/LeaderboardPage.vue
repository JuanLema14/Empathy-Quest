<template>
  <q-page class="q-pa-md flex flex-center text-white">
    <q-card
      flat
      bordered
      class="q-pa-lg bg-glass"
      style="max-width: 1200px; margin: auto; border-radius: 20px; width: 90%"
    >
      <div class="text-h5 text-center text-black q-mb-md text-weight-bolder">
        🏆 Leaderboard del Juego de Empatía
      </div>

      <q-table
        flat
        bordered
        :rows="leaderboard"
        :columns="columns"
        row-key="name"
        :loading="loading"
        hide-pagination
        class="bg-grey-1"
      >
        <template #body-cell-pos="{ rowIndex }">
          <q-td>{{ rowIndex + 1 }}</q-td>
        </template>

        <template #body-cell-date="{ row }">
          <q-td>{{ formatDate(row.date) }}</q-td>
        </template>
      </q-table>

      <q-inner-loading :showing="loading" />
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useEmpathyGameStore } from 'stores/empathyGame'

const store = useEmpathyGameStore()
const leaderboard = ref([])
const loading = ref(true)

const columns = [
  { name: 'pos', label: 'Posición', align: 'left', field: 'pos', sortable: false },
  { name: 'name', label: 'Jugador', align: 'left', field: 'name', sortable: true },
  { name: 'score', label: 'Puntaje', align: 'left', field: 'score', sortable: true },
  { name: 'date', label: 'Fecha', align: 'left', field: 'date', sortable: true },
]

const formatDate = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

onMounted(async () => {
  loading.value = true
  await store.fetchLeaderboard()
  leaderboard.value = [...store.leaderboard].sort((a, b) => b.score - a.score)
  loading.value = false
})
</script>
