import { createApp, toRaw } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';

// this will need to get updated prior to launch. this is the test token
const stripe = await loadStripe('your_token');


const store = createStore({
    state: {
        url: 'your_url',
        token: '',
        isUserSet: false,
        isAuthenticated: false,
        user: {
            displayName: '',
            email: '',
            // PREMIUM, BASIC
            tokens: {},
            inInterview: false,
            uid: '',
        }
      },
    mutations: {
        setAuthedUserToken(state, token) {
            state.token = token;
            state.isAuthenticated = true;
        },
        setUser(state, userData) {
            state.user = userData
            state.isUserSet = true;
        },
        clearUser(state) {
            state.token = '';
            state.isAuthenticated = false;
            state.isUserSet = false;
            state.user = {
                displayName: '',
                email: '',
                tokens: {},
                inInterview: false,
                uid: '',
            };
        }
    },
    actions: {
        async loginUser({ commit, state }, payload) { // Accept a payload object
            const { userData, token } = payload;
            if (token) {
                const config = {
                    headers: {
                      'Authorization': `Bearer ${state.token}`,
                      'Content-Type': 'application/json',
                    },
                  };

                try {
                    const response = await axios.post(`${state.url}/v1/users`, userData, config);
                    const data = response.data.updatedData;
                    commit('setUser', data);
                    commit('setAuthedUserToken', token);
                } catch (error) {
                    console.log('There was an error: ', error);
                    throw error;
                }
            } else {
                console.log('login failed')
            }
        },
        async getUserFromServer({ commit, state }, userID) {
            const config = {
                headers: {
                  'Authorization': `Bearer ${state.token}`,
                  'Content-Type': 'application/json',
                },
              };
            return await axios.get(`${state.url}/v1/users/${userID}`, config).then((result) => {
                const data = result.data.userData;
                commit('setUser', data);
                return data;
            });
        },
        getInterviewerResponse({ state }, text) {
            let config = {
                headers: {
                  'Authorization': `Bearer ${state.token}`,
                  'Content-Type': 'text/plain',
                },
                //responseType: 'blob',
              };
            const body = text;
            axios.post(`${state.url}/v1/interviews/test`, body, config).then((result) => {
                const textData = result.data;
                config = {
                    headers: {
                      'Authorization': `Bearer ${state.token}`,
                      'Content-Type': 'text/plain',
                    },
                    responseType: 'blob',
                  };
                  console.log(result.data)
                axios.post(`${state.url}/v1/interviews/getAudioTest`, textData, config).then((result) => {
                    console.log(result.data)
                    const audioData = result.data;
                    return {textData, audioData}
                });
            });
        },
        async getInterviewerResponse({ state }, text) {
            try {
              let config = {
                headers: {
                  'Authorization': `Bearer ${state.token}`,
                  'Content-Type': 'text/plain',
                },
              };
          
              const body = text;
              const response1 = await axios.post(`${state.url}/v1/interviews/test`, body, config);
              const textData = response1.data;
          
              config = {
                headers: {
                  'Authorization': `Bearer ${state.token}`,
                  'Content-Type': 'text/plain',
                },
                responseType: 'blob',
              };
          
              const response2 = await axios.post(`${state.url}/v1/interviews/getAudioTest`, textData, config);
              const audioData = response2.data;
          
              return { textData, audioData };
            } catch (error) {
              console.error(error);
              throw error;
            }
          },
          
        async checkout({ state }, quantity) {
            const config = {
                headers: {
                  'Authorization': `Bearer ${state.token}`,
                  'Content-Type': 'application/json',
                },
              };

            const body = {
                "userId": payload.userID,
                "lineItems": [
                    {
                        "productId": "your_id",
                        "quantity": payload.quantity,   
                    }
                ],
              }

              const response = await axios.post(`${state.url}/stripe/checkout/sessions`, body, { config } );
              const sessionId = await response.data;
              console.log("sessionId", sessionId)
      
              // Use the session ID to redirect to Stripe Checkout
              const { error } = await stripe.redirectToCheckout({ sessionId });
              if (error) {
                console.error(error);
              }
          }
    },
    getters: {
        getTokens(state) {
            return toRaw(state.user.tokens);
        },
        getUser(state) {
            return toRaw(state.user);
        },
        getUserId(state) {
            return toRaw(state.user.uid);
        },
        getUserDisplayName(state) {
            return toRaw(state.user.displayName);
        },
    }
})

export default store;
