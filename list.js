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

  const params = {};

  return (async () => {
    const instancesList = [];

    try {
      const data = await ec2.describeInstances(params).promise();

      data.Reservations[0].Instances.map(ins => {
        const instance = {};
        instance.name = ins.Tags[0].Value;
        instance.InstanceId = ins.InstanceId;
        instance.InstanceType = ins.InstanceType;
        instance.AvailabilityZone = ins.Placement.AvailabilityZone;
        instance.InstanceState = ins.State.Name;
        instance.IPv4PublicIP = ins.PublicIpAddress;

        // console.log("INSTANCE: ", instance);
        instancesList.push(instance);
        return instance;
      });

      // console.log("instancesList", instancesList);

      return {
        statusCode: 200,
        body: JSON.stringify(instancesList)
      };
    } catch (e) {
      console.log("Errorr:", e);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: e })
      };
    }
  })();
};
