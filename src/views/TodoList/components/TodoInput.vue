<script lang="ts" setup>
import { ref } from "vue";
import { Nullable } from "../../../core/types/nullable.type.ts";
import { IResponsible } from "../../../core/models/responsible.model.ts";

defineProps<{
  responsibleList: IResponsible[];
}>();

const emitNewTask = defineEmits(["newTask"]);

const title: Nullable<string> = ref(null);
const estimatedTime: Nullable<number> = ref(null);
const responsible: Nullable<IResponsible> = ref(null);

const validateForm = () => {
  if (!title.value) {
    console.error("Le titre dit être renseigné.");
    return false;
  }

  if (
    !estimatedTime.value ||
    estimatedTime.value <= 0 ||
    typeof estimatedTime.value !== "number"
  ) {
    console.error(
      "Le temps estimé doit être renseigné, et doit être un nombre supérieur à 0."
    );
    return false;
  }

  if (!responsible) {
    console.error("Il faut assigner un responsable à la tâche");
    return false;
  }

  // if (responsible)
  // todo: errror pour le responsable

  return true;
};

const onCreateTask = () => {
  if (!validateForm()) return;

  const newTask = {
    title: title.value,
    estimatedTime: estimatedTime.value,
    responsible: responsible.value,
    status: false
  };

  emitNewTask("newTask", newTask);
};
</script>

<template>
  <div class="bg-white p-3 drop-shadow-sm rounded-xl">
    <h2 class="text-lg mb-2">Créer une nouvelle tâche</h2>
    <div class="flex gap-2 mb-2">
      <input
        v-model="title"
        class="input input-bordered w-full"
        placeholder="Titre de la tâche ..."
      />
      <input
        v-model="estimatedTime"
        class="input input-bordered w-24 max-w-xs"
        placeholder="Durée ..."
        type="number"
      />
    </div>
    <select v-model="responsible" class="select select-bordered max-w-xs mb-2">
      <option v-for="responsible of responsibleList" :value="responsible">
        {{ responsible.firstname }} {{ responsible.lastname }}
      </option>
    </select>
    <button
      @click="onCreateTask"
      class="btn btn-block btn-warning mb-5 drop-shadow-sm"
    >
      Ajouter
    </button>
  </div>
</template>
