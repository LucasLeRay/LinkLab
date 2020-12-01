import AWS from 'aws-sdk'

import { UpdateLinkInput, Link } from '../../generated/schema'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function updateLink(
  _: unknown,
  { input }: { input: UpdateLinkInput },
  context: any,
): Promise<Link> {
  const { user } = context
  if (!user) throw new Error('User not authenticated.')

  const params = {
    TableName: process.env.LINK_TABLE,
    Key: {
      userId: user.Username,
      linkId: input.id,
    },
    UpdateExpression: 'SET tags = :tags',
    ExpressionAttributeValues: {
      ':tags': [...new Set(input.tags)],
    },
    ReturnValues: 'ALL_NEW',
  }

  const {
    Attributes: { title, img, url, tags, linkId },
  } = await dynamoDb.update(params).promise()

  return {
    id: linkId,
    title,
    img,
    url,
    tags,
  }
}

export default updateLink
