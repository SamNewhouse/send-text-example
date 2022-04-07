import AWS from 'aws-sdk';
import { PublishInput } from 'aws-sdk/clients/sns';
import { AWS_IAM_ACCESS_SECRET_KEY, AWS_IAM_ACCESS_KEY_ID, AWS_SNS_TOPIC_ARN } from 'env';

const SNS = new AWS.SNS({
  accessKeyId: AWS_IAM_ACCESS_KEY_ID,
  secretAccessKey: AWS_IAM_ACCESS_SECRET_KEY
});

export const publishSms = async (number: string, message: string) => {
  const params: PublishInput = {
    Message: JSON.stringify({message, number}),
    TopicArn: AWS_SNS_TOPIC_ARN
  }
  await SNS.publish(params).promise();
}

export const sendSms = async (number: string, message: string) => {
  const params: PublishInput = {
    Message: JSON.stringify(message),
    PhoneNumber: JSON.stringify(number),
    MessageAttributes: {
      'AWS.SNS.SMS.SenderID': {
        'DataType': 'String',
        'StringValue': 'SamNewhouse'
      }
    }
  }
  await SNS.publish(params).promise();
}
