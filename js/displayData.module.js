export class DisplayData {
  constructor() {}

  // display meals
  displayHomePage(data, section, n = 20) {
    // max number is 20 for all sections except home
    let mealCards = data.meals.slice(0, n).map((el) => {
      return ` <div class="col-md-3 meal-card m-pointer">
            <div class="inner position-relative overflow-hidden" data-id="${el.idMeal}">
              <img class="w-100 rounded-2" src="${el.strMealThumb}" alt="${el.strMeal}" />
              <div
                class="meal-card-name w-100 rounded-2 bg-white position-absolute top-0 start-0 end-0 bottom-0 bg-opacity-50 d-flex align-items-center">
                <h2>${el.strMeal}</h2>
              </div>
            </div>
          </div>`;
    });
    document.getElementById(section).innerHTML = mealCards.join('');
  }

  // display categories
  displayCategoryPage(data) {
    let categoryCards = data.categories.map((el) => {
      return `<div class='col-md-3 category-card overflow-hidden m-pointer'>
      <div
        class='inner position-relative '
        data-id='${el.idCategory}'
        data-category = '${el.strCategory}'>
        <img
          class='w-100 rounded-2'
          src='${el.strCategoryThumb}'
          alt='${el.strCategory}'
        />
        <div class='category-card-data w-100 rounded-2 bg-white position-absolute top-0 start-0 end-0 bottom-0 bg-opacity-75 text-center'>
          <h2>${el.strCategory}</h2>
          <p>${el.strCategoryDescription}</p>
        </div>
      </div>
    </div>`;
    });
    document.getElementById('category-list').innerHTML = categoryCards.join('');
  }

  displayAreaPage(data) {
    let areaCards = data.meals.map((el) => {
      return `<div class="col-md-3 area-card m-pointer text-white text-center" data-area =${el.strArea}>
            <i class="fas fa-house-laptop fa-4x"></i>
            <h3>${el.strArea}</h3>
          </div>`;
    });
    document.getElementById('area-list').innerHTML = areaCards.join('');
  }

  displayIngredientPage(data) {
    let ingredientCards = data.meals.slice(0, 20).map((el) => {
      return `<div
            class="col-md-3 ingredient-card m-pointer text-center text-white" data-ingredient = "${
              el.strIngredient
            }">
            <i class="fas fa-drumstick-bite fa-4x"></i>
            <h3>${el.strIngredient}</h3>
            <p>
              ${el.strDescription.split(' ').slice(0, 20).join(' ')}
            </p>
          </div>`;
    });
    document.getElementById('ingerdient-list').innerHTML =
      ingredientCards.join('');
  }

  // display meal detail
  displayDetailPage(data) {
    let recipies = this.gettingRecipies(data);
    let recipieList = this.list(recipies, 'info');
    let tags = this.gettingTags(data.strTags);
    let tagList = this.list(tags, 'danger');
    let mealDetails = `
          <div class="col-md-4">
            <img
              class="w-100 rounded-3"
              src="${data.strMealThumb}"
              alt="${data.strMeal}" />
            <h2>${data.strMeal}</h2>
          </div>
          <div class="col-md-8">
            <h2>Instruction</h2>
            <p>
              ${data.strInstructions}
            </p>
            <h3>Area: ${data.strArea}</h3>
            <h3>Category: ${data.strCategory}</h3>
            <h3>Recipies:</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${recipieList}
            </ul>
            <h3>Tags:</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagList}
            </ul>
            <a class = "btn btn-success" target = "_blank" href = "${data.strSource}">Source</a>
            <a class = "btn btn-danger" target = "_blank" href = "${data.strYoutube}">Youtube</a>
          </div>
        </div>`;
    document.getElementById('meal-detail').innerHTML = mealDetails;
  }

  gettingRecipies(data) {
    // get ingredients
    let ingredientsKeys = Object.keys(data).filter((e) =>
      e.includes('Ingredient')
    );
    // get measures
    let measureKeys = Object.keys(data).filter((e) => e.includes('Measure'));
    // concatenate measures and ingredients
    // and mark empty items as undefined>
    let recipie = ingredientsKeys
      .map((e, i) => {
        if (!((data[measureKeys[i]] + ' ' + data[e]).trim() === ''))
          return data[measureKeys[i]] + ' ' + data[e];
      }) // remove undefined items and return the exact recipies
      .filter((e) => {
        return e;
      });
    return recipie;
  }

  gettingTags(data) {
    if (data !== null) {
      return data.split(',');
    } else return [];
  }

  list(li, color) {
    let listItem = li.map((el) => {
      return `<li class="alert alert-${color} m-2 p-1">${el}</li>`;
    });
    return listItem.join('');
  }
}
