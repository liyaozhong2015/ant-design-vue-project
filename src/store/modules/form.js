import router from "../../router";
import request from "../../utils/request";
const state = {
    step: {
        payAccout: "123456",
        recerveAccount: {
            type: 'alipay',
            number: '',
        }
    }
}
const actions = {

    async submitStepForm({ commit }, { payload }) {

        await request({

            url: "/api/WeatherForecast/PostForm",
            method: "post",
            data: payload
        });
        commit("saveStepFormData", payload);
        router.push("/form/step-form/result");
    }
};
const mutations = {
    saveStepFormData(state, { payload }) {

        state.step = {
            ...state.step,
            ...payload
        }
    }
}
export default {

    namespaced: true,
    state,
    actions,
    mutations
}