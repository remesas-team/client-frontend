// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  sourcemap: true,
  modules: ['@vueuse/nuxt', '@nuxt/ui', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "https://remesas.com",
      apiBase: process.env.API_BASE || "https://test-api.remesas.com/api",
      auth: {
        name_cookie_token: process.env.NUXT_AUTH_COOKIE_TOKEN || 'auth.localhost.remesas.token',
        name_cookie_redirect: process.env.NUXT_AUTH_COOKIE_REDIRECT || 'auth.localhost.remesas.redirect',
        name_cookie_domain: process.env.NUXT_AUTH_COOKIE_DOMAIN || 'localhost',
        max_age: Number(process.env.NUXT_AUTH_COOKIE_MAX_AGE) || 60 * 60 * 24 * 365, // un año de expiración
      },
    }
  },
  app: {
    head: {
      script: [
        {
          hid: 'Rudder-JS',
          src: 'http://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js',
          defer: true
        },
        {
          hid: 'rudder-js',
          innerHTML: `
            rudderanalytics = window.rudderanalytics = [];
            var  methods = [
                'load',
                'page',
                'track',
                'identify',
                'alias',
                'group',
                'ready',
                'reset',
                'getAnonymousId',
                'setAnonymousId'
            ];
            for (var i = 0; i < methods.length; i++) {
                  var method = methods[i];
                  rudderanalytics[method] = function (methodName) {
                        return function () {
                                           rudderanalytics.push([methodName].concat(Array.prototype.slice.call(arguments)));
                        };
                      }(method);
            }
            rudderanalytics.load("2trwxpV2ixZiJzf1SIFsQF0lX55", "https://remesashouctyr.dataplane.rudderstack.com");
            rudderanalytics.ready(()=>{
              console.log("We are all set");
            });
            rudderanalytics.page();
            `,
          type: 'text/javascript',
          charset: 'utf-8'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap'
        }
      ]
    }
  },
  ui: {
    colorMode: false
  }

})
