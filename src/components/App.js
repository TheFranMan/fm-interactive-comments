import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import "../assets/scss/main.scss"
import data from "../data.json"
import Comments from "./comments/Comments"
import Modal from "./Modal"
import AddComment from "./comments/AddComment"
import userContext from './userContext'
import dispatchContext from './dispatchContext'
import ACTIONS from '../actions.js'
import { create_comment, add_comment, delete_comment, update_comment, update_score, get_highest_id } from '../modals/comments/comments'

function App() {

  const reducer = (comments, action) => {
    switch (action.type) {
      case ACTIONS.ADD:
        let pid = null

        if ( action.payload && action.payload.pid ) {
          pid = action.payload.pid
        }

        if (!action.payload || !action.payload.comment) {
          return comments
        }

        let id = get_highest_id(comments) + 1

        if ( null === pid ) {
          return [...comments, create_comment(id, action.payload.comment)]
        }

        let [added, updatedComments] = add_comment(comments, pid, create_comment(id , action.payload.comment))
        if ( added ) {
          return updatedComments
        }

        return comments
      case ACTIONS.REMOVE:
        if ( !action.payload || !action.payload.id) {
          return comments
        }

        let [removed, new_comments] = delete_comment(comments, action.payload.id)
        if ( removed ) {
          return new_comments
        }

        return comments
      case ACTIONS.UPDATE:
        if ( !action.payload || !action.payload.id || !action.payload.content ) {
          return comments
        }

        let [updated, updated_comments] = update_comment(comments, action.payload.id, action.payload.content)
        if ( updated ) {
          return updated_comments
        }

        return comments
        case ACTIONS.SCORE.INCREASE:
        case ACTIONS.SCORE.DECREASE:
          if ( !action.payload || !action.payload.id ) {
            return comments
          }

          let [updated_score, updated_score_comments] = update_score(comments, action.payload.id, action.type)
          if ( updated_score ) {
            return updated_score_comments
          }

          return comments
      default:
        return comments
    }
  }

  let localStorage = window.localStorage;

  // Retrieve comments from local storage if they are there, otherwise get from the data object
  const get_inital_comments = useMemo(() => {
    let localComments = localStorage.getItem('comments')

    const sortByScore = (comments) => {
      return comments.sort((a, b) => b.score - a.score )
    }

    if ( localComments ) {
      // console.log('comments from local storage')
      return sortByScore(JSON.parse(localComments))
    }

    // console.log('comments from data object')

    return sortByScore(data.comments)
  }, [localStorage])

  ////////////////////////////
  // Hooks
  ////////////////////////////
  const [comments, dispatch] = useReducer(reducer, get_inital_comments)
  const [deleteId, updateDeleteId] = useState(null)
  const newCommentRef = useRef(null);
  const UserContext = userContext
  const DispatchContext = dispatchContext

  // Save the comments to localstorage when they are updated.
  useEffect(() => {
      localStorage.setItem('comments', JSON.stringify(comments))
  }, [comments, localStorage])

  ////////////////////////////
  // Handlers
  ////////////////////////////
  const handleNewComment = (e) => {
    e.preventDefault()

    let reply = newCommentRef.current.value
    if ('' === reply) {
        return
    }

    newCommentRef.current.value = null

    dispatch({
        type: ACTIONS.ADD,
        payload: {
          comment: reply
      }
    })
}

const handleDelete = (e) => {
  e.preventDefault()

  dispatch({type: ACTIONS.REMOVE, payload: {id: deleteId}})
  updateDeleteId(null)
}

  return (
    <DispatchContext.Provider value={ dispatch }>
      <UserContext.Provider value={ data.currentUser }>
        <h1 className="sr-only">Frontend mentor comments</h1>
        <Comments comments={ comments } updateDeleteId={ updateDeleteId } isMain={ true }/>
        <AddComment btnText='Send' replyRef={ newCommentRef } handleSubmit={ handleNewComment } />
        <Modal deleteId={ deleteId } updateDeleteId={ updateDeleteId } handleDelete={ handleDelete } />
      </UserContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
