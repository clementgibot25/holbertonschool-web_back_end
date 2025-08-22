export default class Building {
    constructor(sqft) {
      this._sqft = sqft;
  
      if (this.constructor !== Building
        && this.evacuationWarningMessage === Building.prototype.evacuationWarningMessage) {
        throw new Error('Class extending Building must override evacuationWarningMessage');
      }
    }
  
    get sqft() {
      return this._sqft;
    }
  
    set sqft(value) {
      this._sqft = value;
    }
  
    // eslint-disable-next-line
    evacuationWarningMessage() {
      throw new Error('Class extending Building must override evacuationWarningMessage');
    }
  }
