import AWS from 'aws-sdk'

import { UpdateCategoryIconInput, Category } from '../../generated/schema'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function updateCategoryIcon(
  _: unknown,
  { input }: { input: UpdateCategoryIconInput },
  context: any,
): Promise<Category> {
  const { user } = context
  if (!user) throw new Error('User not authenticated.')

  const params = {
    TableName: process.env.CATEGORY_TABLE,
    Key: {
      userId: user.Username,
      name: input.name,
    },
    UpdateExpression: 'SET icon = :icon',
    ExpressionAttributeValues: {
      ':icon': input.icon,
    },
    ReturnValues: 'ALL_NEW',
  }

  await dynamoDb.update(params).promise()

  return {
    id: `${user.Username}:${input.name}`,
    ...input,
  }
}

export default updateCategoryIcon
