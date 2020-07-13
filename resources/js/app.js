import 'bootstrap';
import Vue             from 'vue';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
// import ExampleComponent from './components/ExampleComponent.vue';
const greeting = () => import('./components/greeting');
const ExampleComponent = () => import('./components/ExampleComponent.vue');

const app = new Vue({
    el: '#app',
    components: {
        'greeting':         greeting,
        'example-component': ExampleComponent,
    },

    data: {
        phone_number: '',
    },

    computed: {
        phoneNumber: {
            get() {
                let value = this.phone_number;

                value = value.replace(/^\+1/, '');
                value = value.replace(/^(\d{3})(\d)/g, '($1) $2');
                value = value.replace(/^(\(\d{3}\)\s)(\d{3})(\d)/, '$1$2-$3');
                value = value.replace(/^(\(\d{3}\)\s)(\d{3})-(\d{4})/, '$1$2-$3');

                return value;
            },

            set(value) {
                if (value.length <=14)
                    this.phone_number = value;
            },
        },
    }
});

