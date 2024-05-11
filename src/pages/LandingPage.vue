<script>
import PricingCard from "../components/PricingCard.vue";
import FAQcomponent from "../components/FAQcomponent.vue";
import store from '../store/index'
import { router } from '../main';

export default {
  name: "LandingPage",
  components: {
    PricingCard,
    FAQcomponent,
  },
  data() {
    return {
      tiers: [
        {
          tier: "Standard",
          description: [
            "Access to Full Range of Interviewing Scenarios",
            "Access to Interview Transcripts",
            "Limited Interview Feedback",
          ],
          price: 4.99,
        },
        {
          tier: "Premium",
          description: [
          "Access to Full Range of Interviewing Scenarios",
          "Access to Interview Transcripts",
          "Full Interview Feedback",
          "Access to Custom Interviews",
          "Access to Grading Breakdown",
          ],
          price: 6.99,
        },
      ],
      FAQ: [
        {
          question: "What inspired you to start Interviewee?",
          answer:
            "Our mission was to provide individuals with the convenience of preparing for interviews at their own pace, from the comfort of their homes.",
        },
        {
          question: "How does Interviewee work?",
          answer:
            "Users can choose a position to interview for based on sector, industry, and job title. Premium users can provide a specific job description for a fully custom interview.",
        },
        {
          question:
            "What makes your interview simulations different from others?",
          answer:
            "Our interview simulations stand out with completely unique and dynamically generated conversations, delivering authentic job interview experiences.",
        },
        {
          question:
            "What insights and feedback can users expect from Interviewee?",
          answer:
            "Interviewee delivers insights on the quality of responses and questions posed by the user, cultural fit assessments, and identifies skills and strengths of the user.",
        },
        {
          question:
            "How long do users have access to their interview transcripts and feedback?",
          answer:
            "Users have unlimited access to their interview transcripts and feedback, unless they choose to delete their account.",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="flex flex-wrap mt-24 mx-auto justify-center w-10/12 pb-4">
    <div class="justify-center xl:text-left xs:text-center leading-loose xl:w-96 xl:h-108 md:h-60 sm:w-200 xs:h-96 sm:h-72 xs:w-80 font-inter">
      <div class="text-3xl text-darkGray">AI Mock Interviews</div>
      <div class="xl:text-6xl xs:text-5xl text-[#6d6d6d]">
        Interview with Confidence,
        <div class="text-primary">Land with Success.</div>
        <router-link
          to="/login"
          class="text-white xs:text-xl sm:text-2xl xl:text-4xl py-4 px-8 rounded-lg transition duration-300 ease-in-out bg-primary hover:bg-darkBlue"
          >Sign Up Now</router-link
        >
      </div>
    </div>
    <div class="xs:w-full md:w-160">
      <div class="aspect-[16/9]">
        <iframe
          class="inset-0 w-full h-full rounded-xl"
          src="https://www.youtube.com/embed/linlz7-Pnvw"
          title="Switzerland in 8K ULTRA HD HDR - Heaven of Earth (60 FPS)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
  <div class="text-darkGray font-newsreader w-4/5 justify-center flex mx-auto md:text-xl xs:text-md my-2">
    Unleash Your Potential Through Tailored Professional Interview Practice
  </div>
  <div class="mt-10 bg-lightGray z-0">
    <h1 class="py-10 px-5 font-newsreader text-mediumGray md:text-5xl xs:text-4xl">Pricing</h1>
    <div class="flex flex-wrap justify-center">
      <PricingCard
        v-for="tier in tiers"
        :tier="tier.tier"
        :description="tier.description"
        :price="tier.price"
      ></PricingCard>
    </div>
  </div>
  <div class="bg-lightGray">
    <h1 class="pb-10 px-5 font-newsreader text-mediumGray md:text-5xl xs:text-4xl">
      Frequently Asked Questions
    </h1>
    <div class="xs:w-4/5 md:w-3/5 mx-auto">
      <FAQcomponent
        v-for="question in FAQ"
        :question="question.question"
        :answer="question.answer"
      ></FAQcomponent>
    </div>
  </div>
  <div class="bg-lightGray pb-5">
    <h1 class="pt-10 px-5 font-newsreader text-mediumGray md:text-5xl xs:text-4xl">About</h1>
    <div class="xs:w-4/5 md:w-3/5 mx-auto">
      <p class="font-inter text-mediumGray md:text-base xs:text-sm">
        Experience the future of interview preparation with Interviewee. Our AI
        mock interview application offers realistic simulations that replicate
        genuine job interviews. Receive instant feedback, personalized insights,
        and specific recommendations for improvement, empowering you to shine in
        any interview. Elevate your skills, gain confidence, and unlock your
        potential with Interviewee – the ultimate platform for interview
        success.
      </p>
      <h2 class="pt-10 font-newsreader text-mediumGray md:text-3xl xs:text-2xl">Our Mission</h2>
      <p class="font-inter text-mediumGray md:text-base xs:text-sm">
        At Interviewee, we harness the power of AI to offer transformative mock
        interview simulations, ensuring every candidate is equipped with
        insights, confidence, and tools for unmatched interview success.
      </p>
      <h2 class="pt-10 font-newsreader text-mediumGray md:text-3xl xs:text-2xl">Our Vision</h2>
      <p class="font-inter text-mediumGray md:text-base xs:text-sm">
        Envisioning a future where every job-seeker feels empowered and
        prepared, Interviewee aims to be the global beacon for interview
        readiness and career advancement.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
