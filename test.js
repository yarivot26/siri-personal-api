const AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "eu-west-1" });

module.exports.handler = async (event, context) => {
  console.log(event.Records[0].Sns);
  const dynamo = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
  const params = {
    TableName: "joints",
    Item: {
      timestamp: new Date().getTime(),
      sortKey: "NA",
    },
  };
  //   if (type.length > 0) {
  //     params.Item.type = type;
  //   }
  const res = await dynamo.put(params).promise();
  console.log(res);
  console.log("Add!");
  console.log({ statusCode: 200 });
  return { statusCode: 200 };
};
