class Likes {
  constructor() {
    this.likes = [];
  }
  addItem(id, title, author, image) {
    const item = { id, title, author, image };
    this.likes.push(item);
    return item;
  }
  deleteItem(id) {
    this.likes = this.likes.filter((el) => el.id !== id);
  }
  isLiked(id) {
    return this.likes.find((el) => el.id === id);
  }
}

export default Likes;
