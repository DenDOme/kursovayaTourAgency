import { createStore } from 'vuex'
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        }
    },
    getters: {
        getToken(state){
            return state.user.token
        },
        getUserData(state){
            return state.user.data
        }
    },
    mutations: {
        SET_USER: (state, user) => {
            state.user.token = user.token;
            state.user.data = user.data;
            sessionStorage.setItem('TOKEN', user.token);
        },
        SET_DATA: (state, user) => {
            state.user.data = user.data;
        }
    },
    actions: {
        LOGIN_USER({commit}, user){

        }
    },
    modules: {
        
    }
});