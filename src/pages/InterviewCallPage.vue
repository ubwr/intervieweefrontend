<script>
import { ref, watch, onBeforeUnmount } from 'vue';
import store from '../store/index'
import { router } from '../main';

export default {
  name: "InterviewCallPage",
  setup() {
    const speak = ref(true);
    let recognition = null;
    let isRecording = false;
    let response = '';
    let transcript = '';
    const timerValue = ref(30*60); // 30 minutes in seconds (30 * 60)
    let timer = null;
    const timerStarted = ref(false);

    async function getResponse(text) {
      console.log('Starting audio playback');
      try {
        const audioBlob = await store.dispatch('getInterviewerResponse', text);
        console.log(audioBlob)
        const audioUrl = URL.createObjectURL(audioBlob.audioData);
        const audio = new Audio(audioUrl);
        audio.play();
        console.log(audioBlob.newText)
        console.log('Audio is playing');
      } catch (error) {
        console.error('Error:', error);
      }
      console.log("audio has concluded")
    }

    function toggleRecording() {
      timerStarted.value = true;
      if (speak.value) {
        window.SpeechRecognition = window.webkitSpeechRecognition;
        if (!recognition) {
          recognition = new SpeechRecognition();
          recognition.interimResults = true;

          recognition.addEventListener('result', (e) => {
            transcript = Array.from(e.results)
              .map((result) => result[0])
              .map((result) => result.transcript)
              .join('');
          });

          recognition.addEventListener('end', () => {
            response += ' ' + transcript;
            transcript = '';
            if (isRecording) {
              recognition.start();
            } else {
              console.log(response);
              getResponse(response);
              response = '';
            }
          });
        }

        if (!isRecording) {
          recognition.start();
          isRecording = true;
        } else {
          recognition.stop();
          isRecording = false;
        }
      }
    }

    function startTimer() {
      console.log('started')
      timer = setInterval(() => {
        if (timerValue.value > 0) {
          timerValue.value -= 1;
          updateFormattedTime(); // Call updateFormattedTime to update the formatted time
        } else {
          clearInterval(timer);
        }
      }, 1000); // Update the timer every second (1000 milliseconds)
    }

    function stopTimer() {
      clearInterval(timer);
      timerValue.value = 0;
    }

    const formattedTime = ref('');

    function updateFormattedTime() {
      const minutes = Math.floor(timerValue.value / 60);
      const seconds = timerValue.value % 60;
      formattedTime.value = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    onBeforeUnmount(() => {
      stopTimer();
    });

    watch(() => timerStarted.value, (newIsSet) => {
      if (newIsSet) {
        console.log('tst')
        startTimer();
      }
    });

    return {
      toggleRecording,
      timerValue,
      formattedTime,
    };
  },
};
</script>


<template>
  <div class="h-screen bg-primary justify-center items-center flex">
    <div class="w-14 text-darkGray top-2 right-6 fixed mt-16 text-3xl font-koulen px-2">{{ formattedTime }}</div>
    <div class="flex flex-wrap justify-center items-center gap-x-8 mx-auto justify-center">
      <div class="caller-box lg:h-80 lg:w-128 xs:h-52 xs:w-80 border border-lightGray border-4">
        <div class="lg:w-56 lg:h-56 xs:w-32 xs:h-32 bg-darkGray rounded-full flex items-center justify-center border border-lightGray border-4">
          <i class="fas fa-user-tie lg:text-8xl xs:text-5xl text-lightGray"></i>
        </div>
      </div>
      <div class="caller-box lg:h-80 lg:w-128 xs:h-52 xs:w-80 border border-mediumGray border-4">
        <div class="lg:w-56 lg:h-56 xs:w-32 xs:h-32 bg-darkGray rounded-full flex items-center justify-center border border-mediumGray border-4">
          <i class="fas fa-user lg:text-8xl xs:text-5xl text-lightGray"></i>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 w-96 flex justify-center mx-auto md:h-40 xs:h-32 justify-center flex gap-5">
      <button class="interview-call-button md:h-28 md:w-28 xs:h-16 xs:w-16  bg-lightGray" @click="toggleRecording"><i class="fas fa-microphone md:text-4xl xs:text-2xl text-darkGray"></i></button>
      <button class="interview-call-button md:h-28 md:w-28 xs:h-16 xs:w-16 bg-secondary"><i class="fas fa-phone-slash md:text-4xl xs:text-2xl text-darkGray"></i></button>
    </div>
  </div>
</template>

<style scoped></style>
