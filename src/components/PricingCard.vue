<script>
import axios from 'axios'; 
import store from '../store/index'
import { router } from '../main';

export default {
  name: "PricingCard",
  props: {
    tier: String,
    price: Number,
    description: Array,
  },
  data() {
    return {
      interviewValue: 1,
    };
  },
  computed: {
    totalCost() {
      return this.interviewValue * this.price;
    },
  },
  methods: {
    enforceConstraints() {
      if (this.interviewValue < 1) {
        this.interviewValue = 1;
      } else if (this.interviewValue > 100) {
        this.interviewValue = 100;
      }
    },
    async handleCheckout() {
      if (store.getters.getUser.displayName) {
        try {
          console.log(store.getters.getUserId)
          await store.dispatch('checkout', {quantity: this.interviewValue, userID: store.getters.getUserId});
        } catch (error) {
          console.error('Checkout failed:', error);
        }
      } else {
        router.push('/login');
      }
    }
  },
};
</script>

<template>
  <div class="flex mx-6 mb-10">
    <div class="flex flex-col justify-between xsm:w-108 xsm:h-108 xs:h-96 xs:w-80 rounded-xl bg-white transition duration-300 hover:scale-105 hover:shadow-lg">
      <div class="text-mediumGray xsm:text-4xl xs:text-2xl p-5 rounded-tl-xl rounded-tr-xl border-b-4 border-lightGray">
        <div class="font-noyhgeometric-medium">{{ tier }}</div>
      </div>
      <div class="flex flex-grow pt-2 items-center">
        <div class="justify-center pl-8 mx-auto w-3/5 font-koulen text-mediumGray">
          <div class="xsm:text-7xl xs:text-5xl">
            <span class="xsm:text-xl xs:text-lg align-top">$</span>{{ price }}
          </div>
          <span class="xsm:text-xl xs:text-sm">
            per interview
          </span>
        </div>
        <ul class="flex-grow">
          <li class="flex font-inter items-start text-mediumGray xsm:text-xs xs:text-xxs py-1 text-left xsm:mx-10 xs:mx-2" v-for="point in description">
            <i class="fa fa-check pr-2 text-colorGreen"></i>
            <span>{{ point }}</span>
          </li>
        </ul>
      </div>
      <div class="text-mediumGray xsm:text-lg xs:text-xs font-koulen pb-5">
        <input type="number" v-model="interviewValue" min="1" max="100" @input="enforceConstraints" class="w-12 input-no-spinner text-center" />
        interviews selected <i class="fa fa-xmark"></i> ${{ price }} per interview = ${{ totalCost.toFixed(2) }}
      </div>
      <div class="slidecontainer">
        <input type="range" min="1" max="100" v-model="interviewValue" class="slider">
      </div>
      <div class="p-5"><button class="bg-primary text-white py-2 px-4 text-lg font-noyhgeometric-medium rounded-xl" @click="handleCheckout">Get Started</button></div>
    </div>
  </div>
</template>



<style>

.slidecontainer {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 80%;
  height: 15px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: var(--color-medium-light-gray);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: var(--color-medium-light-gray);
  cursor: pointer;
}
</style>
