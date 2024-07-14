export class GetData {
  constructor(e, p = '') {
    this.BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
    this.endpoint = e;
    this.paramter = p;
    this.url = this.BASE_URL + this.endpoint + this.paramter;
    // this.fetchData();
  }
  async fetchData() {
    try {
      const response = await fetch(this.url);
      const result = await response.json();

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
