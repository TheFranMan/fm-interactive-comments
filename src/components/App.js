import { useEffect, useMemo, useReducer } from 'react'
import "../assets/scss/main.scss"
import data from "../data.json"

const ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove'
}

function App() {
  const loggedInUser = {
    "image": {
      "png": "./images/avatars/image-amyrobson.png",
      "webp": "./images/avatars/image-amyrobson.webp"
    },
    "username": "amyrobson"
  }

  const defaultComment = {
      "id": 0,
      "content": "",
      "createdAt": Date.now(),
      "score": 0,
      "user": loggedInUser,
      "replies": []
  }

  let localStorage = window.localStorage;

  const newComment = (id, content) => {
    return {...defaultComment, id: id, content: content}
  }

  const addComment = (comments, pid, new_comment) => {
    let length = comments.length
    for (let i = 0; i < length; i++) {

      // Found the parent comment, add the new comment to it's replies
      if ( comments[i].id === pid ) {

        let nextState = JSON.parse(JSON.stringify(comments))

        // No replies array found for this comment. Create it and add new comment.
        if (!nextState[i].replies) {
          nextState[i].replies = [new_comment]
          return [true, nextState]
        }

        // Comment already has replies, add the new comment to them.
        nextState[i].replies = [...nextState[i].replies, new_comment]
        return [ true, nextState ]
      }

      // Not the parent comment, but it does have replies.
      // Check these comments for the parent.
      if ( comments[i].replies && 0 < comments[i].replies.length ) {

        let [updated, updatedComments] = addComment(comments[i].replies, pid, new_comment)
        if ( updated ) {
          let nextState = JSON.parse(JSON.stringify(comments))
          nextState[i].replies = updatedComments

          return [true, nextState]
        }
      }
    }

    return [ false, comments ]
  }

  const removeComment = (comments, id) => {
    let length = comments.length
    for( let i = 0; i < length; i++){

      // Found comment, remove it.
      if ( id === comments[i].id ) {
        let new_comments = JSON.parse(JSON.stringify(comments))
        new_comments.splice(i, 1);
        return [true, new_comments]
      }

      // Comment has replies, check them for the comment to delete
      if ( comments[i].replies && 0 < comments[i].replies.length ) {
        let [updated, new_replies] = removeComment(comments[i].replies, id)
        if ( updated ) {
          let new_comments = JSON.parse(JSON.stringify(comments))
          new_comments[i].replies = new_replies
          return [true, new_comments]
        }
      }
    }

    return [false, comments]
  }

  const reducer = (comments, action) => {
    switch (action.type) {
      case ACTIONS.ADD:
        let pid = null
        if ( action.payload && action.payload.pid ) {
          pid = action.payload.pid
        }

        if ( null === pid ) {
          return [...comments, newComment(gethighestID(comments) + 1 , "New comment text")]
        }


        let [updated, updatedComments] = addComment(comments, pid, newComment(gethighestID(comments) + 1 , "New comment text"))
        if ( updated ) {
          return updatedComments
        }
        // let length = comments.length
        // for (let i = 0; i < length; i++) {
        //   if ( comments[i].id === pid ) {
        //     let nextState = JSON.parse(JSON.stringify(comments))
        //     nextState[i].replies = [...nextState[i].replies, newComment(gethighestID(comments) + 1, "New comment text")]

        //     return nextState
        //   }
        // }

        return comments
      case ACTIONS.REMOVE:

        if ( !action.payload || !action.payload.id) {
          return comments
        }

        let [removed, new_comments] = removeComment(comments, action.payload.id)
        if ( removed ) {
          return new_comments
        }
      default:
        return comments
    }
  }

  const gethighestID = (comments) => {
    let highest = 0

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i]

      if ( highest < comment.id ) {
        highest = comment.id
      }

      if ( comment.replies && 0 < comment.replies.length ) {
        let thisHighest = gethighestID(comment.replies)

        if ( highest < thisHighest ) {
          highest = thisHighest
        }
      }
    }

    return highest
  }

  // Retrieve comments from local storage if they are there, otherwise get from the data object
  const memoizedSavedComments = useMemo(() => {
    let localComments = localStorage.getItem('comments')

    if ( localComments ) {
      console.log('comments from local storage')
      return JSON.parse(localComments)
    }

    console.log('comments from data object')
    return data.comments
  }, [localStorage])
  const [comments, dispatch] = useReducer(reducer, memoizedSavedComments)

  // Save the comments to localstorage when they are updated.
  useEffect(() => {
      localStorage.setItem('comments', JSON.stringify(comments))
  }, [localStorage, comments])

    // const getComment = (comments, id) => {
    //   let length = comments.length

    //   for (let i = 0; i < length; i++) {
    //     let comment = comments[i]

    //     if ( id === comment.id ) {
    //       return comment
    //     }

    //     if ( comment.replies && 0 < comment.replies.length ) {
    //       let response = getComment(comment.replies, id)

    //       if ( response ) {
    //         return response
    //       }
    //     }
    //   }

    //   return null
    // }

  console.log(comments)


  const renderComments = (comments) => {
    if ( 0 === comments.length ) {
      return
    }

    return (
      <ol>
        { comments.map(comment => {
          return <li key={comment.id}>{ comment.id } { comment.replies && renderComments(comment.replies) }</li>
        })}
      </ol>
    )
  }

  return (
    <>
      <section className="container" aria-labelledby="comment-heading">
        <h1 id="comment-heading" className="sr-only">Interactive Comments</h1>
        {renderComments(comments)}
      </section>

      <button onClick={ () => dispatch({type: ACTIONS.ADD}) }>Add</button>
      <button onClick={ () => dispatch({type: ACTIONS.REMOVE, payload: {id: 2}}) }>Remove</button>
    </>
  );
}

export default App;