export default {
    namespaced: true,
    state: {
        // show / hide feedback dialog
        feedback_dialog: false,
        // popup msg
        popup_error_msg: {
            show: false,
            text: ""
        },
    },
    mutations: {
        SHOW_FEEDBACK_DIALOG(state) {
            state.feedback_dialog = true;
        },
        HIDE_FEEDBACK_DIALOG(state) {
            state.feedback_dialog = false;
        },
        SHOW_ERROR_MSG_DIALOG(state, payload) {
            state.popup_error_msg.text = payload.text;
            state.popup_error_msg.show = true;
        },
        HIDE_ERROR_MSG_DIALOG(state) {
            state.popup_error_msg.show = false;
        },
    }
}

