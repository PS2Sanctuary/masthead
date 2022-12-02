export default class Census {
  private readonly SANCTUARY_CENSUS_URL = "https://census.lithafalcon.cc/";

  public async getItemInfoAsync(itemId: number): Promise<IItemQueryModel> {
    const item = await this.getAsync<{ item_list: Array<IItemQueryModel> }>(
      `item?item_id=${itemId}&c:lang=en&c:censusJSON=false&c:join=item_category^show:name^inject_at:category,`
      + `item_to_weapon^inject_at:item_to_weapon`
      + `(`
      +   `weapon^inject_at:weapon`
      +   `(`
      +     `weapon_ammo_slot^list:1^inject_at:ammo_slots^hide:weapon_id'clip_model_name,`
      +     `weapon_to_fire_group^list:1^inject_at:weapon_to_fire_groups`
      +   `)`
      + `)`
    );

    if (item.item_list.length == 0) {
      throw new MissingDataError("item", itemId);
    }

    return item.item_list[0];
  }

  private async getAsync<T>(query: string): Promise<T> {
    const url = this.SANCTUARY_CENSUS_URL + "get/ps2/" + query;

    const response = await fetch(url);
    if (!response.ok) {
      throw new CensusError();
    }

    const data = await response.json();
    if (data.errorCode) {
      throw new CensusError();
    }

    return data;
  }
}

export class CensusError extends Error {}

export class MissingDataError extends CensusError {
  collection: string = "";
  id: number = 0;

  constructor(collection: string, id: number) {
    super(`An entry with the ID of ${id} was not found in the ${collection} collection`);
    this.collection = collection;
    this.id = id;
  }
}

export enum FactionDefinition {
  All = 0,
  VS = 1,
  NC = 2,
  TR = 3,
  NSO = 4,
}

export interface ILocaleString {
  de: string | null;
  en: string | null;
  es: string | null;
  fr: string | null;
  it: string | null;
  ko: string | null;
  pt: string | null;
  ru: string | null;
  tr: string | null;
  zh: string | null;
}

export interface IItemQueryModel {
  item_id: number;
  item_type_id: number;
  item_category_id: number | null;
  faction_id: FactionDefinition;
  name: ILocaleString | null;
  description: ILocaleString | null;
  activatable_ability_id: number | null;
  passive_ability_id: number | null;
  passive_ability_set_id: number | null;
  skill_set_id: number | null;
  image_set_id: number | null;
  image_id: number | null;
  image_path: string | null;
  hud_image_set_id: number | null;
  max_stack_size: number;
  is_vehicle_weapon: boolean;
  code_factory_name: string;
  category: {
    name: ILocaleString;
  },
  item_to_weapon: {
    item_id: number,
    weapon_id: number,
    weapon: {
      weapon_id: number,
      weapon_group_id: number | null,
      equip_ms: number,
      unequip_ms: number,
      to_iron_sights_ms: number,
      from_iron_sights_ms: number,
      to_iron_sights_anim_ms: number,
      from_iron_sights_anim_ms: number,
      sprint_recovery_ms: number,
      next_use_delay_ms: number,
      turn_modifier: number,
      move_modifier: number,
      heat_bleed_off_rate: number,
      heat_overheat_penalty_ms: number,
      range_description: ILocaleString,
      melee_detect_width: number,
      melee_detect_height: number
      animation_wield_type_name: string,
      min_view_pitch: number,
      max_view_pitch: number,
      ammo_slots: Array<{
        weapon_slot_index: number,
        clip_size: number,
        capacity: number
      }>,
      weapon_to_fire_groups: Array<{
        weapon_id: number,
        fire_group_id: number,
        fire_group_index: number
      }>
    }
  }
}
