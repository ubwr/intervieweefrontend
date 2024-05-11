<script>
export default {
  name: "PricingCard",
  props: {
    question: String,
    answer: String,
  },
  data() {
    return {
      panelHeight: 0,
    };
  },
  methods: {
    openAccordion(event) {
      const button = event.target;
      const panel = button.nextElementSibling;
      button.classList.toggle("active");
      this.panelHeight = button.classList.contains("active") ? panel.scrollHeight : 0;
    },
  },
};
</script>

<template>
    <div class="text-left font-inter text-darkGray border border-solid border-2px border-lightGray">
      <button class="accordion rounded-lg" v-on:click="openAccordion">
        {{ question }}
      </button>
      <div class="panel rounded-lg" :style="{ maxHeight: panelHeight + 'px' }">
        <div class="panel-content" ref="panelContent">
          <p>{{ answer }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .accordion {
    background-color: #e0dede;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    text-align: left;
    transition: background-color 0.3s;
  }
  
  .active,
  .accordion:hover {
    background-color: #ccc;
  }
  
  .panel {
    background-color: white;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-in-out;
  }
  
  .panel-content {
    padding: 18px;
  }
  
  </style>
  