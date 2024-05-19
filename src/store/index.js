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
        },
        isAdmin: (state) => state.user.data.role == 'admin'
    },
    mutations: {
        SET_USER: (state, user) => {
            state.user.token = user.token;
            state.user.data = user.data;
            sessionStorage.setItem('TOKEN', user.token);
        },
        SET_DATA: (state, user) => {
            state.user.data = user;
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
        async GET_USER({commit, state}){
            const res = await axios.get('http://localhost:8000/api/user' ,{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
            commit('SET_DATA', res.data);
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
        },
        async GET_TOURS(){
            const res = await axios.get('http://localhost:8000/api/get-tours')
            return res.data;
        },
        async GET_LIKEDS({state}){
            const res = await axios.get('http://localhost:8000/api/get-like',{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            })
            return res.data;
        },
        async GET_COMPARISONS({state}){
            const res = await axios.get('http://localhost:8000/api/get-comparison',{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            })
            return res.data;
        },
        async ADD_LIKE({state}, id){
            const res = await axios.post(`http://localhost:8000/api/add-like/${id}`,null, {
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
        },
        async REMOVE_LIKE({state}, id){
            const res = await axios.delete(`http://localhost:8000/api/remove-like/${id}`, {
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
        },
        async UPDATE_USER({commit, state},user){
            const res = await axios.put('http://localhost:8000/api/profile',user,{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
        },
        async GET_COUNTRY(){
            const res = await axios.get('http://localhost:8000/api/get-countries');
            return res.data;
        },
        async GET_TICKET(){
            const res = await axios.get('http://localhost:8000/api/get-tickets');
            return res.data;
        },
        async GET_HOTEL(){
            const res = await axios.get('http://localhost:8000/api/get-hotels');
            return res.data;
        },
        async GET_OPERATOR(){
            const res = await axios.get('http://localhost:8000/api/get-operators');
            return res.data;
        },
        async SEARCH_PRODUCT({state}, text){
            const res = await axios.get('http://localhost:8000/api/search-tour',{
                params:{
                    search: text,
                }
            });
            return res.data;
        },
        async GET_ONE_TOUR({state},id){
            const res = await axios.get(`http://localhost:8000/api/get-one-tour/${id}`);
            return res.data;
        },
        async GET_ONE_COMPARISON({state},id){
            const res = await axios.get(`http://localhost:8000/api/get-one-comparison/${id}`,{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
            return res.data;
        },
        async GET_ONE_OWNER({state},id){
            const res = await axios.get(`http://localhost:8000/api/get-one-owner/${id}`,{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
            return res.data;
        },
        async ADD_TICKET_OWNER({state}, id){
            await axios.post(`http://localhost:8000/api/add-ticket/${id}`,null,{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
        },
        async REMOVE_TICKET_OWNER({state}, id){
            await axios.delete(`http://localhost:8000/api/remove-ticket/${id}`,{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
        },
        async ADD_COMPARISON({state}, id){
            await axios.post(`http://localhost:8000/api/add-comparison/${id}`,null,{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
        },
        async REMOVE_COMPARISON({state}, id){
            await axios.delete(`http://localhost:8000/api/remove-comparison/${id}`,{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            });
        },
        async GET_OWNERS({state}){
            const res = await axios.get('http://localhost:8000/api/get-ticket-owners',{
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            })
            return res.data;
        }
    },
    modules: {
        
    }
});


