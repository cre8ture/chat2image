import React, { useEffect, useState, useRef } from 'react'
import { Grid, Image, Loader } from 'semantic-ui-react'

export default function ImageGrid({ imgs, messageHeight }) {
  const [delay, setDelay] = useState(300)
  const [backgroundImages, setBackgroundImages] = useState(imgs)
  const [currentMessageHeight, setCurrentMessageHeight] = useState(messageHeight)
  const [imageRows, setImageRows] = useState([imgs])
  const prevImgsRef = useRef(imgs)

  useEffect(() => {
    setDelay(300)
  }, [imgs])

  useEffect(() => {
    if (Array.isArray(imgs) && JSON.stringify(imgs) !== JSON.stringify(prevImgsRef.current)) {
      setImageRows(prevImageRows => [...prevImageRows, imgs])
      setBackgroundImages(imgs)
      prevImgsRef.current = imgs
    }
  }, [imgs])

  useEffect(() => {
    setCurrentMessageHeight(prevMessageHeight => prevMessageHeight + 100)
  }, [backgroundImages])

  return (
    <div className="imgRows" style={{ backgroundColor: '#CD5C5C', overflow: 'auto', marginTop: '20px' }}>
      {imageRows.map((rowImages, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {Array.isArray(rowImages) &&
            rowImages.map((url, index) => (
              <div key={index} style={{ flex: '1 0 25%', height: '75px', margin: '0px 5px 5px 0px' }}>
                <Image
                  src={url}
                  style={{
                    transition: `transform ${index * delay}ms`,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  className="hover-zoom"
                />
              </div>
            ))}
        </div>
      ))}
      {imgs && imgs.length === 0 && <div>No Images Found</div>}
    </div>
  )
}
