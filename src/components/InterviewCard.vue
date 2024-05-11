<script>
export default {
  name: "InterviewCard",
  props: {
    sector: String,
    link: String,
    img: String,
    icon: String,
  },
};
</script>

<template>
  <div class="flex p-5">
    <router-link :to="link">
      <div class="flex flex-col justify-between w-60 h-60 bg-white transition duration-300 rounded-xl hover:scale-105 hover:shadow-lg">
        <div class="bg-primary text-white text-3xl items-center font-noyhgeometric-medium p-3 h-24 rounded-tl-xl rounded-tr-xl flex justify-center">{{ sector }}</div>
        <!--<img :src="img" class="sector-img" />-->
        <i :class="icon" class="text-6xl text-primary m-auto"></i>
      </div>
    </router-link>
  </div>
</template>

<style scoped></style>
