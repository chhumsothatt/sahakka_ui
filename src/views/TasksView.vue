<template>
  <div class="container task-shell">
    <div v-if="isTaskLoading" class="task-loading">Loading tasks...</div>

    <div v-if="!isTaskLoading && tasks.length === 0" class="task-state">
      No tasks yet.
    </div>

    <div v-else class="row" :class="{ loading: isTaskLoading }">
      <div class="col-12" v-for="task in tasks" :key="task.id">
        <div class="task-row">
          <span>{{ task.id }}</span>
          <span>{{ task.title }}</span>
          <span>{{ task.description }}</span>
          <span>{{ task.created_by }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/task";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const taskStore = useTaskStore();
const { getTaskByTeam: tasks, isTaskLoading } = storeToRefs(taskStore);

watch(
  () => [route.params.workspace_id, route.params.team_id],
  async ([workspaceId, teamId]) => {
    if (workspaceId && teamId) {
      await taskStore.getTaskByTeamStore(Number(workspaceId), Number(teamId));
    }
  },
  { immediate: true },
);

</script>

<style scoped>
.task-shell {
  position: relative;
}

.task-state {
  color: #888899;
  font-size: 13px;
  padding: 12px 0;
}

.task-loading {
  position: absolute;
  top: -18px;
  right: 0;
  color: #888899;
  font-size: 12px;
}

.row.loading {
  opacity: 0.55;
  transition: opacity 0.15s ease;
}

.task-row {
  display: grid;
  grid-template-columns: 64px 1fr 1.5fr 1fr;
  gap: 16px;
  align-items: center;
  min-height: 42px;
  padding: 10px 0;
  border-bottom: 1px solid #e8e8ed;
  font-size: 13px;
}
</style>
