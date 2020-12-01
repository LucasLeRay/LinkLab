import AWS from 'aws-sdk'
import { v4 } from 'uuid'

import { CreateLinkInput, Link } from '../../generated/schema'
import scrapMetaData from '../../helpers/scrapMetaData'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function createLink(
  _: unknown,
  { input }: { input: CreateLinkInput },
  context: any,
): Promise<Link> {
  const { user } = context
  if (!user) throw new Error('User not authenticated.')

  let meta: { title: string; img: string } = {
    title: input.url,
    img: null,
  }
  try {
    meta = await scrapMetaData(input.url)
  } catch (err) {
    console.error(err)
  }

  const id = v4()
  const params = {
    TableName: process.env.LINK_TABLE,
    Item: {
      userId: user.Username,
      title: meta.title,
      img: meta.img,
      linkId: id,
      url: input.url,
      tags: [...new Set(input.tags)],
      createdAt: Date.now(),
    },
  }

  await dynamoDb.put(params).promise()

  return {
    id,
    title: meta.title,
    img: meta.img,
    ...input,
  }
}

export default createLink
