<script setup>
import { useAuthStore } from "@/stores/auth";
import { useTaskStore } from "@/stores/task";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const authStore = useAuthStore();
const taskStore = useTaskStore();
const { getMe } = storeToRefs(authStore);
const { getTask } = storeToRefs(taskStore);
onMounted(async () => {
  await authStore.getMeStore();
  await taskStore.getTaskStore();
});

const updateToApproved = async (task_id) => {
  try {
    await taskStore.updateToApproved(task_id);
  } catch (error) {
    console.log(error);
  }
};

const updateToRejected = async (task_id) => {
  try {
    await taskStore.updateToRejected(task_id);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="p-10">
    <h1>Hello {{ getMe.name }}</h1>
    <h1>Email : {{ getMe.email }}</h1>
    <div class="d-flex gap-10 my-5" v-for="task in getTask" :key="task.id">
      <h2>Title : {{ task.title }}</h2>
      <h2>Status : {{ task.status }}</h2>
      <button
        class="btn btn-danger rounded-3"
        @click="updateToRejected(task.id)"
      >
        Rejected
      </button>
      <button
        class="btn btn-success rounded-3"
        @click="updateToApproved(task.id)"
      >
        Approved
      </button>
    </div>
  </div>
</template>
