<script setup lang="ts">
import { ITask } from "../../../core/models/task.model.ts";
import { IResponsible } from "../../../core/models/responsible.model.ts";
import { computed, ref } from "vue";
import { Nullable } from "../../../core/types/nullable.type.ts";
import { TodoTaskStatusFilter } from "../../../core/enums/todo-task-filter.enum.ts";

const props = defineProps<{
  tasks: ITask[];
  responsibleList: IResponsible[];
}>();

const { tasks, responsibleList } = props;

const onDeleteTask = defineEmits(["deletedTask"]);

const taskFilter = ref(TodoTaskStatusFilter.todo);
const taskFilterList = ref([
  TodoTaskStatusFilter.all,
  TodoTaskStatusFilter.todo,
  TodoTaskStatusFilter.done
]);
const selectedResponsible = ref<Nullable<IResponsible>>(null);

const filteredTasks = computed<ITask[]>(() => {
  let filtered: ITask[];

  if (selectedResponsible.value) {
    filtered = tasks.filter(
      (task) => task.responsible.id === selectedResponsible?.value?.id
    );
  } else {
    filtered = tasks;
  }

  if (taskFilter.value === TodoTaskStatusFilter.todo) {
    return filtered.filter((task) => !task.status);
  } else if (taskFilter.value === TodoTaskStatusFilter.done) {
    return filtered.filter((task) => task.status);
  } else {
    return filtered;
  }
});

const getAvatarUrl = (responsible: IResponsible) =>
  `https://ui-avatars.com/api/?name=${responsible.firstname}+${responsible.lastname}`;

const resetFilters = () => {
  taskFilter.value = TodoTaskStatusFilter.todo;
  selectedResponsible.value = null;
};
</script>

<template>
  <div class="flex gap-2">
    <select
      v-model="selectedResponsible"
      class="select select-bordered select-sm w-32 max-w-xs"
    >
      <option v-for="responsible of responsibleList" :value="responsible">
        {{ responsible.firstname }} {{ responsible.lastname }}
      </option>
    </select>

    <select
      v-model="taskFilter"
      class="select select-bordered select-sm w-32 max-w-xs"
    >
      <option v-for="filter of taskFilterList" :value="filter">
        {{ filter }}
      </option>
    </select>

    <button @click="resetFilters" class="btn btn-sm">Réinitialiser</button>
  </div>

  <p class="text-sm text-gray-400 m-2">
    Il reste {{ filteredTasks.filter((task) => !task.status).length }}
    {{
      filteredTasks.filter((task) => !task.status).length === 1
        ? "tâche"
        : "tâches"
    }}
    à faire !
  </p>

  <ul>
    <li
      v-for="(task, index) in filteredTasks"
      class="flex gap-5 mb-5 bg-white p-5 rounded-xl drop-shadow-sm"
      :class="{ 'bg-gray-100': task.status }"
    >
      <input
        v-model="task.status"
        class="checkbox checkbox-md"
        type="checkbox"
      />
      <div>
        <div class="flex items-center gap-3">
          <p :class="{ 'line-through': task.status }">{{ task.title }}</p>
        </div>
        <div class="flex items-center gap-5">
          <p class="text-sm text-gray-400">
            {{ task.estimatedTime }}
            {{ task.estimatedTime !== 1 ? "heures" : "heure" }}
          </p>
          <div class="flex gap-2">
            <div
              class="tooltip"
              :data-tip="`${task.responsible.firstname} ${task.responsible.lastname}`"
            >
              <div class="avatar placeholder">
                <div class="bg-gray-200 text-neutral-content rounded-full w-8">
                  <span class="text-xs text-gray-900">{{
                      task.responsible.firstname.charAt(0) +
                      task.responsible.lastname.charAt(0)
                    }}</span>
                </div>
              </div>
            </div>
            <button
              class="btn btn-circle btn-sm"
              @click="onDeleteTask('deletedTask', index)"
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
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <button
              class="btn btn-circle btn-sm"
              @click="onDeleteTask('deletedTask', index)"
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
