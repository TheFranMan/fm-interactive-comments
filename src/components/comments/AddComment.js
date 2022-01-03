import { useContext, useRef } from 'react'
import { ACTIONS } from '../App'
import userContext from '../userContext'
import dispatchContext from '../dispatchContext'

export default function AddComment({btnText, className, showReply, pid}) {
    const user = useContext(userContext);
    const dispatch = useContext(dispatchContext);

    const inputEl = useRef(null);

    let classVisable = showReply ? 'visable' : ''
    let classes = 'response ' + className + ' ' + classVisable 

    const handleSubmit = (e) => {
        e.preventDefault()

        let comment = inputEl.current.value

        if ('' === comment) {
            return
        }

        let payload = {
            comment: comment
        }

        if ( pid ) {
            payload.pid = pid
        }

        inputEl.current.value = null

        dispatch({
            type: ACTIONS.ADD,
            payload: payload
        })
    }

    return (
        <form className={ classes } onSubmit={ handleSubmit } aria-hidden={'reply' === className ? true : false}>
            <textarea className='response__content f-reg' ref={ inputEl } placeholder='Add a comment...'></textarea>
            <img className='response__avatar' src={ user.image.png } alt='' />
            <input className='response__submit f-med' type="submit" value={ btnText } />
        </form>
    )
}