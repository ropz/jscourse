import axios from 'axios';

export default class Search {
 constructor(query) {
  this.query = query;
 }
 async getResults(query) {
  const key = '88efe75496713de17e018467b7a37c49';
  try {
  const res = await axios(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${key}&q=${this.query}`);
  this.result = res.data.recipes;
  console.log(this.result);
  }
  catch (error) {
   alert('error');
  }
 }
}