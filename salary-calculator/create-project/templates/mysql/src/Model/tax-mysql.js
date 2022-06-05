const { Model } = require("objection");

class Tax extends Model {
  static get tableName() {
    return "Tax";
  }
}

module.exports = Tax;
