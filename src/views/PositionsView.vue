<script setup lang="ts">
import { usePositionsStore } from '@/stores/positions'
import { useRouter } from 'vue-router'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const store = usePositionsStore()
const router = useRouter()

function viewPosition(id: string) {
  router.push({ name: 'position-detail', params: { id } })
}
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Open Positions</h1>
    </div>

    <DataTable :value="store.openPositions" data-key="id" striped-rows>
      <Column field="title" header="Title" sortable />
      <Column field="department" header="Department" sortable />
      <Column field="location" header="Location" sortable />
      <Column field="type" header="Type">
        <template #body="{ data }">
          <Tag :value="data.type" />
        </template>
      </Column>
      <Column header="Candidates" header-style="width: 8rem">
        <template #body="{ data }">
          {{ data.candidateIds.length }}
        </template>
      </Column>
      <Column header="Actions" header-style="width: 8rem">
        <template #body="{ data }">
          <Button
            icon="pi pi-eye"
            text
            rounded
            aria-label="View"
            @click="viewPosition(data.id)"
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
</style>
