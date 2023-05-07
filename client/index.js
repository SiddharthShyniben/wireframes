// Babel has deprecated @babel/polyfill, and the following two imports are used for polyfills instead.
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import m from 'mithril';
import { Files } from './Files';
import { File } from './File';

m.route(document.body, "/files", {
	"/files": Files,
	"/file/:id": File
});
