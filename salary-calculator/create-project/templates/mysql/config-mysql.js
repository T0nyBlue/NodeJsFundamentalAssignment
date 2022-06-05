// const database = process.env.DATABASE;
const database = "tax";

var conn = {
  host: "0.0.0.0",
  port: "32769",
  user: "root",
  password: "root",
  charset: "utf8",
};

// connect without database selected
var knex = require("knex")({ client: "mysql", connection: conn });

exports.mysqlConnection = async () => {
  knex.raw("CREATE DATABASE IF NOT EXISTS " + database).then(function () {
    knex.destroy();

    // connect with database selected
    conn.database = `${database}`;
    knex = require("knex")({ client: "mysql", connection: conn });

    knex.schema
      .createTableIfNotExists("Tax", (table) => {
        table.double("Tax").notNullable();
        table.integer("MinSalary").notNullable();
        table.integer("MaxSalary").notNullable();
      })
      .then(async () => {
        await knex("Tax")
          .insert([
            { Tax: 0.05, MinSalary: 0, MaxSalary: 5000000 },
            { Tax: 0.1, MinSalary: 5000000, MaxSalary: 10000000 },
            { Tax: 0.15, MinSalary: 10000000, MaxSalary: 18000000 },
            { Tax: 0.2, MinSalary: 18000000, MaxSalary: 32000000 },
            { Tax: 0.25, MinSalary: 32000000, MaxSalary: 52000000 },
            { Tax: 0.3, MinSalary: 52000000, MaxSalary: 80000000 },
            { Tax: 0.35, MinSalary: 80000000, MaxSalary: -1 },
          ])
          .then(() => {
            // knex.destroy();
          });
      })
      // .then(function () {
      //   knex.destroy();
      // });
      .finally((x) => knex.destroy());

    knex.schema
      .createTableIfNotExists("Insurance", (table) => {
        table.varchar("Name").notNullable();
        table.integer("A1").notNullable();
        table.integer("A2").notNullable();
        table.integer("A3").notNullable();
        table.integer("A4").notNullable();
        table.double("Percent").notNullable();
      })
      .then(async () => {
        await knex("Insurance")
          .insert([
            {
              Name: "HealthInsurance",
              A1: 447000,
              A2: 447000,
              A3: 447000,
              A4: 447000,
              Percent: 0.015,
            },
            {
              Name: "SocialInsurance",
              A1: 2384000,
              A2: 2384000,
              A3: 2384000,
              A4: 2384000,
              Percent: 0.08,
            },
            {
              Name: "UnemploymentInsurance",
              A1: 884000,
              A2: 784000,
              A3: 686000,
              A4: 614000,
              Percent: 0.01,
            },
          ])
          .then(() => {
            // knex.destroy();
          });
      })
      // .then(function () {
      //   knex.destroy();
      // });
      .finally((x) => knex.destroy());
  });
};
