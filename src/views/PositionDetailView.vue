<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { usePositionsStore } from '@/stores/positions'
import { useCandidatesStore } from '@/stores/candidates'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()
const positionsStore = usePositionsStore()
const candidatesStore = useCandidatesStore()

const position = computed(() => positionsStore.getPositionById(route.params.id as string))

const linkedCandidates = computed(() =>
  position.value?.candidateIds
    .map((id) => candidatesStore.getCandidateById(id))
    .filter(Boolean) ?? [],
)
</script>

<template>
  <div v-if="position">
    <div class="page-header">
      <Button icon="pi pi-arrow-left" text @click="router.back()" />
      <h1>{{ position.title }}</h1>
      <Tag :value="position.status" :severity="position.status === 'open' ? 'success' : 'secondary'" />
    </div>

    <div class="detail-grid">
      <Card>
        <template #title>Details</template>
        <template #content>
          <p v-if="position.department"><strong>Department:</strong> {{ position.department }}</p>
          <p v-if="position.location"><strong>Location:</strong> {{ position.location }}</p>
          <p><strong>Type:</strong> {{ position.type }}</p>
          <p><strong>Created:</strong> {{ position.createdAt }}</p>
        </template>
      </Card>

      <Card>
        <template #title>Description</template>
        <template #content>
          <p>{{ position.description }}</p>
        </template>
      </Card>

      <Card>
        <template #title>Requirements</template>
        <template #content>
          <ul>
            <li v-for="(req, i) in position.requirements" :key="i">{{ req }}</li>
          </ul>
          <div v-if="position.niceToHave?.length">
            <h4>Nice to Have</h4>
            <ul>
              <li v-for="(item, i) in position.niceToHave" :key="i">{{ item }}</li>
            </ul>
          </div>
        </template>
      </Card>

      <Card>
        <template #title>Candidates ({{ linkedCandidates.length }})</template>
        <template #content>
          <ul v-if="linkedCandidates.length">
            <li v-for="candidate in linkedCandidates" :key="candidate!.id">
              <router-link :to="{ name: 'candidate-detail', params: { id: candidate!.id } }">
                {{ candidate!.firstName }} {{ candidate!.lastName }}
              </router-link>
            </li>
          </ul>
          <p v-else>No candidates linked to this position yet.</p>
        </template>
      </Card>
    </div>
  </div>

  <div v-else>
    <p>Position not found.</p>
    <Button label="Back to Positions" @click="router.push({ name: 'positions' })" />
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.detail-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
