"use strict";
const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });
const config = require("./config");

module.exports.handler = async (event, context) => {
  console.log(event);
  console.log(context);
  try {
    if (event.body) {
      const parsedBody = JSON.parse(event.body);
      console.log(parsedBody);
      const {
        module: apiModule,
        method,
        body = "",
        param1 = "",
        param2 = "",
        param3 = "",
      } = parsedBody;
      const supportedModules = config.supportedModules.split(",");
      if (supportedModules.includes(apiModule)) {
        const params = {
          Message: event.body /* required */,
          TopicArn: `arn:aws:sns:eu-west-1:691394038608:${config.snsPrefix}-${apiModule}`,
        };
        console.log(params);
        const publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
          .publish(params)
          .promise();
        const publishText = await publishTextPromise;
        console.log("----");
        console.log(publishText);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    console.log({ statusCode: 200 });
    return { statusCode: 200 };
  }
};
