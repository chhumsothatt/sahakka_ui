import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/https";

export const useTaskStore = defineStore("task", () => {
  let getTask = ref([]);

  const updateToApproved = async (task_id) => {
    try {
      const task = getTask.value.find((t) => t.id === task_id);
      if (task) task.status = "approved";
      await api.put(`/api/approved/${task_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateToRejected = async (task_id) => {
    try {
      const task = getTask.value.find((t) => t.id === task_id);
      if (task) task.status = "rejected";
      await api.put(`/api/rejected/${task_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskStore = async () => {
    try {
      const res = await api.get("/api/getTask");
      getTask.value = res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskUpdate = (data) => {
    const task = getTask.value.find((t) => t.id === data.id);

    if (task) Object.assign(task, data);
  };

  let getMyWorkspace = ref([]);
  let getTaskByTeam = ref([]);
  let getTeamByWorkspace = ref([]);
  let isTaskLoading = ref(false);
  let getTeamSection = ref([]);

  const normalizeTeams = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.teams)) return data.teams;
    return [];
  };

  const normalizeSections = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.sections)) return data.sections;
    return [];
  };

  const getMyWorkspaceStore = async () => {
    try {
      const res = await api.get("/api/getMyWorkspace");
      getMyWorkspace.value = res.data.data;
      console.log(getMyWorkspace.value);
      return getMyWorkspace.value;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getTeamByWorkspaceStore = async (workspace_id) => {
    try {
      const res = await api.get(`/api/workspace/${workspace_id}/teams`);
      getTeamByWorkspace.value = normalizeTeams(res.data.data);
      return getTeamByWorkspace.value;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getTaskByTeamStore = async (workspace_id, team_id) => {
    isTaskLoading.value = true;

    try {
      const res = await api.get(
        `/api/workspace/${workspace_id}/team/${team_id}/tasks`,
      );
      getTaskByTeam.value = res.data.data;
      // console.log(getTaskByTeam.value);
      return getTaskByTeam.value;
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      isTaskLoading.value = false;
    }
  };

  const getTeamSectionStore = async (team_id) => {
    try {
      const res = await api.get(`/api/team/${team_id}/sections`);
      getTeamSection.value = normalizeSections(res.data.data);
      return getTeamSection.value;
    } catch (error) {
      console.log(error);
      getTeamSection.value = [];
      return [];
    }
  };

  return {
    updateToApproved,
    updateToRejected,
    getTask,
    getTaskStore,
    handleTaskUpdate,
    getMyWorkspace,
    getMyWorkspaceStore,
    getTaskByTeam,
    isTaskLoading,
    getTaskByTeamStore,
    getTeamByWorkspace,
    getTeamByWorkspaceStore,
    getTeamSection,
    getTeamSectionStore,
  };
});
