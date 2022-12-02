<script setup lang="ts">
import { type IItemQueryModel } from '@/services/census';

defineProps<{
  header: string;
  stats: Array<{
    name: string,
    value: any,
    description: string
  }>;
}>();
</script>

<template>
  <Panel :header="header" class="mt-3">
    <DataTable :value="stats" stripedRows responsiveLayout="scroll">
      <Column field="name" header="Name" />
      <Column field="value" header="Value" />
      <Column field="description" header="Description" />
    </DataTable>
  </Panel>
</template>
