<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'

const menuItems = ref([
  { label: 'Candidates', icon: 'pi pi-users', route: '/candidates' },
  { label: 'Positions', icon: 'pi pi-briefcase', route: '/positions' },
])
</script>

<template>
  <div class="app-layout">
    <Menubar :model="menuItems">
      <template #start>
        <span class="app-title">Hellio HR</span>
      </template>
      <template #item="{ item }">
        <RouterLink :to="item.route" class="menu-link">
          <i :class="item.icon" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </template>
    </Menubar>

    <main class="app-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.app-title {
  font-weight: 700;
  font-size: 1.25rem;
  margin-right: 2rem;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: inherit;
}

.app-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
