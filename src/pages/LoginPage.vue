<script>
import { signInWithGoogle } from '../firebase';
import firebase from '../firebase';
import store from '../store/index'
import { router } from '../main';


export default {
  name: "LoginPage",
  methods: {
    handleLoginWithGoogleButtonClick() {
      signInWithGoogle().then(async (result) => {
        const user = result.user;
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        };
        store.dispatch('loginUser', { userData: userData, token: await result.user.getIdToken() });
        router.push('/');
      })
    },
  }
};
</script>

<template>
  <div class="bg-primary h-screen">
    <header class="h-56 flex">
      <h1 class="text-white mx-auto font-noyhgeometric text-5xl mt-32">Login</h1>
    </header>
    <div class="flex justify-center">
      <div class="sm:w-96 sm:h-72 xs:h-64 xs:w-80 bg-white rounded-xl justify-center items-center flex-col flex">
        <div>
          <button class="account-card-button sm:w-72 xs:w-60 mb-4 bg-[#7FBA00]" v-on:click="handleLoginWithGoogleButtonClick()">Continue with Google <i class="fa-brands fa-google pl-1"></i></button>
          <button class="account-card-button sm:w-72 xs:w-60 mb-4 bg-[#F25022]">Continue with Microsoft <i class="fa-brands fa-microsoft pl-1"></i></button>
          <button class="account-card-button sm:w-72 xs:w-60 mb-4 bg-[#4267B2]">Continue with Facebook <i class="fa-brands fa-facebook pl-1"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
