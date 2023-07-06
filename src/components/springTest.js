import React, { useEffect, useState } from 'react'
import { useSpring, useSprings, animated } from '@react-spring/web'
import { createUseGesture, dragAction, pinchAction } from '@use-gesture/react'
import { NewImgs } from './imageComp'
import { Form, Grid, Button, TextArea, Header } from 'semantic-ui-react'
import { kwExtract } from './brains/keywordExtractor'
import styles from '../styles.module.css'
// import Springy from './components/springTest'
const useGesture = createUseGesture([dragAction, pinchAction])

export default function App() {
  const [backgroundImage, setBackgroundImage] = useState([])
  //  'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'

  const [userText, setUserText] = useState('')
  const [keyWords, setKeyWords] = useState([])
  const [loading, setLoading] = useState(false)
  // const [imgURLs, setImgURLs] = useState([])

  useEffect(() => {
    const handler = e => e.preventDefault()
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
    }
  }, [])

  useEffect(() => {
    let imgs = NewImgs('squirt')
    setBackgroundImage(NewImgs('squirt'))
    window.onload = function () {
      document.querySelector('.card').style.backgroundImage = `url(${imgs})`
    }
  }, [])

  async function handleSubmit(env) {
    env.preventDefault()
    const textarea = env.target[0].value //.elements.textarea;
    // console.log('textarea', textarea)

    if (textarea) {
      await setUserText(textarea)
    }
  }

  async function getKeysImgs() {
    setLoading(true)
    const keywordArr = await kwExtract(userText)
    // console.log('userText', userText)
    await setKeyWords(keywordArr)
    // console.log('keywordArr', keywordArr)

    const promises = []
    for (let i = 0; i < keywordArr.length; i++) {
      // console.log('SHITTTTT')
      promises.push(await NewImgs(keywordArr[i]))
      // console.log(await 'i is promis', promises)
    }

    const images = await Promise.all(promises)
    setBackgroundImage(images.flat().map(item => item))
  }

  useEffect(() => {
    if (backgroundImage.length > 0) {
      Promise.all(backgroundImage).then(() => {
        setLoading(false)
        // console.log('backgroundImage', backgroundImage)
      })
    }
  }, [backgroundImage])

  useEffect(() => {
    if (userText.length > 0) {
      getKeysImgs()
    }
  }, [userText])
  // let imgs = NewImgs('squirt');
  // setBackgroundImage( NewImgs('squirt'))
  // window.onload = function() {
  //   document.querySelector('.card').style.backgroundImage = `url(${imgs})`;
  // }

  // const [style, api] = useSpring(() => ({
  //   // x: 0,
  //   // y: 0,
  //   scale: 1,
  //   rotateZ: 0,
  // }))

  // NEW
  // if(backgroundImage.length > 0){
  //   console.log("backgroundImage.length",backgroundImage.length)
  //   let nums =  backgroundImage.length

  // const [springs, set] = useSprings(4, index => ({
  //   opacity: 0,
  //   transform: 'translate3d(0,-40px,0)'
  // }))}
  const [styles2, api2] = useSprings(backgroundImage.length || 1, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    x: (backgroundImage.length || 1) * 100,
    y: (backgroundImage.length || 1) * 100,
    scale: 1,
    rotateZ: 0,
  })

  const ref = React.useRef(null)

  useGesture(
    {
      // onHover: ({ active, event }) => console.log('hover', event, active),
      // onMove: ({ event }) => console.log('move', event),
      onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
        if (pinching) return cancel()
        api2.start({ x, y })
      },
      onPinch: ({ origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
        if (first) {
          const { width, height, x, y } = ref.current.getBoundingClientRect()
          const tx = ox - (x + width / 2)
          const ty = oy - (y + height / 2)
          memo = [styles2.x.get(), styles2.y.get(), tx, ty]
        }

        const x = memo[0] - ms * memo[2]
        const y = memo[1] - ms * memo[3]
        api2.start({ scale: s, rotateZ: a, x, y })
        return memo
      },
    },
    {
      target: ref,
      drag: { from: () => [styles2.x.get(), styles2.y.get()] },
      pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
    }
  )
  return (
    <>
      <div className={`flex fill center ${styles.container}`}>
        <Grid>
          <div>
            <Grid.Row>
              <Grid.Column width={4}>
                <Header as="h1">Worries to Images </Header>
                <Form onSubmit={handleSubmit}>
                  <TextArea
                    rows={2}
                    placeholder="Tell me about your worries"
                    style={{ borderStyle: 'none', border: '0px', minHeight: 200 }}
                  />
                  <br />
                  <Button type="submit" style={{ borderRadius: '10%', borderStyle: 'none' }}>
                    Display images
                  </Button>
                </Form>
                <br />
              </Grid.Column>
            </Grid.Row>
          </div>

          {/* {Array.isArray(backgroundImage) &&
            backgroundImage.map((item, index) => (
              <>
                {index % 4 === 0 && <Grid.Row key={`row-${index}`} />}
                <Grid.Column width={4} key={`column-${index}`}>
                  {console.log('I AM ITEM', item)}
                  <animated.div
                    className={styles.card}
                    ref={ref}
                    style={{ ...style, backgroundImage: `url(${item})` }}></animated.div>
                </Grid.Column>
              </>
            ))} */}
          {/* <Grid columns={4} stackable> */}
          <div className="ui grid">
            {loading && <div className="ui active centered inline loader"></div>}
            {!loading &&
              Array.isArray(backgroundImage) &&
              backgroundImage.length > 0 &&
              backgroundImage.map((item, index) => (
                // <Grid.Column key={`column-${index}`} computer={4}>
                <div class="four wide column">
                  <animated.div
                    className={styles.card}
                    ref={ref}
                    style={{ ...styles2, backgroundImage: `url(${item})` }}></animated.div>
                </div>
                // </Grid.Column>
              ))}
            {/* </Grid> */}
          </div>
        </Grid>
      </div>
    </>
  )
}
