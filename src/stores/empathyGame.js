import { defineStore } from 'pinia'

export const useEmpathyGameStore = defineStore('empathyGame', {
  state: () => ({
    nodes: [
      {
        id: 'start',
        image: 'escenario1.png',
        prompt:
          "Tu compañera de equipo dice: 'Siento que mis ideas no son valoradas en el proyecto.'",
        options: [
          {
            text: '¿Qué te hace sentir eso? Me gustaría entender mejor.',
            score: 10,
            empathyLevel: 'alta',
            feedback: 'Muy bien. Estás mostrando escucha activa y empatía.',
            nextId: 'profundizar_emocion',
          },
          {
            text: 'Bueno, todos hemos sentido eso alguna vez.',
            score: 3,
            empathyLevel: 'media',
            feedback: 'Una respuesta aceptable, aunque podrías haber preguntado más.',
            nextId: 'conversacion_neutra',
          },
          {
            text: 'Eso no es cierto, todos te escuchamos siempre.',
            score: -5,
            empathyLevel: 'baja',
            feedback: 'Negar la experiencia del otro no favorece la empatía.',
            nextId: 'bloqueo_emocional',
          },
        ],
      },
      {
        id: 'profundizar_emocion',
        image: 'escenario2.png',
        prompt:
          "Ella responde: 'Es que en la última reunión nadie comentó nada sobre mi propuesta.'",
        options: [
          {
            text: 'Lamento que te hayas sentido así. ¿Te gustaría que compartiéramos tu propuesta de nuevo juntos?',
            score: 10,
            empathyLevel: 'alta',
            feedback: 'Excelente, estás proponiendo colaboración y validación.',
            nextId: 'continuar_apoyo',
          },
          {
            text: 'Tal vez no era tan buena la propuesta, no lo tomes personal.',
            score: -10,
            empathyLevel: 'baja',
            feedback: 'Restar valor a la experiencia emocional puede causar daño.',
            nextId: 'final_malo',
          },
        ],
      },
      {
        id: 'conversacion_neutra',
        image: 'escenario3.png',
        prompt: 'Ella te mira confundida y guarda silencio.',
        options: [
          {
            text: '¿Te gustaría hablar más del tema? Estoy dispuesto a escucharte.',
            score: 8,
            empathyLevel: 'alta',
            feedback: 'Buena recuperación, retomas el camino de la escucha.',
            nextId: 'profundizar_emocion',
          },
          {
            text: 'Bueno, sigamos con la tarea entonces.',
            score: -3,
            empathyLevel: 'baja',
            feedback: 'Ignorar la emoción bloquea la comunicación.',
            nextId: 'final_neutro',
          },
        ],
      },
      {
        id: 'bloqueo_emocional',
        image: 'escenario4.png',
        prompt: "Ella se cierra y responde: 'Olvídalo, no es importante.'",
        options: [
          {
            text: 'Perdón, no fue mi intención minimizar lo que sentías. ¿Quieres hablar de eso?',
            score: 6,
            empathyLevel: 'media',
            feedback: 'Recuperas terreno mostrando humildad.',
            nextId: 'profundizar_emocion',
          },
          {
            text: 'Ok, como quieras.',
            score: -5,
            empathyLevel: 'baja',
            feedback: 'Terminar una conversación abruptamente evita la conexión.',
            nextId: 'final_malo',
          },
        ],
      },
      {
        id: 'continuar_apoyo',
        image: 'escenario5.png',
        prompt: "Ella dice: 'Gracias, me ayudaría mucho. A veces me cuesta pedir ayuda.'",
        options: [
          {
            text: 'Me alegra que me lo digas. Siempre puedes contar conmigo.',
            score: 10,
            empathyLevel: 'alta',
            feedback: 'Fomentas confianza y apoyo emocional. Muy empático.',
            nextId: 'reflexion_emocional',
          },
          {
            text: 'Bueno, tampoco es tan difícil pedir ayuda.',
            score: -4,
            empathyLevel: 'baja',
            feedback: 'Subestimar su dificultad puede afectar la conexión.',
            nextId: 'final_neutro',
          },
        ],
      },
      {
        id: 'reflexion_emocional',
        image: 'escenario6.png',
        prompt: "Ella sonríe y dice: 'A veces me siento insegura de mis capacidades.'",
        options: [
          {
            text: 'Eres muy capaz, y tu trabajo lo demuestra. Estoy aquí para recordártelo cuando lo necesites.',
            score: 10,
            empathyLevel: 'alta',
            feedback: 'Validas sus emociones con aprecio genuino.',
            nextId: 'final_bueno',
          },
          {
            text: 'Bueno, todos nos sentimos así a veces, solo hay que seguir.',
            score: 3,
            empathyLevel: 'media',
            feedback: 'Un intento de consuelo, aunque algo superficial.',
            nextId: 'final_neutro',
          },
        ],
      },
      {
        id: 'final_bueno',
        image: 'final_pos.png',
        prompt:
          'Has ayudado a tu compañera a sentirse escuchada. Su disposición a colaborar mejora.',
        isFinal: true,
      },
      {
        id: 'final_neutro',
        image: 'final_neutro.png',
        prompt: 'La conversación terminó sin mayor conflicto, pero sin conexión real.',
        isFinal: true,
      },
      {
        id: 'final_malo',
        image: 'final_neg.png',
        prompt: 'Tu compañera se sintió invalidada y distante. No hubo avance en la relación.',
        isFinal: true,
      },
    ],
    currentNodeId: 'start',
    score: 0,
    playerName: '',
    leaderboard: [],
  }),

  getters: {
    currentNode(state) {
      return state.nodes.find((n) => n.id === state.currentNodeId)
    },
  },

  actions: {
    selectOption(option) {
      this.score += option.score
      this.currentNodeId = option.nextId
    },

    setPlayerName(name) {
      this.playerName = name
    },

    async saveResult() {
      const result = {
        name: this.playerName,
        score: this.score,
        date: new Date().toISOString(),
      }

      try {
        await fetch('/api/save-leaderboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result),
        })
      } catch (error) {
        console.error('Error saving result:', error)
      }
    },
    async fetchLeaderboard() {
      try {
        const res = await fetch('/data/leaderboard.json')
        const data = await res.json()
        this.leaderboard = data
      } catch (error) {
        console.error('Error loading leaderboard:', error)
      }
    },
    async resetLeaderboard(secret) {
      try {
        const res = await fetch(`/api/reset-leaderboard?secret=${secret}`)
        const data = await res.json()
        if (data.success) {
          this.leaderboard = []
        }
      } catch (error) {
        console.error('Error resetting leaderboard:', error)
      }
    },
    restartGame() {
      this.currentNodeId = 'start'
      this.score = 0
      this.playerName = ''
    },
  },
})
