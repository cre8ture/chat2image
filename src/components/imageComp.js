import { createClient } from 'pexels'

const secretKey = process.env.SECRET_KEY_IMG
console.log(secretKey)

const client = createClient('YCxkgCCbD1pYkd5j7xtbdOWef27Ihq1PgY37Vs5YweHLLM85EdRKXfTW')

export function NewImgs(query) {
  return client.photos.search({ query, per_page: 1 }).then(photos => {
    try {
      if (photos.photos[0]) {
        const photoUrl = photos.photos[0].src.tiny
        console.log('moo', photoUrl)
        return photoUrl
      }
      return 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'
    } catch {
      console.log('BIG BAD ERROR!')
      return 'big bad error'
    }
  })
}
