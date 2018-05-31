import str from './models/Search';
import {
 add as a,
 multiply as m,
 ID
} from './views/searchView';

console.log(`Using imported functions! ${a(ID,1)} and ${m(3,4)}. ${str}.`);