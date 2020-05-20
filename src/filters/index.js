import Vue from 'vue';
import {
  importAll,
} from '@/utils';
const modulesFiles = require.context('./', true, /[^index]\.js/);
const modules = importAll(modulesFiles, true);

Object.values(modules).forEach(mod => {
  Object.entries(mod).forEach(([key, filter]) => {
    Vue.filter(filter.name || key, filter.handler);
  })
})
