import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '50%',
//     height: '100vh',
//     overflow: 'scroll',
//     backgroundColor: '#CD5C5C',
//     padding: '10px',
//     display: 'inline-flex',
//     flexDirection: 'column',
//   },
//   chatContainer: {
//     // backgroundColor: theme.palette.primary.light,
//     borderRadius: '10px',
//     padding: '2px',
//     marginBottom: '2px',
//     display: 'inline-block',
//   },
//   chatText: {
//     width: 'fit-content',
//     backgroundColor: theme.palette.primary.light,
//     borderRadius: '10px',
//     padding: '10px',
//     marginBottom: '2px',
//   },
//   inputContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: '10px',
//   },
//   inputField: {
//     marginRight: '10px',
//     flex: 1,
//     backgroundColor: '#FFF',
//     borderRadius: '10px',
//     padding: '10px',
//     border: 'none',
//     outline: 'none',
//     fontSize: '16px',
//     color: theme.palette.text.primary,
//   },
//   sendButton: {
//     backgroundColor: theme.palette.primary.main,
//     color: '#FFF',
//     borderRadius: '10px',
//     padding: '10px',
//     border: 'none',
//     outline: 'none',
//     fontSize: '16px',
//     cursor: 'pointer',
//   },
//   // Use media queries to adjust styles for smaller screens
//   '@media (max-width: 600px)': {
//     inputContainer: {
//       flexDirection: 'column',
//     },
//     inputField: {
//       marginRight: '0',
//       marginBottom: '10px',
//       width: '100%',
//     },
//     sendButton: {
//       width: '100%',
//     },
//   },
// }));
const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    height: '100vh',
    overflow: 'scroll',
    backgroundColor: '#CD5C5C',
    padding: '10px',
    display: 'inline-flex',
    flexDirection: 'column',
  },
  chatContainer: {
    // backgroundColor: theme.palette.primary.light,
    borderRadius: '10px',
    padding: '2px',
    marginBottom: '2px',
    display: 'inline-block',
  },
  chatText: {
    width: 'fit-content',
    backgroundColor: theme.palette.primary.light,
    borderRadius: '10px',
    padding: '10px',
    marginBottom: '2px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10px',
  },
  inputField: {
    marginRight: '10px',
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: '10px',
    padding: '10px',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    color: theme.palette.text.primary,
  },
  sendButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFF',
    borderRadius: '10px',
    padding: '10px',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  // Use media queries to adjust styles for smaller screens
  '@media (max-width: 600px)': {
    inputContainer: {
      flexDirection: 'column',
    },
    inputField: {
      marginRight: '0',
      marginBottom: '10px',
      width: '100%',
    },
    sendButton: {
      width: '100%',
    },
  },
}))

const ChatBox = props => {
  const classes = useStyles()
  const [messages, setMessages] = React.useState([])
  const [newMessage, setNewMessage] = React.useState('')

  const handleMessageSend = e => {
    props.submit(newMessage, e) // Pass the new message and event object to the submit function
    setMessages([...messages, newMessage])
    setNewMessage('')
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      handleMessageSend(e) // Pass the event object to the handleMessageSend function
    }
  }

  return (
    <div className={classes.root}>
      <h2>Chat2Image</h2>
      <code>Chat with me and I'll respond with images as I make sense of what you're writing</code>

      {messages.map((message, index) => (
        <div key={index} className={classes.chatContainer}>
          <p className={classes.chatText}>{message}</p>
        </div>
      ))}
      <div className={classes.inputContainer}>
        <input
          type="text"
          placeholder="How do you feel?"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className={classes.inputField}
        />
        <button onClick={handleMessageSend} className={classes.sendButton}>
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatBox
