import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon/Index.vue'; // svg component
import {
  importAll,
} from '@/utils';

// register globally
Vue.component('g-svg-icon', SvgIcon);

const modulesFiles = require.context('./svg', false, /\.svg$/);
const modules = importAll(modulesFiles);

export default Object.keys(modules);
