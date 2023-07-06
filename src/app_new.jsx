import React from 'react'
import { useSprings, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import { useMediaQuery } from '@material-ui/core'

const Page = props => {
  const [backgroundImages, setBackgroundImages] = React.useState(props.imgs)
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const maxImagesPerRow = 4
  const numRows = Math.ceil(backgroundImages.length / maxImagesPerRow)
  let rows = []

  React.useEffect(() => {
    setBackgroundImages(props.imgs)
  }, [props.imgs])

  for (let i = 0; i < numRows; i++) {
    const start = i * maxImagesPerRow
    const end = (i + 1) * maxImagesPerRow
    const rowImages = backgroundImages.slice(start, end)
    rows.push(rowImages)
  }

  return (
    <div
      style={{
        display: 'flex',
        margins: '10',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {rows.map((rowImages, rowIndex) => (
        <div
          key={rowIndex}
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {rowImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Background ${index}`}
              style={{ width: `${100 / maxImagesPerRow}%`, maxWidth: '100%' }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Page
