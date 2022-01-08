import { useContext } from 'react'

import userContext from '../userContext'

export default function AddComment({btnText, className, showReply, replyRef, handleSubmit, handleCancel}) {
    const user = useContext(userContext);

    let classVisable = showReply ? 'visable' : ''
    let classes = 'response ' + className + ' ' + classVisable

    return (
        <form className={ classes } onSubmit={ handleSubmit } aria-hidden={'reply' === className ? true : false}>
            <textarea className='response__content f-reg' ref={ replyRef } placeholder='Add a comment...'></textarea>
            <img className='response__avatar' src={ user.image.png } alt="" />
            <input className='response__submit f-med' type="button" value='cancel' onClick={ () => handleCancel() } />
            <input className='response__submit f-med' type="submit" value={ btnText } />
        </form>
    )
}