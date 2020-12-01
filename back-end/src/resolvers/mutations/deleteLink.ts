import AWS from 'aws-sdk'
import { v4 } from 'uuid'

import { DeleteLinkInput, Link } from '../../generated/schema'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function deleteLink(
  _: unknown,
  { input }: { input: DeleteLinkInput },
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
    ReturnValues: 'ALL_OLD',
  }

  const {
    Attributes: { title, img, url, tags, linkId },
  } = await dynamoDb.delete(params).promise()

  return {
    id: linkId,
    title,
    img,
    url,
    tags,
  }
}

export default deleteLink
