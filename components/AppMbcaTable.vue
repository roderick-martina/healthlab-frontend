<template>
    <div class="mt-5 w-full flex flex-wrap border rounded shadow bg-white px-5">
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Age:</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.age}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Birthday:</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.date_of_birth}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">gender:</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.gender}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Doctor:</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.doctor}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Created:</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.created}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Ethnicity</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.ethnic}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Education</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.education}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Last modified</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.last_modified}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Timestamp</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.timestamp}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Bmi</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.bmi_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">SDS Bmi</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.sds_bmi_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Percentile BMI</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.percentile_bmi_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Relative fat mass</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.relative_fat_mass_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Absolute fat mass</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.absolute_fat_mass_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Fat-free mass</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.fat_free_mass_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Skeletal muscle mass</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.skeletal_muscle_mass_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">SMM (Torso)</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.smm_torso_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">SMM (RL)</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.smm_rl_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">SMM (LL)</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.smm_ll_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">SMM (LA)</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.smm_la_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">SMM (RA)</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.smm_ra_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Total Body Water</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.total_body_water_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Extracellular water</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.extracellular_water_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Waist circumference</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.waist_circumference_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">SDS Weight</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.sds_weight_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Weight</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.weight_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Percentile Weight</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.percentile_weight_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">SDS Height</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.sds_height_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Height</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.height_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Percentile Height</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.percentile_height_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Total energy expenditure</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.total_energy_expenditure_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Resting energy expenditure</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.resting_energy_expenditure_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">FFMI</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.ffmi_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">FMI</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.fmi_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Z(FFMI)</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.z_ffmi_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Z(FMI)</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.z_fmi_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Bioelectric impedance vector analysis R</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.bioelectric_impedance_vector_analysis_r_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Bioelectric impedance vector analysis Xc</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.bioelectric_impedance_vector_analysis_xc_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Bioelectric impedance vector analysis Z(R)</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.bioelectric_impedance_vector_analysis_zr_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Bioelectric impedance vector analysis Z(Xc)</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.bioelectric_impedance_vector_analysis_zxc_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">PhaseAngle</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.phaseangle_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">SDS PhaseAngle</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.sds_phaseangle_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Percentile PhaseAngle</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.percentile_phaseangle_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Percentile PhaseAngle</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.percentile_phaseangle_value}}</span>
          </div>
        </div>
        <div class="w-1/3 h-10 flex">
          <div class="w-3/5 flex flex-col justify-center">
            <span class="font-bold">Ecw by Tbw</span>
          </div>
          <div class="w-2/5 flex flex-col justify-center">
            <span>{{result.ecw_by_tbw_value}}</span>
          </div>
        </div>
        <div class="w-full h-10 flex">
          <div class="w-1/5 flex flex-col justify-center">
            <span class="font-bold">Comment</span>
          </div>
          <div class="w-4/5 flex flex-col justify-center">
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
