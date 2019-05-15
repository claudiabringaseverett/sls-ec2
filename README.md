# Serverless EC2 Manager

This example demonstrate how to list, start, and stop EC2 instances with aws and serverless.

## Setup

```
npm install
serverless deploy
```

## Usage

_List EC2 Instances_

```bash
curl -v \
  -XGET \
  -H 'Content-type: application/json' \
  -H 'accessKeyId: YOUR_ACCESS_KEY_ID' \
  -H 'secretAccessKey: YOUR_SECRET_ACCESS_KEY' \
  -H 'region: YOUR_REGION' \
  'https://YOUR_DEPLOYMENT_ID.execute-api.YOUR_DEPLOYMENT_REGION.amazonaws.com/dev/ec2/list'
```

```json
[
  {
    "name": "Your Instance Name",
    "InstanceId": "i-0e8e47e39df5f1245",
    "InstanceType": "t2.micro",
    "AvailabilityZone": "YOUR_REGIONd",
    "InstanceState": "running",
    "IPv4PublicIP": "100.26.186.79"
  }
]
```

_Start an EC2 Instance_

```bash
curl -v \
  -XGET \
  -H 'Content-type: application/json' \
  -H 'accessKeyId: YOUR_ACCESS_KEY_ID' \
  -H 'secretAccessKey: YOUR_SECRET_ACCESS_KEY' \
  -H 'region: YOUR_REGION' \
  'https://YOUR_DEPLOYMENT_ID.execute-api.YOUR_DEPLOYMENT_REGION.amazonaws.com/dev/ec2/start/YOUR_INSTANCE_ID'
```

```json
{
  "result": "Stopping Instance ID: i-0e8e47e39df6f2245"
}
```

_Stop an EC2 Instance_

```bash
curl -v \
  -XGET \
  -H 'Content-type: application/json' \
  -H 'accessKeyId: YOUR_ACCESS_KEY_ID' \
  -H 'secretAccessKey: YOUR_SECRET_ACCESS_KEY' \
  -H 'region: YOUR_REGION' \
  'https://YOUR_DEPLOYMENT_ID.execute-api.YOUR_DEPLOYMENT_REGION.amazonaws.com/dev/ec2/start/YOUR_INSTANCE_ID'
```

```json
{
  "result": "Starting Instance ID: i-0e8e47e39df6f2245"
}
```
