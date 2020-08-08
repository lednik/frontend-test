// import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        profile: undefined
    },
    getters: {

    },
    mutations: {
        setProfile(state, data){
            state.profile = data
        },
        deleteProfile(state){
            state.profile = undefined
        }
    },
    actions: {
    },
};
