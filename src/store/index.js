import Vue from 'vue';
import Vuex from 'vuex';
import {
  importAll,
} from '@/utils';

Vue.use(Vuex);

const modulesFiles = require.context('./modules', false, /\.js$/);
const modules = importAll(modulesFiles);

export default new Vuex.Store({
  modules,
});
