import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Candidate } from '@/types/candidate'
import candidatesData from '@/data/candidates.json'

/**
 * Pinia store for candidate data.
 *
 * A "store" is a shared state container — any Vue component can use it to
 * read or modify candidate data. When the data changes, all components
 * using it automatically re-render.
 *
 * Usage in a component:
 *   const store = useCandidatesStore()
 *   store.filteredCandidates  // reactive list of candidates
 *   store.searchQuery = 'react'  // updates the filter, UI reacts
 */
export const useCandidatesStore = defineStore('candidates', () => {
  // --- Reactive State ---
  // ref() makes data "reactive" — Vue tracks changes and updates the UI
  const candidates = ref<Candidate[]>(candidatesData as Candidate[])
  const searchQuery = ref('')

  // --- Computed Properties ---
  // These auto-recalculate whenever the data they depend on changes
  const activeCandidates = computed(() =>
    candidates.value.filter((c) => c.status === 'active'),
  )

  const filteredCandidates = computed(() => {
    const query = searchQuery.value.toLowerCase()
    if (!query) return activeCandidates.value

    return activeCandidates.value.filter(
      (c) =>
        c.firstName.toLowerCase().includes(query) ||
        c.lastName.toLowerCase().includes(query) ||
        c.skills.some((s) => s.name.toLowerCase().includes(query)),
    )
  })

  // --- Actions ---
  // Functions that components call to read or modify data
  function getCandidateById(id: string): Candidate | undefined {
    return candidates.value.find((c) => c.id === id)
  }

  function addPositionToCandidate(candidateId: string, positionId: string) {
    const candidate = getCandidateById(candidateId)
    if (candidate && !candidate.positionIds.includes(positionId)) {
      candidate.positionIds.push(positionId)
    }
  }

  function removePositionFromCandidate(candidateId: string, positionId: string) {
    const candidate = getCandidateById(candidateId)
    if (candidate) {
      candidate.positionIds = candidate.positionIds.filter((id) => id !== positionId)
    }
  }

  // Everything returned here is accessible to components
  return {
    candidates,
    searchQuery,
    activeCandidates,
    filteredCandidates,
    getCandidateById,
    addPositionToCandidate,
    removePositionFromCandidate,
  }
})
