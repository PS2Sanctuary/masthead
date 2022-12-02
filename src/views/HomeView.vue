<script setup lang="ts">
import { onMounted } from "vue";
import { reactive } from "vue";
import Census from "@/services/census";
import type { IItemQueryModel } from "@/services/census";
import WeaponInfo from "../components/WeaponInfo.vue";

const state: { item: IItemQueryModel | null } = reactive({ item: null });

onMounted(async () => {
  // TODO: Sometime, query all weapons
  // https://census.lithafalcon.cc/get/ps2/item_to_weapon?c:limit=10000&c:join=item^show:name'faction_id'image_path&c:timing=true

  try {
    state.item = await new Census().getItemInfoAsync(78);
  } catch {
    console.error("Failed to retrieve item from Census");
  }
});
</script>

<template>
  <main>
    <WeaponInfo v-if="state.item" :weapon="state.item" />
  </main>
</template>
