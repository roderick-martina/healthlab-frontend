<template>
  <div class="mt-5 w-full flex flex-wrap border rounded shadow bg-white px-5">
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Identifier:</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.identifier}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Test date:</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.test_date}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Age:</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.age}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Gender:</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.gender}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Height (cm):</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.height_cm}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Height (in):</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.height_in}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">ID 1:</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.id_1}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">ID 2:</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.id_2}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Ethnicity</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.ethnicity}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Operator</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.operator}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Density Model</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.density_model}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">TGV Model</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.tgv_model}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">% Fat</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.fat_percentage}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">% FFM</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.ffm_percentage}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Fat Mass (kg)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.fat_mass_kg}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Fat Mass (lb)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.fat_mass_lb}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Fat Free Mass (kg)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.fat_free_mass_kg}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Fat Free Mass (lb)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.fat_free_mass_lb}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Body Mass (kg)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.body_mass_kg}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Body Mass (lb)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.body_mass_lb}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Est. RMR (kcal/day)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.estimate_rmr_kcal_day}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Est. TEE (kcal/day)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.estimate_tee_kcal_day}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Activity Level</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.activity_level}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Body Volume</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.body_volume}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">BD (kg/L)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.bd_kg_l}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Volume1 (L)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.volume1_l}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Volume2 (L)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.volume2_l}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Volume3 (L)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.volume3_l}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">DFM (kg/L)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.dfm_kg_l}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">DFFM (kg/L)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.dffm_kg_l}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">TGV (L)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.tgv_l}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Predicted TGV (L)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.predicted_tgv_l}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">BSA (cm^2)</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.bsa_cm2}}</span>
      </div>
    </div>
    <div class="w-1/3 h-10 flex">
      <div class="w-2/5 flex flex-col justify-center">
        <span class="font-bold">Comments</span>
      </div>
      <div class="w-3/5 flex flex-col justify-center">
        <span>{{result.comment}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>
</style>
