export default async (userId, tag) => {
  const permission = await navigator.permissions.query({
    name: 'clipboard-write',
  })
  if (permission?.state === 'granted') {
    await navigator.clipboard.writeText(`https://linklab.app/${userId}/${tag}`)
  }
}
