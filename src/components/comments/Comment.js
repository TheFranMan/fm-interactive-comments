import { useContext, useState, useRef } from "react";
import userContext from '../userContext'
import dispatchContext from '../dispatchContext'
import {ReactComponent as IconPlus} from "./../../assets/images/icon-plus.svg"
import {ReactComponent as IconMinus} from "../../assets/images/icon-minus.svg"
import Actions from './Actions'
import AddComment from "./AddComment"
import { ACTIONS } from '../App'

export default Comment = ({comment, updateDeleteId}) => {
    const user = useContext(userContext);
    const dispatch = useContext(dispatchContext);

    let isAuthor = comment.user.username === user.username || false

    const [showReply, updateShowReply] = useState(false)
    const [editing, updateEditing] = useState(false)

    const replyRef = useRef(null);
    const editRef = useRef(null);

    const handleReplyLink = () => {
        replyRef.current.focus()
        updateShowReply(true)
    }

    const handleEditLink = () => {
        updateEditing(true)
        // editRef.current.focus()
    }

    const handleDeleteLink = () => {
        updateDeleteId(comment.id)
    }

    const handleReplySubmit = (e) => {
        e.preventDefault()

        let reply = replyRef.current.value
        if ('' === reply) {
            return
        }

        let payload = {
            comment: reply
        }

        if ( comment.id ) {
            payload.pid = comment.id
        }

        replyRef.current.value = null

        dispatch({
            type: ACTIONS.ADD,
            payload: payload
        })

        updateShowReply(false)
    }

    const handleCancel = () => {
        updateEditing(false)
        updateShowReply(false)
    }

    const handleUpdate = () => {
        let update = editRef.current.value
        if ('' === update) {
            return
        }

        dispatch({
            type: ACTIONS.UPDATE,
            payload: {
                id: comment.id,
                content: update,
            }
        })

        updateEditing(false)
    }

    let editComment = <textarea className='comment__body f-reg' defaultValue={ comment.content } ref={ editRef } ></textarea>

    return (
        <>
            <div className='comment'>
                <header className='comment__heading'>
                    <img src={comment.user.image.png} className='comment__heading__avatar' alt='' />
                    <span className='comment__heading__name f-lrg'>{ comment.user.username }</span>
                    <span className='comment__heading__created f-reg'>{ comment.createdAt }</span>
                </header>
                { !editing ?
                    <div className='comment__body f-reg'>{ comment.content }</div>
                    :
                    editComment
                 }
                <div className='comment__score' aria-label="score">
                    <button
                        className='comment__score__btn comment__score__btn--increase'
                        onClick={() => dispatch({type: ACTIONS.SCORE.INCREASE, payload: {id: comment.id}})}>
                            <IconPlus />
                    </button>
                    <span className="comment__score__value f-med">{ comment.score }</span>
                    <button
                        className='comment__score__btn comment__score__btn--decrease'
                        onClick={() => dispatch({type: ACTIONS.SCORE.DECREASE, payload: {id: comment.id}})}>
                            <IconMinus />
                    </button>
                </div>
                <Actions comment={comment}
                         editing={ editing }
                         handleReplyLink={ handleReplyLink }
                         handleEditLink={ handleEditLink }
                         handleCancel={ handleCancel }
                         handleUpdate={ handleUpdate }
                         handleDeleteLink={ handleDeleteLink }
                />
            </div>
            { !isAuthor &&
              <AddComment
                className='reply'
                showReply={ showReply }
                btnText='Reply'
                replyRef={ replyRef }
                handleSubmit={ handleReplySubmit }
                handleCancel={ handleCancel }
            /> }
        </>
    )
}