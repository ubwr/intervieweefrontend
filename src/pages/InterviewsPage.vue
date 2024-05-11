<script>
import InterviewCard from "../components/InterviewCard.vue";
import sourceData from "../industries.json";
import store from '../store/index'
import { ref, watch } from 'vue';

export default {
  name: "InterviewPage",
  components: {
    InterviewCard,
  },
  setup() {
    const basic = ref(0);
    const premium = ref(0);
    watch(() => store.state.isUserSet, (newIsSet) => {
      if (newIsSet) {
        basic.value = store.getters.getTokens.BASIC;
        premium.value = store.getters.getTokens.PREMIUM;
      } else {
        basic.value = 0;
        premium.value = 0;
      }
    });
    return {
      basic,
      premium,
    };
  },
  data() {
    return {
      sectors: sourceData.sectors,
      available: true,
      completed: false,
    };
  },
  methods: {
    // if they click on the available button, set available bool to true and completed bool to false
    getTokens() {
      const tokenMap = store.getters.getTokens;
      if (Object.keys(tokenMap).length !== 0) {
        this.premium = tokenMap.PREMIUM;
        this.basic = tokenMap.BASIC;
      }
    },
    availableClick() {
      this.available = true;
      this.completed = false;
    },
    // if they click on the completed button, set completed bool to true and available bool to false
    completedClick() {
      this.available = false;
      this.completed = true;
    }
  },
  mounted() {
    this.getTokens();
  },
};
</script>

<template>
  <header class="flex h-64">
    <h1 class="text-mediumGray mx-auto font-noyhgeometric text-5xl mt-32">Interviews</h1>
  </header>
  <span :v-model="basic" class="text-black">
    Basic: {{ basic }}
  </span>
  <span :v-model="premium" class="text-black">
    Premium: {{ premium }}
  </span>
  <!--Premium: {{ premium }}-->
  <div class="bg-lightGray pt-6">
    <div class="flex justify-center gap-8 pb-6 w-64 mx-auto">
      <button class="text-darkGray bg-white w-40 h-10 font-noyhgeometric-medium text-lg rounded-md transition duration-300 hover:bg-[#e5e6e7]" v-on:click="availableClick">Available</button>
      <button class="text-darkGray bg-white w-40 h-10 font-noyhgeometric-medium text-lg rounded-md transition duration-300 hover:bg-[#e5e6e7]" v-on:click="completedClick">Completed</button>
    </div>
    <div class="justify-center flex">
      <div class="flex flex-wrap justify-center max-w-6xl pb-6">
      <!-- cards for interviews available to the user for practice -->
      <InterviewCard v-if="available" v-for="sector in sectors" :sector="sector.sector" :img="sector.img" :icon="sector.icon" :link="sector.link" :industry="sector.industry"></InterviewCard>
      <!-- cards for completed interviews with transcripts and feedback -->
      <InterviewCard v-if="completed" :sector="'test'" :link="'link'" :industry="'bidness'"></InterviewCard>
    </div>
    </div>
  </div>
</template>

<style scoped></style>
