import React from 'react'
import { useSprings, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import { useMediaQuery } from '@material-ui/core'

const Page = props => {
  const [backgroundImages, setBackgroundImages] = React.useState(props.imgs)
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const length = backgroundImages.length || 3

  React.useEffect(() => {
    setBackgroundImages(props.imgs)
  }, [props.imgs])

  const backgroundImage = isSmallScreen ? backgroundImages[0] : backgroundImages[1]

  const config = {
    mass: 1,
    tension: 500,
    friction: 50,
  }

  const [springs, setSprings] = useSprings(length, index => ({
    x: 100 * (index + 1),
    opacity: 0,
    delay: 1000 * (index + 1),
    config,
  }))

  React.useEffect(() => {
    setSprings(index => ({
      x: 0,
      opacity: 1,
      delay: 1000 * (index + 1),
      config,
    }))
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
      <div style={{ position: 'absolute', right: 0, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {springs.map((style, index) => (
          <animated.img
            key={index}
            src={backgroundImages[index]}
            alt={`Background`}
            style={{
              position: 'relative',
              top: 0,
              left: 0,
              opacity: style.opacity,
              transform: style.x.interpolate(x => `translateX(${x}%)`),
              width: '100%',
              height: '100%',
            }}
          />
        ))}
      </div>
      {/* <img src={backgroundImage} alt={`Background`} style={{ width: '100%' }} /> */}
    </div>
  )
}

export default Page
