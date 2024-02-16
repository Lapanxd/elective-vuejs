<script setup lang="ts">
import Input from "./components/TodoInput.vue";
import { ref } from "vue";
import List from "./components/List.vue";
import { ITask } from "../../core/models/task.model.ts";
import { IResponsible } from "../../core/models/responsible.model.ts";

const responsibleList: IResponsible[] = [
  { id: 0, firstname: "John", lastname: "Doe" },
  { id: 1, firstname: "Jane", lastname: "Smith" }
];

const tasks = ref([
  {
    title: "test",
    estimatedTime: 1,
    responsible: responsibleList[0],
    status: false
  }
]);
const addTasks = ref(false);

const addTask = (task: ITask) => {
  tasks.value.push(task);
  addTasks.value = false;
};

const archiveTask = (taskIndex: number, task: ITask) => {
  tasks.value.splice(taskIndex, 1);
};
</script>

<template>
  <div
    class="w-3/12 rounded-2xl mr-auto ml-auto mt-10 p-5 bg-gray-50 drop-shadow"
  >
    <h1 class="text-3xl font-medium mb-3">Ma todo list !</h1>
    <button
      v-if="!addTasks"
      @click="addTasks = true"
      class="btn btn-block btn-warning mb-5 drop-shadow-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      Ajouter une nouvelle tâche
    </button>
    <Input v-if="addTasks" :responsible-list @newTask="addTask" /><br />
    <List
      v-if="!addTasks"
      :responsible-list
      :tasks
      @deletedTask="archiveTask"
    ></List>
  </div>
</template>
