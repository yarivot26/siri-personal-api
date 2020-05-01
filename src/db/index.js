"use strict";
const AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "eu-west-1" });
const config = require("../../config");
class DBService {
  constructor() {
    this._table = config.actionsTableName;
    this._model = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
  }

  async put(item) {
    const params = this._buildPutParams(item);
    const res = await this._model.put(params).promise();
    console.log(res);
    return res;
  }

  _buildPutParams(item) {
    const params = {
      TableName: this._table,
      Item: item,
    };
    return params;
  }
}
module.exports = DBService;
