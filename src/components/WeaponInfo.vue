<script setup lang="ts">
import WeaponInfoBlockVue from './WeaponInfoBlock.vue';
import { FactionDefinition, type IItemQueryModel } from '@/services/census';
import { computed } from 'vue';

const props = defineProps<{
  weapon: IItemQueryModel;
}>();

const basicInfo = computed(() => {
  return [
    {
      name: 'test',
      value: 0,
      description: 'desc'
    }
  ]
});

function getRawQueryString(itemId: number): string {
  return `https://census.lithafalcon.cc/get/ps2/item?item_id=${itemId}&c:lang=en&c:join=item_to_weapon^inject_at:item_to_weapon(weapon(weapon_ammo_slot^list:1^inject_at:ammo_slots,weapon_to_fire_group^list:1^inject_at:weapon_to_fire_groups(fire_group^inject_at:fire_group(fire_group_to_fire_mode^inject_at:fire_group_to_fire_modes^list:1(fire_mode_2^inject_at:fire_mode(player_state_group_2^inject_at:player_state_groups^list:1,fire_mode_to_projectile^inject_at:fire_mode_to_projectile(projectile^on:projectile_id^to:projectile_id^inject_at:projectile)))))))&c:censusJSON=false`
}
</script>

<template>
  <div class="flex">
    <Card>
      <template #header>
          <img alt="Weapon image" :src="'https://census.daybreakgames.com' + weapon.image_path" class="p-2 max-w-20rem" />
      </template>
      <template #title>
          {{ weapon.name?.en ?? "Unknown weapon" }}
          <Tag :value="weapon.category.name.en ?? 'No category'" />
          <Tag :value="FactionDefinition[weapon.faction_id]" class="ml-2" />
      </template>
      <template #subtitle>
        {{ weapon.description?.en ?? "Uh oh! We don't know how you've managed this, but Masthead doesn't have any data for this weapon." }}
      </template>
      <template #footer>
        <a :href="('https://planetside.fandom.com/wiki/' + weapon.name?.en?.replace(' ', '_'))" target="_blank" style="all: unset">
          <Button icon="pi pi-book" label="Wiki Entry" />
        </a>
        <a :href="getRawQueryString(weapon.item_id)" target="_blank" class="ml-2" style="all: unset;">
          <Button icon="pi pi-database" label="Raw Data" />
        </a>
    </template>
    </Card>
  </div>
  <WeaponInfoBlockVue header="Basic Information" :weapon="weapon" class="mt-3" :stats="basicInfo" />
</template>
