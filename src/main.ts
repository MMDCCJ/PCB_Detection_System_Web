
import { createApp } from 'vue'
import pinia from './stores/pinia_'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Left_navigation_bar from './components/Left_navigation_bar.vue'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import Head from './components/Head.vue'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
app.use(VueViewer)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.component('Left_navigation_bar', Left_navigation_bar).component("Head", Head)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
