import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from 'primevue/config';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Tag from 'primevue/tag';

import App from "./App.vue";
import router from "./router";

import "./assets/app.css";
import "primevue/resources/themes/arya-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);

app.component("Button", Button);
app.component("Card", Card);
app.component("Panel", Panel);
app.component("Tag", Tag);

app.mount("#app");
