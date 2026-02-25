<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useCandidatesStore } from '@/stores/candidates'
import { skillLevelSeverity } from '@/composables/useSkillLevelSeverity'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()
const store = useCandidatesStore()

const candidateIds = computed(() => {
  const ids = route.query.ids as string
  return ids ? ids.split(',') : []
})

const candidates = computed(() =>
  candidateIds.value.map((id) => store.getCandidateById(id)).filter(Boolean),
)
</script>

<template>
  <div>
    <div class="page-header">
      <Button icon="pi pi-arrow-left" text @click="router.back()" />
      <h1>Compare Candidates</h1>
    </div>

    <div v-if="candidates.length === 2" class="compare-grid">
      <Card v-for="candidate in candidates" :key="candidate!.id" class="compare-card">
        <template #title> {{ candidate!.firstName }} {{ candidate!.lastName }} </template>
        <template #subtitle>{{ candidate!.location }}</template>
        <template #content>
          <section v-if="candidate!.summary" class="compare-section">
            <h4>Summary</h4>
            <p>{{ candidate!.summary }}</p>
          </section>

          <section class="compare-section">
            <h4>Skills</h4>
            <div class="skill-tags">
              <Tag
                v-for="skill in candidate!.skills"
                :key="skill.id"
                :value="`${skill.name}${skill.yearsOfExperience ? ` (${skill.yearsOfExperience}y)` : ''}`"
                :severity="skillLevelSeverity(skill.level)"
              />
            </div>
          </section>

          <section class="compare-section">
            <h4>Experience</h4>
            <div v-for="exp in candidate!.experience" :key="exp.id" class="timeline-item">
              <strong>{{ exp.title }}</strong> — {{ exp.company }}
              <br />
              <span class="date-range">{{ exp.startDate }} — {{ exp.endDate ?? 'Present' }}</span>
            </div>
          </section>

          <section class="compare-section">
            <h4>Education</h4>
            <div v-for="edu in candidate!.education" :key="edu.id" class="timeline-item">
              <strong>{{ edu.degree }} in {{ edu.field }}</strong>
              <br />
              {{ edu.institution }}
            </div>
          </section>
        </template>
      </Card>
    </div>

    <div v-else>
      <p>Please select exactly 2 candidates to compare.</p>
      <Button label="Back to Candidates" @click="router.push({ name: 'candidates' })" />
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.compare-section {
  margin-bottom: 1.5rem;
}

.compare-section h4 {
  margin-bottom: 0.5rem;
  color: var(--p-text-muted-color);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.skill-tags {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.timeline-item {
  margin-bottom: 0.75rem;
}

.date-range {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
}
</style>
