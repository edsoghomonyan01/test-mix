import 'bootstrap';
import Vue             from 'vue';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
// import ExampleComponent from './components/ExampleComponent.vue';
const ExampleComponent = () => import('./components/ExampleComponent.vue');

const app = new Vue({
    el: '#app',
    components: {
        'example-component':   ExampleComponent,
    },
});

