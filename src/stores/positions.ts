import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Position } from '@/types/position'
import positionsData from '@/data/positions.json'

export const usePositionsStore = defineStore('positions', () => {
  const positions = ref<Position[]>(positionsData as Position[])

  const openPositions = computed(() => positions.value.filter((p) => p.status === 'open'))

  function getPositionById(id: string): Position | undefined {
    return positions.value.find((p) => p.id === id)
  }

  return {
    positions,
    openPositions,
    getPositionById,
  }
})
