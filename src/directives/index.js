import Vue from 'vue';
import {
  importAll,
} from '@/utils';
const modulesFiles = require.context('./', true, /\.js$/);
const modules = importAll(modulesFiles);

Object.entries(modules).forEach(([
  key,
  directive,
]) => {
  Vue.directive(directive.name || key, directive);
})
