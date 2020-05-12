import uniqid from "uniqid";
class Shopping {
  constructor() {
    this.items = [];
  }
  addItem(count, unit, ingredient) {
    const item = {
      count,
      unit,
      ingredient,
      id: uniqid(),
    };
    this.items.push(item);
    return item;
  }
  deleteItem(id) {
    this.items = this.items.filter((el) => el.id !== id);
  }
  updateItems(count, id) {
    this.items.find((el) => el.id === id).count = count;
  }
}
export default Shopping;
