function Shortener() {
  this.memory = [];

  this.add = (shortObj) => {
    if (!shortObj) return false;

    this.memory.push(shortObj);
    return true;
  };

  this.remove = (shortId) => {
    if (!shortId) return;

    let index = this.memory.findIndex(
      (shortObj) => shortObj.shortId == shortId
    );
    if (index >= 0) {
      this.memory.splice(index, 1);
      return true;
    }
    return false;
  };

  this.get = (shortId) => {
    if (!shortId) {
      return null;
    }

    let index = this.memory.findIndex(
      (shortObj) => shortObj.shortId == shortId
    );
    if (index >= 0) {
      return this.memory[index];
    }

    return null;
  };

  this.getAll = () => {
    return this.memory;
  };
}

module.exports = new Shortener();
