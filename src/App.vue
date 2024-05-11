<script>
import store from './store/index'
import { auth } from './firebase';
import { ref, watch } from 'vue';

export default {
  name: "App.vue",
  data() {
    return {
      isMobileMenuOpen: false,
    };
  },
  setup() {
    const username = ref('');

    watch(() => store.state.isUserSet, (newIsSet) => {
      if (newIsSet) {
        const user = store.getters.getUser;
        if (user && user.displayName) {
          username.value = user.displayName;
        } else {
          username.value = null;
        }
      } else {
        username.value = null;
      }
    });

    return {
      username,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    logout() {
      // may need to get rid of for mobile
      this.isDropdownOpen = false;
      store.commit('clearUser');
      auth.signOut();
    }
  },
  mounted() {
    const user = store.getters.getUser;
    console.log(user)
    if (user && user.displayName) {
      this.username = user.displayName;
    }
  },
};
</script>

<template>
<nav class="fixed w-full h-16 bg-white flex items-center p-5 z-328999847 top-0 left-0">
  <router-link to="/">
    <img src="./assets/intervieweeFullLogo.svg" class="h-10 w-48 mr-5" alt="Interviewee logo" />
  </router-link>

  <div class="mdlg:hidden ml-auto">
    <!-- Hamburger Icon -->
    <button id="mobile-menu-button" @click="toggleMobileMenu">
      <i class="fas fa-bars text-xl"></i>
    </button>

    <!-- Dropdown Menu -->
    <div id="mobile-menu" :class="{'hidden': !isMobileMenuOpen, 'block': isMobileMenuOpen}" class="absolute right-0 top-16 w-full bg-white p-4 border shadow-sm">
      <router-link to="/contact" class="mobile-menu-item mb-2" @click="closeMobileMenu">Pricing</router-link>
      <router-link to="/contact" class="mobile-menu-item mb-2" @click="closeMobileMenu">FAQs</router-link>
      <router-link to="/contact" class="mobile-menu-item mb-2" @click="closeMobileMenu">About</router-link>
      <router-link to="/interviews" class="mobile-menu-item mb-2" @click="closeMobileMenu">Interviews</router-link>
      <router-link to="/contact" class="mobile-menu-item mb-2" @click="closeMobileMenu">Contact Us</router-link>
      <router-link v-if="!username" :v-model="username" to="/login" class="mobile-menu-item" @click="closeMobileMenu">Login</router-link>
      <div v-else class="mobile-menu-item cursor-pointer"><button @click="logout">Logout</button></div>
    </div>

  </div>

  <!-- Links -->
  <div class="hidden mdlg:flex mx-auto">
    <router-link to="/contact" class="nav-button">Pricing</router-link>
    <router-link to="/contact" class="nav-button">FAQs</router-link>
    <router-link to="/contact" class="nav-button">About</router-link>
    <router-link to="/interviews" class="nav-button">Interviews</router-link>
  </div>

  <div class="hidden mdlg:block right-0 w-56">
    <router-link to="/contact" class="nav-button">Contact Us</router-link>
    <router-link v-if="!username" to="/login" class="font-noyhgeometric-medium text-white text-xl ml-5 py-2 px-4 rounded-lg transition duration-300 ease-in-out bg-primary hover:bg-darkBlue">Login</router-link>
    <button v-else @click="logout" class="nav-button">Logout</button>
  </div>
</nav>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>

.text {
  color: var(--color-dark-gray);
  font-family: 'koulen';
  font-size: 30px;
}

.container {
  flex-direction: column;
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #c8c8c8;
}

.nav-bar {
  position: fixed;
  width: 100%;
  height: 40px;
  margin: 0;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px;
  padding-left: 30px;
  justify-content: space-between;
  z-index: 328999847;
  top: 0;
  left: 0;
}

.nav-buttons {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  margin-left: 0;
  margin-right: 30px;
}

.nav-button {
  color: var(--color-dark-gray);
  font-family: noyhgeometric-medium;
  font-size: 19px;
  text-decoration: none;
  padding: 10px 15px;
  margin-left: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #f2f3f5;
}

.interviewee-logo {
  height: 40px;
}
</style>
