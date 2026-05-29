<template>
  <div class="app-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <button
        v-for="w in workspace"
        :key="w.workspace_id"
        class="workspace-button"
        type="button"
        @click="selectWorkspace(Number(w.workspace_id))"
      >
        <div
          class="workspace-header"
          :class="{ active: activeWorkspace === Number(w.workspace_id) }"
        >
          <span class="workspace-name">{{ w?.workspace_name }}</span>
          <ChevronDown :size="14" />
        </div>
      </button>

      <div class="px-3 mb-3">
        <button class="btn-new-team">
          <Plus :size="14" />
          New team
        </button>
      </div>

      <div class="sidebar-section-label">Team</div>

      <nav class="sidebar-nav">
        <RouterLink
          v-for="t in teams"
          :key="t.team_id"
          :to="{
            name: 'tasks',
            params: {
              workspace_id: activeWorkspace,
              team_id: t.team_id,
            },
          }"
          class="text-decoration-none"
        >
          <div
            class="sidebar-item"
            :class="{ active: activeTeam === Number(t.team_id) }"
            @click="activeTeam = Number(t.team_id)"
          >
            <span class="item-title me-2">{{ t.team_id }}</span>
            <span class="item-title">{{ t.title ?? t.team_name ?? t.name }}</span>
            <p class="item-subtitle">{{ t.description }}</p>
          </div>
        </RouterLink>
      </nav>
    </aside>

    <!-- Main Area -->
    <div class="main-area">
      <!-- Tab Bar -->
      <div class="tab-bar">
        <RouterLink
          v-for="tab in tabs"
          :key="tab.key"
          :to="tab.to"
          class="tab-item"
          active-class="active"
        >
          {{ tab.label }}
        </RouterLink>
      </div>

      <!-- Content -->
      <div class="page-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTaskStore } from "@/stores/task";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();
const {
  getMyWorkspace: workspace,
  getTeamByWorkspace: team,
  getTeamSection: teamSections,
} = storeToRefs(taskStore);
const route = useRoute();
const router = useRouter();
const LAST_WORKSPACE_KEY = "last_workspace_id";
const DEFAULT_TABS = [
  { key: "tasks", label: "Tasks", routeName: "tasks" },
  { key: "issues", label: "Issues", routeName: "issues" },
  { key: "document", label: "Document", routeName: "document" },
  { key: "activity", label: "Activity", routeName: "activity" },
];
const TAB_ALIASES = {
  task: "tasks",
  tasks: "tasks",
  issue: "issues",
  issues: "issues",
  doc: "document",
  docs: "document",
  document: "document",
  documents: "document",
  activity: "activity",
  activities: "activity",
  team_activity: "activity",
  "team-activity": "activity",
};
const TAB_BY_KEY = DEFAULT_TABS.reduce((tabs, tab) => {
  tabs[tab.key] = tab;
  return tabs;
}, {});

const activeTeam = ref(null);
const isChangingWorkspace = ref(false);
const activeWorkspace = computed(() => {
  const routeWorkspaceId = Number(route.params.workspace_id);
  if (routeWorkspaceId) return routeWorkspaceId;

  return Number(workspace.value?.[0]?.workspace_id) || null;
});
const teams = computed(() => team.value ?? []);

const tabs = computed(() => {
  if (!activeTeam.value) return [];

  const apiTabs = teamSections.value
    .map((section) => {
      const key = getTabKey(section);
      const tab = TAB_BY_KEY[key];

      if (!tab) return null;

      return {
        ...tab,
        label: getSectionLabel(section, tab.label),
      };
    })
    .filter(Boolean);
  const visibleTabs = apiTabs.length ? apiTabs : DEFAULT_TABS;

  return visibleTabs.map((tab) => ({
    ...tab,
    to: {
      name: tab.routeName,
      params: {
        workspace_id: activeWorkspace.value,
        team_id: activeTeam.value,
      },
    },
  }));
});

watch(
  () => route.params.team_id,
  async (teamId) => {
    activeTeam.value = teamId ? Number(teamId) : null;

    if (activeTeam.value) {
      await taskStore.getTeamSectionStore(activeTeam.value);
    }
  },
  { immediate: true },
);

watch(
  () => route.params.workspace_id,
  async (workspaceId) => {
    if (workspaceId) {
      const loadedTeams = await taskStore.getTeamByWorkspaceStore(
        Number(workspaceId),
      );

      if (route.name === "team") {
        goToFirstTeam(Number(workspaceId), loadedTeams, "replace");
      }
    }
  },
);

onMounted(async () => {
  const workspaces = await taskStore.getMyWorkspaceStore();
  const workspaceId =
    Number(route.params.workspace_id) ||
    getActiveWorkspaceId(workspaces) ||
    getLastWorkspaceId(workspaces) ||
    Number(workspaces?.[0]?.workspace_id);

  if (!workspaceId) return;

  const loadedTeams = await taskStore.getTeamByWorkspaceStore(workspaceId);

  if (route.name === "workspace-entry") {
    goToFirstTeam(workspaceId, loadedTeams, "replace");
  }
});

async function selectWorkspace(workspaceId) {
  if (
    !workspaceId ||
    activeWorkspace.value === workspaceId ||
    isChangingWorkspace.value
  ) {
    return;
  }

  isChangingWorkspace.value = true;
  try {
    const loadedTeams = await taskStore.getTeamByWorkspaceStore(workspaceId);
    goToFirstTeam(workspaceId, loadedTeams, "push");
  } finally {
    isChangingWorkspace.value = false;
  }
}

function goToFirstTeam(workspaceId, loadedTeams, mode = "push") {
  const firstTeamId = Number(loadedTeams?.[0]?.team_id);
  localStorage.setItem(LAST_WORKSPACE_KEY, String(workspaceId));

  if (firstTeamId) {
    activeTeam.value = firstTeamId;
    router[mode]({
      name: "tasks",
      params: {
        workspace_id: workspaceId,
        team_id: firstTeamId,
      },
    });
  } else {
    activeTeam.value = null;
    router[mode]({
      name: "team",
      params: {
        workspace_id: workspaceId,
      },
    });
  }
}

function getLastWorkspaceId(workspaces) {
  const lastWorkspaceId = Number(localStorage.getItem(LAST_WORKSPACE_KEY));

  if (
    lastWorkspaceId &&
    workspaces?.some((w) => Number(w.workspace_id) === lastWorkspaceId)
  ) {
    return lastWorkspaceId;
  }

  return null;
}

function getActiveWorkspaceId(workspaces) {
  const activeWorkspace = workspaces?.find((workspace) => {
    return (
      workspace?.is_active ||
      workspace?.active ||
      workspace?.is_current ||
      workspace?.current
    );
  });

  return Number(activeWorkspace?.workspace_id) || null;
}

function getSectionKey(section) {
  const rawKey =
    section?.key ??
    section?.route_name ??
    section?.route ??
    section?.slug ??
    section?.name ??
    section?.title ??
    "";

  return String(rawKey).trim().toLowerCase().replace(/\s+/g, "-");
}

function getTabKey(section) {
  return TAB_ALIASES[getSectionKey(section)] ?? getSectionKey(section);
}

function getSectionLabel(section, fallback) {
  return (
    section?.label ??
    section?.title ??
    section?.name ??
    section?.section_name ??
    fallback
  );
}
</script>

<style scoped>
.app-wrapper {
  display: flex;
  height: 100vh;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  background: #f5f5f7;
  color: #1a1a2e;
}

/* Sidebar */
.sidebar {
  width: 200px;
  min-width: 200px;
  background: #fff;
  border-right: 1px solid #e8e8ed;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 16px;
}

.workspace-button {
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
}

.workspace-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px;
  border-bottom: 1px solid #f0f0f5;
  margin-bottom: 12px;
  cursor: pointer;
}
.workspace-header:hover,
.workspace-header.active {
  background: #f4f4f8;
}

.workspace-name {
  font-size: 12.5px;
  font-weight: 600;
}

.btn-new-team {
  width: 100%;
  font-size: 11.5px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 6px;
  border: 1.5px solid #d1d1db;
  background: #fff;
  color: #444;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.btn-new-team:hover {
  background: #f4f4f8;
}

.sidebar-section-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9999aa;
  padding: 0 14px 6px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 6px;
}

.sidebar-item {
  border-radius: 8px;
  padding: 9px 10px;
  cursor: pointer;
  transition: background 0.12s;
}
.sidebar-item:hover {
  background: #f4f4f8;
}
.sidebar-item.active {
  background: #f0eeff;
}

.item-title {
  font-size: 12.5px;
  font-weight: 600;
  color: #1a1a2e;
}

.item-subtitle {
  font-size: 10.5px;
  color: #888899;
  margin: 2px 0 0;
}

/* Main Area */
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Tab Bar */
.tab-bar {
  display: flex;
  padding: 0 28px;
  background: #fff;
  border-bottom: 1px solid #e8e8ed;
}

.tab-item {
  font-size: 13px;
  font-weight: 500;
  color: #888899;
  padding: 12px 18px;
  border-bottom: 2.5px solid transparent;
  text-decoration: none;
  transition: all 0.15s;
}
.tab-item:hover {
  color: #1a1a2e;
}
.tab-item.active {
  color: #1a1a2e;
  font-weight: 700;
  border-bottom-color: #7c6af7;
}

/* Content */
.page-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px;
  background: #f5f5f7;
}
</style>
