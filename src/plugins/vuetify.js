import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                error: "#e55a58",
                black: "#05051F",
                primary: "#1976D3",
                orange: "#FF7D49",
                green: "#41C284",
                grey: "#C7C7CF",
                background: "#ECECF9",
            }
        }
    },
    icons: {
        iconfont: 'md'
    }
})
