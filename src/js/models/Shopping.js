import uniqid from "uniqid";
class Shopping {
  constructor() {
    this.items = [];
  }
  addItem(count, unit, ingredient) {
    this.items.push({
      count,
      unit,
      ingredient,
      id: new uniqid(),
    });
  }
  deleteItem(id) {
    this.items = this.items.filter((el) => el.id !== id);
  }
  updateItems(count, id) {
    this.items.find((el) => el.id === id).count = count;
  }
}
