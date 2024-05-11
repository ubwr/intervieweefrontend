import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import InterviewsPage from "./pages/InterviewsPage.vue";
import LandingPage from "./pages/LandingPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import SignUpPage from "./pages/SignUpPage.vue";
import ContactUsPage from "./pages/ContactUsPage.vue";
import SectorPage from "./pages/SectorPage.vue";
import InterviewCall from "./pages/InterviewCallPage.vue";
import { auth } from './firebase';
import store from './store/index'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'Home', component: LandingPage},
        {path: '/interviews', name: 'Interviews', component: InterviewsPage},
        {path: '/login', name: 'Login', component: LoginPage},
        {path: '/signup', name: 'SignUp', component: SignUpPage},
        {path: '/contact', name: 'Contact', component: ContactUsPage},
        {path: '/interviews/:sector', name: 'Sector', component: SectorPage},
        {path: '/call', name: 'InterviewCall', component: InterviewCall},
    ]
})

const app = createApp(App);

let isMounted = false;

auth.onAuthStateChanged((user) => {
    if (user) {
        user.getIdToken().then(function(token){
            store.commit('setAuthedUserToken', token);
            return store.dispatch('getUserFromServer', user.uid);
        }).then(() => {
            if (!isMounted) {
                app.use(router).mount('#app');
                isMounted = true;
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    } else {
        if (!isMounted) {
            app.use(router).mount('#app');
            isMounted = true;
        }
    }
  });