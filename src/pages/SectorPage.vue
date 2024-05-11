<script>
import sourceData from "../industries.json";
import IndustryCard from "../components/IndustryCard.vue";

export default {
  name: "SectorPage",
  components: {
    IndustryCard,
  },
  computed: {
    // get the name of the selected sector
    sectorName() {
      return this.$route.params.sector;
    },
    // get the list of industries from the selected sector
    getIndustries() {
      const thisSector = sourceData.sectors.find(
        (sector) => sector.sector === this.sectorName
      );
      const industries = Object.entries(thisSector.industry).map(
        ([name, titles]) => ({
          name,
          titles,
        })
      );
      return industries;
    },
  },
  data() {
    return {
      industries: [],
    };
  },
  created() {
    this.industries = this.getIndustries;
  },
};
</script>

<template>
  <header class="flex h-64">
    <h1 class="text-mediumGray mx-auto font-noyhgeometric text-5xl mt-32">{{ sectorName }}</h1>
  </header>
  <div class="bg-lightGray justify-center flex py-10">
    <div class="flex flex-wrap justify-center max-w-6xl">
      <IndustryCard v-for="industry in industries" :key="industry.name" :sector="industry.name" :titles="industry.titles"></IndustryCard>
    </div>
  </div>
</template>

<style scoped></style>
