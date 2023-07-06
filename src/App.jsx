import React, { useEffect, useState } from 'react'
import { NewImgs } from './components/imageComp'
import { Form, Grid, Button, TextArea, Header, Image, Dimmer, Loader, Segment } from 'semantic-ui-react'
import { kwExtract } from './components/brains/keywordExtractor'

import Imgs from './app_right'
import Chats from './components/chats'
import ImageGrid from './components/ImageGrid'

export default function App() {
  const [backgroundImage, setBackgroundImage] = useState([])
  const [userText, setUserText] = useState('')
  const [keyWords, setKeyWords] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageHeight, setMessageHeight] = useState(0)

  useEffect(() => {
    let imgs = NewImgs('squirt')
    setBackgroundImage(NewImgs('squirt'))
    window.onload = function () {
      document.querySelector('.card').style.backgroundImage = `url(${imgs})`
    }
  }, [])

  async function handleSubmit(mes, env) {
    console.log('i am env', env)
    console.log('i am mes', mes)
    env.preventDefault()
    // const textarea = env.target[0].value
    let textarea = mes
    if (textarea) {
      await setUserText(textarea)
      // setMessageHeight(env.target[0].scrollHeight)
    }
  }

  async function getKeysImgs() {
    setLoading(true)
    const keywordArr = await kwExtract(userText)
    await setKeyWords(keywordArr)

    const promises = []
    for (let i = 0; i < keywordArr.length; i++) {
      promises.push(await NewImgs(keywordArr[i]))
    }

    const images = await Promise.all(promises)
    setBackgroundImage(images.flat().map(item => item))
  }

  useEffect(() => {
    if (backgroundImage.length > 0) {
      Promise.all(backgroundImage).then(() => {
        setLoading(false)
      })
    }
  }, [backgroundImage])

  useEffect(() => {
    if (userText.length > 0) {
      getKeysImgs()
    }
  }, [userText])

  return (
    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#CD5C5C' }}>
      <Chats submit={handleSubmit} />

      <ImageGrid imgs={backgroundImage} messageHeight={messageHeight} />
    </div>
  )
}
