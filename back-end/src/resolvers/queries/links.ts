import AWS from 'aws-sdk'

import { Link } from '../../generated/schema'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function links(
  _: unknown,
  { tag, userId }: { tag: string; userId: string },
  context: any,
): Promise<Array<Link>> {
  const { user } = context
  if (!user && (!tag || !userId)) throw new Error('User not authenticated.')

  const params = {
    TableName: process.env.LINK_TABLE,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId || user.Username,
    },
  }

  const result = await dynamoDb.query(params).promise()

  return result.Items.filter((link) => !userId || link.tags.includes(tag)).map(
    ({ linkId: id, title, img, url, tags }) => ({
      id,
      title: title || url,
      img,
      url,
      tags,
    }),
  )
}

export default links
