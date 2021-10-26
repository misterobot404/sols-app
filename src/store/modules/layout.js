export default {
    namespaced: true,
    state: {
        // show / hide feedback dialog
        feedback_dialog: false,
        // show / hide progress line
        page_loading: false,
        // popup msg
        popup_msg: {
            show: false,
            defaultTimeout: 2400,
            timeout: 2400,
            text: "",
            // primary or error
            type: ""
        },

    },
    mutations: {
        SHOW_PAGE_LOADING(state) {
            state.page_loading = true;
        },
        HIDE_PAGE_LOADING(state) {
            state.page_loading = false;
        },
        SHOW_FEEDBACK_DIALOG(state) {
            state.feedback_dialog = true;
        },
        HIDE_FEEDBACK_DIALOG(state) {
            state.feedback_dialog = false;
        },
        SHOW_MSG_DIALOG(state, payload) {
            state.popup_msg.type = payload.type;
            state.popup_msg.text = payload.text;
            if (payload.timeout) state.popup_msg.timeout = payload.timeout;
            state.popup_msg.show = true;
        },
        HIDE_MSG_DIALOG(state) {
            state.popup_msg.show = false;
            state.popup_msg.timeout = state.popup_msg.defaultTimeout;
        },
    }
}

