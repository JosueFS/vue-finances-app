import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/es5/util/colors';
import pt from 'vuetify/es5/locale/pt';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  lang: {
    locales: { pt },
    current: 'pt',
  },
  theme: {
    dark: true,
    themes: {
      light: {
        primary: colors.deepPurple.accent2,
        secondary: colors.grey.darken1,
        accent: colors.pink.darken1,
        error: '#C00',
        background: colors.indigo.lighten5,
        info: colors.teal.darken1,
        success: colors.deepPurple.accent2,
      },
      dark: {
        primary: colors.deepPurple.accent2,
        background: colors.indigo.base,
        info: colors.teal.lighten1,
        success: colors.deepPurple.accent2,
      },
    },
  },
});
