import { useContext, useState, useRef } from "react";
import userContext from '../userContext'
import dispatchContext from '../dispatchContext'
import {ReactComponent as IconPlus} from "./../../assets/images/icon-plus.svg"
import {ReactComponent as IconMinus} from "../../assets/images/icon-minus.svg"
import Actions from './Actions'
import AddComment from "./AddComment"
import { ACTIONS } from '../App'

const Comment = ({comment, updateDeleteId}) => {
    const user = useContext(userContext);
    const dispatch = useContext(dispatchContext);

    let isAuthor = comment.user.username === user.username || false

    const [showReply, updateShowReply] = useState(false)
    const [editing, updateEditing] = useState(false)

    const replyRef = useRef(null);
    const editRef = useRef(null);

    const handleReplyLink = () => {
        // document.querySelector(`.to-${comment.id}`).setAttribute('aria-hidden', 'false')

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

    const timeSince = (ts) => {
        let now = new Date()
        let timeStamp = new Date(ts)
        let secondsPast = ( now.getTime() - timeStamp.getTime() ) / 1000;

        let min = 60
        let hour = min * 60
        let day = hour * 24
        let week = day * 7
        let month = week * 4
        let year = month * 12

        let units = {
            second: "second",
            minute: "minute",
            hour: "hour",
            day: "day",
            week: "week",
            month: "month",
            year: "year"
        }

        let displayNum = 0
        let displayUnit = ""

        if ( 0 === parseInt(secondsPast ) ) {
            return "now"
        }

        if(secondsPast < min){
            displayNum = parseInt(secondsPast)
            displayUnit = units.second
        } else if(secondsPast < hour){
            displayNum = parseInt(secondsPast/min)
            displayUnit = units.minute
        } else if(secondsPast <= day){
            displayNum = parseInt(secondsPast/hour)
            displayUnit = units.hour
        } else if(secondsPast <= week){
            displayNum = parseInt(secondsPast/day)
            displayUnit = units.day
        } else if(secondsPast <= month){
            displayNum = parseInt(secondsPast/week)
            displayUnit = units.week
        } else if(secondsPast <= year) {
            displayNum = parseInt(secondsPast/month)
            displayUnit = units.month
        } else {
            displayNum = parseInt(secondsPast/year)
            displayUnit = units.year
        }

        if ( 1 < displayNum ) {
            displayUnit += "s"
        }

        return displayNum + " " + displayUnit + " ago"
    }

    let editComment = <textarea className='comment__body f-reg' defaultValue={ comment.content } ref={ editRef } ></textarea>
    let commentParentClass = `to-${comment.id}`
    let replyingClass = showReply ? "replying" : ""

    return (
        <>
            <div className={ `comment comment-${comment.id} ${replyingClass}` }>
                <header className='comment__heading' aria-label="user details">
                    <img src={comment.user.image.png} className='comment__heading__avatar' alt='' />
                    <span className='comment__heading__name f-lrg' aria-label="username">{ comment.user.username }</span>
                    <span className='comment__heading__created f-reg' aria-label="created">{ timeSince(comment.createdAt) }</span>
                </header>
                { !editing ?
                    <div className='comment__body f-reg'>{ comment.content }</div>
                    :
                    editComment
                 }
                <div className='comment__score' aria-label="score">
                    <button
                        aria-label="increase score"
                        className='comment__score__btn comment__score__btn--increase'
                        onClick={() => dispatch({type: ACTIONS.SCORE.INCREASE, payload: {id: comment.id}})}>
                            <IconPlus />
                    </button>
                    <span className="comment__score__value f-med">{ comment.score }</span>
                    <button
                        aria-label="decrease score"
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
                className={ `reply to-${comment.id}` }
                showReply={ showReply }
                btnText='Reply'
                replyRef={ replyRef }
                handleSubmit={ handleReplySubmit }
                handleCancel={ handleCancel }
            /> }
        </>
    )
}

export default Comment