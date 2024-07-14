import { DisplayData } from './displayData.module.js';
import { GetData } from './getData.module.js';

export class ClickEventOnCards {
  constructor() {}

  cardsClickEvent() {
    document.querySelectorAll('.meal-card .inner').forEach((el) => {
      el.addEventListener('click', () => {
        document
          .querySelectorAll('section')
          .forEach((sec) => sec.classList.add('d-none'));
        document
          .querySelector('.meal-details-section')
          .classList.remove('d-none');
        document.querySelector('.sideNav-section').classList.remove('d-none');
        this.fetchDetailData(el.getAttribute('data-id'));
      });
    });
  }

  categoryClickEvent() {
    document.querySelectorAll('.category-card .inner').forEach((el) => {
      el.addEventListener('click', () => {
        document
          .querySelectorAll('section')
          .forEach((sec) => sec.classList.add('d-none'));
        document
          .querySelector('.category-meals-section')
          .classList.remove('d-none');
        document.querySelector('.sideNav-section').classList.remove('d-none');
        this.fetchCategoryMealsData(el.getAttribute('data-category'));
      });
    });
  }

  areaClickEvent() {
    document.querySelectorAll('.area-card').forEach((el) => {
      el.addEventListener('click', () => {
        document
          .querySelectorAll('section')
          .forEach((sec) => sec.classList.add('d-none'));
        document
          .querySelector('.area-meals-section')
          .classList.remove('d-none');
        document.querySelector('.sideNav-section').classList.remove('d-none');
        this.fetchAreaMealsData(el.getAttribute('data-area'));
      });
    });
  }

  ingredientClickEvent() {
    document.querySelectorAll('.ingredient-card').forEach((el) => {
      el.addEventListener('click', () => {
        document
          .querySelectorAll('section')
          .forEach((sec) => sec.classList.add('d-none'));
        document
          .querySelector('.ingredient-meals-section')
          .classList.remove('d-none');
        document.querySelector('.sideNav-section').classList.remove('d-none');
        this.fetchingredientMealsData(el.getAttribute('data-ingredient'));
      });
    });
  }

  async fetchDetailData(id) {
    let data = new GetData('lookup.php?', `i=${id}`);
    let mealData = await data.fetchData();
    new DisplayData().displayDetailPage(mealData.meals[0]);
  }
  async fetchCategoryMealsData(cat) {
    let data = new GetData('filter.php?', `c=${cat}`);
    let mealCards = await data.fetchData();
    new DisplayData().displayHomePage(mealCards, 'cat-meals');
    this.cardsClickEvent();
  }
  async fetchAreaMealsData(area) {
    let data = new GetData('filter.php?', `a=${area}`);
    let mealCards = await data.fetchData();
    new DisplayData().displayHomePage(mealCards, 'area-meals');
    this.cardsClickEvent();
  }
  async fetchingredientMealsData(ingred) {
    let data = new GetData('filter.php?', `i=${ingred}`);
    let mealCards = await data.fetchData();
    new DisplayData().displayHomePage(mealCards, 'ingredient-meals');
    this.cardsClickEvent();
  }
}
