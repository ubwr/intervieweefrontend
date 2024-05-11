<script>
export default {
  name: "SignUpPage",
};
</script>

<template>
  <div class="bg-primary h-screen">
    <header class="h-56 flex">
      <h1 class="text-white mx-auto font-noyhgeometric text-5xl mt-32">Sign Up</h1>
    </header>
    <div class="flex justify-center">
      <div class="sm:w-96 sm:h-72 xs:h-64 xs:w-80 bg-white rounded-xl justify-center items-center flex-col flex">
        <div>
          <button class="account-card-button sm:w-72 xs:w-60 mb-4 bg-[#7FBA00]">Sign Up with Google <i class="fa-brands fa-google pl-1"></i></button>
          <button class="account-card-button sm:w-72 xs:w-60 mb-4 bg-[#F25022]">Sign Up with Microsoft <i class="fa-brands fa-microsoft pl-1"></i></button>
          <button class="account-card-button sm:w-72 xs:w-60 bg-[#4267B2]">Sign Up with Facebook <i class="fa-brands fa-facebook pl-1"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>