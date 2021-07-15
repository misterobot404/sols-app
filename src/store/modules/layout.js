
export default {
    namespaced: true,

    state: {
        // show / hide progress line
        pageLoading: false,
        // snackbar
        showMsg: false,
        textMsg: ""
    },
    mutations: {
        SHOW_PAGE_LOADING(state) {
            state.pageLoading = true;
        },
        HIDE_PAGE_LOADING(state) {
            state.pageLoading = false;
        },
        SHOW_MSG_DIALOG(state, payload) {
            state.textMsg = payload.text ? payload.text : "";
            state.showMsg = payload.show;
        }
    }
}

