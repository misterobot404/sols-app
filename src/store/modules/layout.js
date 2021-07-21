
export default {
    namespaced: true,

    state: {
        // show / hide feedback dialog
        feedbackDialog: false,
        // show / hide progress line
        pageLoading: false,
        // popup msg
        popupMsg: {
            show: false,
            text: "",
            // primary or error
            type: ""
        },

    },
    mutations: {
        SHOW_PAGE_LOADING(state) {
            state.pageLoading = true;
        },
        HIDE_PAGE_LOADING(state) {
            state.pageLoading = false;
        },
        SHOW_FEEDBACK_DIALOG(state) {
            state.feedbackDialog = true;
        },
        HIDE_FEEDBACK_DIALOG(state) {
            state.feedbackDialog = false;
        },
        SHOW_MSG_DIALOG(state, payload) {
            state.popupMsg.type = payload.type;
            state.popupMsg.text = payload.text;
            state.popupMsg.show = true;
        },
        HIDE_MSG_DIALOG(state) {
            state.popupMsg.show = false;
        },
    }
}

