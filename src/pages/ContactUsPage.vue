<script>
export default {
  name: "ContactUsPage",
};
</script>

<template>
  <div class="bg-primary">
    <header class="flex h-56">
      <h1 class="text-white m-auto font-noyhgeometric text-5xl mt-32">Contact Us</h1>
    </header>
    <!-- container that includes the contact card and form -->
    <div class="flex justify-center items-center pb-14">
      <div class="sm:w-96 sm:h-128 xs:w-80 xs:h-96 bg-white rounded-xl">
        <div class="flex w-full">
          <form class="w-full p-8">
            <div class="form-group sm:mb-4 sm:text-base xs:mb-2 xs:text-sm">
              <label class="form-label">Name</label>
              <input class="input" required />
            </div>
            <div class="form-group sm:mb-4 sm:text-base xs:mb-2 xs:text-sm">
              <label class="form-label">Email</label>
              <input class="input" required />
            </div>
            <div class="form-group mb-4 sm:text-base xs:text-sm">
              <label class="form-label">Message</label>
              <textarea
                class="input sm:max-h-44 xs:max-h-24"
                rows="7"
                required
              ></textarea>
            </div>
            <button class="sm:p-3 xs:p-2 bg-primary text-white font-noyhgeometric-medium sm:text-base xs:text-sm rounded-md">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
