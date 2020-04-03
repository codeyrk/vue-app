import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: "#000000",
        secondary: "#bc0000"
      },
      dark: {
        primary: "#34495E"
      }
    }
  }
});
