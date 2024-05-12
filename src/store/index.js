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
        isAuthenticated: (state) => !!state.user.token,
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
        },
        REMOVE_USER: (state) => {
            state.user = null;
            sessionStorage.removeItem("TOKEN");  
        }
    },
    actions: {
        async LOGIN_USER({commit}, user){
            await axios.get("http://localhost:8000/sanctum/csrf-cookie");
            const response = await axios.post('http://localhost:8000/api/login', {
                login: user.login,
                password: user.password
            })
            commit('SET_USER', response.data);
        },
        async REGISTER_USER({commit}, user) {
            await axios.get("http://localhost:8000/sanctum/csrf-cookie");
            const response = await axios.post('http://localhost:8000/api/register', {
              login: user.login,
              password: user.password,
              name: user.name,
              surname: user.surname,
              patronym: user.patronym,
            });
            console.log(response.data);
            commit('SET_USER', response.data);
        },
        async LOGOUT_USER({commit, state}){
            await axios.post('http://localhost:8000/api/logout', null, {
              headers: {
                  'Authorization': `Bearer ${state.user.token}`
              }
            })
            .then((res) => {commit('REMOVE_USER');return res});
        },
        async ADD_HOTEL({state},hotel){
            await axios.post('http://localhost:8000/api/hotels',hotel,{
                headers: {
                  'Authorization': `Bearer ${state.user.token}`
                }
            });
        },
        async ADD_TOUROPERATOR({state},operator){
            await axios.post('http://localhost:8000/api/tour-operators',operator,{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
        },
        async ADD_COUNTRY({state},country){
            await axios.post('http://localhost:8000/api/countries',country,{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
        },
        async ADD_TICKET({state},ticket){
            await axios.post('http://localhost:8000/api/tickets',ticket,{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
        },
        async GET_COUNTRIES({state}){
            const res = await axios.get('http://localhost:8000/api/get-countries',{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
            return res.data
        },
        async GET_TICKETS({state}){
            const res = await axios.get('http://localhost:8000/api/get-tickets',{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
            return res.data
        },
        async GET_HOTELS({state}){
            const res = await axios.get('http://localhost:8000/api/get-hotels',{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
            return res.data
        },
        async GET_TOUROPERATORS({state}){
            const res = await axios.get('http://localhost:8000/api/get-touroperators',{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
            return res.data
        },
        async ADD_TOUR({state}, data){
            const res = await axios.post('http://localhost:8000/api/tours',data,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
        }
    },
    modules: {
        
    }
});


