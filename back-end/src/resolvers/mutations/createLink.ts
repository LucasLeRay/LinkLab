import AWS from 'aws-sdk'
import { v4 } from 'uuid'

import { CreateLinkInput, Link } from '../../generated/schema'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function createLink(
  _: any,
  { input }: { input: CreateLinkInput },
  context: any,
): Promise<Link> {
  const { user } = context
  if (!user) throw new Error('User not authenticated.')

  const id = v4()
  const params = {
    TableName: process.env.LINK_TABLE,
    Item: {
      userId: user.Username,
      noteId: id,
      url: input.url,
      tags: input.tags,
      createdAt: Date.now(),
    },
  }

  await dynamoDb.put(params).promise()

  return {
    id,
    title: 'TITLE',
    img: '',
    ...input,
  }
}

export default createLink
