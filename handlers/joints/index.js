"use strict";
const AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "eu-west-1" });
const { actionsTableName } = process.env;

const DBService = require("../../src/db");
class Joints {
  constructor(event, context) {
    console.log(event);
    this._dbService = new DBService();
    this._model = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
  }

  async add(settings) {
    const res = await this._dbService.put({
      type: "joints",
      timestamp: new Date().getTime(),
    });
    console.log(res);
    console.log("Add!");
  }

  async addWork() {
    console.log("Add Work!");
  }
}
module.exports.handler = async (event, context) => {
  console.log(event.Records[0].Sns);
  const service = new Joints();
  const res = await service.add();
  console.log(res);
  console.log("Add!");
  console.log({ statusCode: 200 });
  return { statusCode: 200 };
};
