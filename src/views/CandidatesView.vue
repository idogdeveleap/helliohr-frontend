<script setup lang="ts">
import { useCandidatesStore } from '@/stores/candidates'
import { useRouter } from 'vue-router'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { ref } from 'vue'
import type { Candidate } from '@/types/candidate'

const store = useCandidatesStore()
const router = useRouter()
const selectedCandidates = ref<Candidate[]>([])

function viewCandidate(id: string) {
  router.push({ name: 'candidate-detail', params: { id } })
}

function compareSelected() {
  const ids = selectedCandidates.value.map((c) => c.id).join(',')
  router.push({ name: 'candidate-compare', query: { ids } })
}

function skillLevelSeverity(level?: string) {
  switch (level) {
    case 'expert':
      return 'success'
    case 'advanced':
      return 'info'
    case 'intermediate':
      return 'warn'
    default:
      return 'secondary'
  }
}
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Candidates</h1>
      <div class="page-actions">
        <InputText v-model="store.searchQuery" placeholder="Search by name or skill..." />
        <Button
          label="Compare Selected"
          icon="pi pi-arrows-h"
          :disabled="selectedCandidates.length !== 2"
          @click="compareSelected"
        />
      </div>
    </div>

    <DataTable
      v-model:selection="selectedCandidates"
      :value="store.filteredCandidates"
      data-key="id"
      paginator
      :rows="10"
      striped-rows
    >
      <Column selection-mode="multiple" header-style="width: 3rem" />
      <Column field="firstName" header="First Name" sortable />
      <Column field="lastName" header="Last Name" sortable />
      <Column field="location" header="Location" sortable />
      <Column header="Skills">
        <template #body="{ data }">
          <div class="skill-tags">
            <Tag
              v-for="skill in data.skills.slice(0, 3)"
              :key="skill.id"
              :value="skill.name"
              :severity="skillLevelSeverity(skill.level)"
            />
            <Tag
              v-if="data.skills.length > 3"
              :value="`+${data.skills.length - 3}`"
              severity="secondary"
            />
          </div>
        </template>
      </Column>
      <Column header="Actions" header-style="width: 8rem">
        <template #body="{ data }">
          <Button
            icon="pi pi-eye"
            text
            rounded
            aria-label="View"
            @click="viewCandidate(data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.page-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.skill-tags {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}
</style>
