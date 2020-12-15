import AWS from 'aws-sdk'

import { Category } from '../../generated/schema'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function categories(
  _: unknown,
  { tag, userId }: { tag: string; userId: string },
  context: any,
): Promise<Array<Category>> {
  const { user } = context
  if (!user) throw new Error('User not authenticated.')

  const params = {
    TableName: process.env.CATEGORY_TABLE,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': user.Username,
    },
  }

  const result = await dynamoDb.query(params).promise()

  return result.Items.map(({ name, icon }) => ({
    name,
    icon,
  }))
}

export default categories
