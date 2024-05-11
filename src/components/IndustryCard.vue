<script>
export default {
  name: "IndustryCard",
  props: {
    sector: String,
    titles: Array,
  },
  data() {
    return {
      levels: ["Entry", "Intermediate", "Senior", "Executive"],
      times: ["15 minutes", "30 minutes", "45 minutes", "60 minutes"]
    }
  }
};
</script>

<template>
  <div class="flex p-5">
    <div class="flex-1 flex flex-col justify-between sm:h-108 sm:w-80 xs:w-64 xs:h-96 bg-white rounded-xl transition duration-300 hover:scale-105 hover:shadow-lg">
      <div class="bg-primary text-white sm:text-3xl xs:text-xl font-noyhgeometric-medium p-8 text-center rounded-tl-xl rounded-tr-xl">{{ sector }}</div>
      <form class="items-center">
        <div class="dropdown-container">
          <label class="sm:text-base xs:text-sm">Job Position</label>
          <select class="dropdown sm:h-8 xs:h-6 sm:text-base xs:text-sm">
            <option v-for="title in titles">{{ title }}</option>
          </select>
        </div>
        <div class="dropdown-container">
          <label class="sm:text-base xs:text-sm">Level</label>
          <select class="dropdown sm:h-8 xs:h-6 sm:text-base xs:text-sm">
            <option v-for="level in levels">{{ level }}</option>
          </select>
        </div>
        <div class="dropdown-container">
          <label class="sm:text-base xs:text-sm">Interview Time</label>
          <select class="dropdown sm:h-8 xs:h-6 sm:text-base xs:text-sm">
            <option v-for="time in times">{{ time }}</option>
          </select>
        </div>
      </form>
      <div class="pb-6"><router-link class="bg-primary text-white py-2 px-3 text-xl rounded-lg font-noyhgeometric-medium" to="/call">Start</router-link></div>
    </div>
  </div>
</template>

<style scoped></style>
