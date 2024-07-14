import { DisplayData } from './displayData.module.js';
import { GetData } from './getData.module.js';
import { ClickEventOnCards } from './clickOnCards.module.js';
import { ContactForm } from './contact-module.js';

export class Home {
  constructor() {
    this.fetchHomeData();
    document.querySelector('#search-btn').addEventListener('click', () => {
      document
        .querySelectorAll('section')
        .forEach((sec) => sec.classList.add('d-none'));
      document.querySelector('.search-section').classList.remove('d-none');
      document.querySelector('.sideNav-section').classList.remove('d-none');
      let searchName = document.getElementById('search-by-name');
      let searchFirstLetter = document.getElementById('search-by-FLetter');
      searchName.addEventListener('input', () => {
        this.fetchSearchData(`s=${searchName.value}`);
      });
      searchFirstLetter.addEventListener('input', () => {
        this.fetchSearchData(`f=${searchFirstLetter.value}`);
      });
    });
    document.querySelector('#category-btn').addEventListener('click', () => {
      document
        .querySelectorAll('section')
        .forEach((sec) => sec.classList.add('d-none'));
      document.querySelector('.category-section').classList.remove('d-none');
      document.querySelector('.sideNav-section').classList.remove('d-none');
      this.fetchCategoryData();
    });
    document.querySelector('#area-btn').addEventListener('click', () => {
      document
        .querySelectorAll('section')
        .forEach((sec) => sec.classList.add('d-none'));
      document.querySelector('.area-section').classList.remove('d-none');
      document.querySelector('.sideNav-section').classList.remove('d-none');
      this.fetchAreaData();
    });
    document.querySelector('#ingredient-btn').addEventListener('click', () => {
      document
        .querySelectorAll('section')
        .forEach((sec) => sec.classList.add('d-none'));
      document.querySelector('.ingredient-section').classList.remove('d-none');
      document.querySelector('.sideNav-section').classList.remove('d-none');
      this.fetchIngredientData();
    });
    document.querySelector('#contactUs-btn').addEventListener('click', () => {
      document
        .querySelectorAll('section')
        .forEach((sec) => sec.classList.add('d-none'));
      document.querySelector('.contact-us-section').classList.remove('d-none');
      document.querySelector('.sideNav-section').classList.remove('d-none');
      this.contactUsPage();
    });
    // moving side navBar
    this.sideNavWidth = $('#nav-menu').outerWidth(true);
    $('.sideNav-section').animate({ left: -this.sideNavWidth }, 0);
    this.isOpen = false;
    $('#close-nav , #open-nav').on('click', () => {
      $('#close-nav').toggleClass('d-none');
      $('#open-nav').toggleClass('d-none');
      this.sidedir = this.isOpen ? -this.sideNavWidth : 0;
      $('.sideNav-section').animate({ left: this.sidedir }, 500);
      this.isOpen = !this.isOpen;
    });
    // End of moving side navBar
  }

  // getting home page data
  async fetchHomeData() {
    let data = new GetData('search.php?', 's=');
    let homeData = await data.fetchData();
    new DisplayData().displayHomePage(
      homeData,
      'home-meals',
      homeData.meals.length
    );
    new ClickEventOnCards().cardsClickEvent(); //to add click event to meal cards to open details
  }

  async fetchCategoryData() {
    console.log('hi');
    let data = new GetData('categories.php');
    let categoryData = await data.fetchData();
    new DisplayData().displayCategoryPage(categoryData);
    new ClickEventOnCards().categoryClickEvent(); //to add click event to category cards to open details
  }

  async fetchAreaData() {
    let data = new GetData('list.php?', 'a=list');
    let areaData = await data.fetchData();
    new DisplayData().displayAreaPage(areaData);
    new ClickEventOnCards().areaClickEvent();
  }

  async fetchIngredientData() {
    let data = new GetData('list.php?', 'i=list');
    let ingredientData = await data.fetchData();
    new DisplayData().displayIngredientPage(ingredientData);
    new ClickEventOnCards().ingredientClickEvent();
  }
  async fetchSearchData(name) {
    let data = new GetData('search.php?', `${name}`);
    let searchData = await data.fetchData();
    console.log(searchData);
    new DisplayData().displayHomePage(searchData, 'search-meals');
    new ClickEventOnCards().cardsClickEvent();
  }

  contactUsPage() {
    new ContactForm();
  }
}
