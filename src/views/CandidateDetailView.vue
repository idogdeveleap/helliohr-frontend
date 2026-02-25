<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useCandidatesStore } from '@/stores/candidates'
import { usePositionsStore } from '@/stores/positions'
import { skillLevelSeverity } from '@/composables/useSkillLevelSeverity'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Panel from 'primevue/panel'

const route = useRoute()
const router = useRouter()
const candidatesStore = useCandidatesStore()
const positionsStore = usePositionsStore()

const candidate = computed(() => candidatesStore.getCandidateById(route.params.id as string))

const linkedPositions = computed(
  () =>
    candidate.value?.positionIds.map((id) => positionsStore.getPositionById(id)).filter(Boolean) ??
    [],
)
</script>

<template>
  <div v-if="candidate">
    <div class="page-header">
      <div>
        <Button icon="pi pi-arrow-left" text @click="router.back()" />
        <h1 style="display: inline; margin-left: 0.5rem">
          {{ candidate.firstName }} {{ candidate.lastName }}
        </h1>
      </div>
    </div>

    <div class="profile-grid">
      <Card>
        <template #title>Contact Information</template>
        <template #content>
          <p><strong>Email:</strong> {{ candidate.email }}</p>
          <p v-if="candidate.phone"><strong>Phone:</strong> {{ candidate.phone }}</p>
          <p v-if="candidate.location"><strong>Location:</strong> {{ candidate.location }}</p>
        </template>
      </Card>

      <Card v-if="candidate.summary">
        <template #title>Summary</template>
        <template #content>
          <p>{{ candidate.summary }}</p>
        </template>
      </Card>

      <Card>
        <template #title>Skills</template>
        <template #content>
          <div class="skill-tags">
            <Tag
              v-for="skill in candidate.skills"
              :key="skill.id"
              :value="`${skill.name}${skill.yearsOfExperience ? ` (${skill.yearsOfExperience}y)` : ''}`"
              :severity="skillLevelSeverity(skill.level)"
            />
          </div>
        </template>
      </Card>

      <Panel header="Experience" toggleable>
        <div v-for="exp in candidate.experience" :key="exp.id" class="timeline-item">
          <h4>{{ exp.title }} — {{ exp.company }}</h4>
          <p class="date-range">{{ exp.startDate }} — {{ exp.endDate ?? 'Present' }}</p>
          <p v-if="exp.description">{{ exp.description }}</p>
          <div v-if="exp.technologies?.length" class="skill-tags">
            <Tag v-for="tech in exp.technologies" :key="tech" :value="tech" severity="secondary" />
          </div>
        </div>
      </Panel>

      <Panel header="Education" toggleable>
        <div v-for="edu in candidate.education" :key="edu.id" class="timeline-item">
          <h4>{{ edu.degree }} in {{ edu.field }}</h4>
          <p>{{ edu.institution }}</p>
          <p class="date-range">{{ edu.startDate }} — {{ edu.endDate ?? 'Present' }}</p>
        </div>
      </Panel>

      <Card v-if="candidate.documents.length">
        <template #title>Documents</template>
        <template #content>
          <ul class="document-list">
            <li v-for="doc in candidate.documents" :key="doc.id">
              <a :href="doc.url" target="_blank">
                <i class="pi pi-file-pdf" />
                {{ doc.name }}
              </a>
              <span class="date-range">Uploaded: {{ doc.uploadedAt }}</span>
            </li>
          </ul>
        </template>
      </Card>

      <Card v-if="linkedPositions.length">
        <template #title>Linked Positions</template>
        <template #content>
          <ul>
            <li v-for="pos in linkedPositions" :key="pos!.id">
              <router-link :to="{ name: 'position-detail', params: { id: pos!.id } }">
                {{ pos!.title }}
              </router-link>
            </li>
          </ul>
        </template>
      </Card>
    </div>
  </div>

  <div v-else>
    <p>Candidate not found.</p>
    <Button label="Back to Candidates" @click="router.push({ name: 'candidates' })" />
  </div>
</template>

<style scoped>
.page-header {
  margin-bottom: 1.5rem;
}

.profile-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-tags {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.timeline-item {
  margin-bottom: 1.5rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.date-range {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
}

.document-list {
  list-style: none;
  padding: 0;
}

.document-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
