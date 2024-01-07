import { cache } from 'react'

const fetchInitial = cache(
  // eslint-disable-next-line no-return-await
  async () => await fetch('http://0.0.0.0:8001/v1/post?page=1')
)

export default async function Home() {
  const data = await fetchInitial()
  console.log(await data.json())
  return null
}
