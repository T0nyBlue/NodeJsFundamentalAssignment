const { Model } = require("objection");

class Insurance extends Model {
  static get tableName() {
    return "Insurance";
  }
}

module.exports = Insurance;
