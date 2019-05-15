"use strict";
const aws = require("aws-sdk");

module.exports.handler = async event => {
  const { accessKeyId, secretAccessKey, region } = event.headers;

  if (!accessKeyId || !secretAccessKey || !region) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error:
          "You must provide the next headers: accessKeyId, secretAccessKey, and region"
      })
    };
  }

  aws.config.update({
    accessKeyId,
    secretAccessKey,
    region
  });

  const ec2 = new aws.EC2();

  const params = {
    InstanceIds: [event.pathParameters.id],
    DryRun: false
  };

  return (async () => {
    try {
      let response = "";
      const data = await ec2.stopInstances(params).promise();

      // if (
      //   data.StoppingInstances[0].CurrentState.Name ===
      //   data.StoppingInstances[0].PreviousState.Name
      // ) {
      //   response = "This instance is already stopped.";
      // } else {
      //   response =
      //     "Stopping Instance ID: " + data.StoppingInstances[0].InstanceId;
      // }

      return {
        statusCode: 200,
        body: JSON.stringify({
          result: "Stopping Instance ID: " + event.pathParameters.id
        })
      };
    } catch (e) {
      // console.log("Errorr:", e);
      return {
        statusCode: 400,
        body: JSON.stringify({
          result: "Stopping Instance ID: " + event.pathParameters.id
        })
      };
    }
  })();
};
