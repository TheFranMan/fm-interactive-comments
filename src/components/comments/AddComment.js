import { useContext } from 'react'

import userContext from '../userContext'

export default function AddComment({btnText, className, showReply, replyRef, handleSubmit, handleCancel}) {
    const user = useContext(userContext);

    let id = null
    if ( className ) {
        let classNames = className.split(" ")
        for ( let i in classNames ) {
            if (classNames[i].startsWith("to-")) {
                id = classNames[i]
                break
            }
        }
    }

    let classVisable = showReply ? 'visable' : ''
    let classes = 'response ' + className + ' ' + classVisable

    return (
        <form id={ id } className={ classes } onSubmit={ handleSubmit } aria-hidden={'reply' === className ? true : false}>
            <textarea className='response__content f-reg' ref={ replyRef } placeholder='Add a comment...'></textarea>
            <img className='response__avatar' src={ user.image.png } alt="" />
            <input className='response__submit f-med' type="submit" value={ btnText } />
        </form>
    )
}