<template>
  <q-page class="q-pa-lg column flex-center text-white relative-position">
    <transition name="scene-fade" mode="out-in">
      <div :key="store.currentNodeId" class="full-width column items-center q-gutter-md">
        <!-- Viñeta de diálogo -->
        <div class="bubble-dialogue q-pa-md bg-white text-center text-subtitle1 text-black">
          {{ store.currentNode.prompt }}
        </div>

        <!-- Imagen del escenario -->
        <img :src="`/escenarios/${store.currentNode.image}`" alt="Escenario" class="scene-image" />

        <!-- Opciones -->
        <div
          v-if="!store.currentNode.isFinal"
          class="column q-gutter-sm full-width bg-glass q-pa-md"
        >
          <div class="text-h6 text-center q-mb-md">¿Qué le dirías?:</div>
          <q-btn
            v-for="option in store.currentNode.options"
            :key="option.text"
            :label="option.text"
            color="accent"
            unelevated
            class="q-mt-sm"
            @click="elegirOpcion(option)"
            no-caps
            style="border-radius: 10px"
          />
        </div>

        <!-- Final -->
        <div v-else class="column items-center q-mt-lg q-gutter-md">
          <q-card class="bg-glass q-pa-md text-center text-white">
            <div class="text-h6 q-mb-sm">✨ Has llegado al final ✨</div>
            <div class="text-body1">
              A veces, lo más valioso no es tener la razón, sino aprender a escuchar desde el
              corazón. Gracias por practicar el hábito:
              <strong>“Buscar primero entender, luego ser entendido.”</strong>
            </div>
          </q-card>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script setup>
import { watch } from 'vue'
import { useEmpathyGameStore } from 'stores/empathyGame'

const store = useEmpathyGameStore()

function elegirOpcion(option) {
  store.selectOption(option)
}

watch(
  () => store.currentNode.isFinal,
  async (isFinal) => {
    if (isFinal) {
      await store.saveResult()
    }
  },
)
</script>

<style scoped>
.scene-image {
  max-width: 90%;
  max-height: 40vh;
  object-fit: cover;
}

.bubble-dialogue {
  max-width: 600px;
  border-radius: 20px;
  margin-bottom: 20px;
}

.scene-fade-enter-active,
.scene-fade-leave-active {
  transition: all 0.5s ease;
}

.scene-fade-enter-from,
.scene-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.bg-glass {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(14.1px);
  -webkit-backdrop-filter: blur(14.1px);
  border: 1px solid rgba(0, 0, 0, 0.4);
}
</style>
