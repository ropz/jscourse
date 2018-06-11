import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';

const state = {
    // global state of app
    // Search object - query, results
    // Current recipe object
    // Shopping list object
    // Liked recipes
};
// TESTING
window.state = state;

const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);
        // 3) Prepare for UI results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
        // 4) Search for recipes
        await state.search.getResults();
        // 5) render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
        } catch(err) {
            alert('Something went wrong with the search ...');
            clearLoader();
        }

    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})

/*
 * Recipe controller
 */
const controlRecipe = async () => {
    //Get Id from url
    const id = window.location.hash.replace('#', '');
    if (id) {
        // prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Hightlight selected recipe
        if (state.search) searchView.highlightSelected(id);

        // create new recipe object
        state.recipe = new Recipe(id);

        // TESTING
        // window.r = state.recipe;
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // get recipe data
            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            // render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch(err) {
            alert('Error processing recipe');
        }
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// LIST CONTROLLER
const controlList = () => {
    // create a new list if there is not one yet
    if (!state.list) state.list = new List();
    // add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// Handle deleetes
elements.shopping.addEventListener('click', e=>{
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete from state
        state.list.deleteItem(id);
        // delete from  UI
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count--value, ')) {
        // handle cound update
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
})

// Handling recipe button clicks
elements.recipe.addEventListener('click', e=>{
    console.log('event');
    console.log(e.target);
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
        state.recipe.updateServings('dec');
        recipeView.updateServingsIngredients(state.recipe);
        }
    } // Asterisk means any child
    if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.btn__recipe--add, .btn__recipe--add *')) {
        controlList();
    }
    console.log(state.recipe);
})

window.l = new List();