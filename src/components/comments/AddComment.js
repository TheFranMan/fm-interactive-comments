import { useContext, useRef } from 'react'
import { ACTIONS } from '../App'
import userContext from '../userContext'
import dispatchContext from '../dispatchContext'

export default function AddComment({btnText}) {
    const user = useContext(userContext);
    const dispatch = useContext(dispatchContext);

    const inputEl = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault()

        let comment = inputEl.current.value

        if ('' === comment) {
            return
        }

        dispatch({
            type: ACTIONS.ADD,
            payload: {
                comment: comment
            }
        })
    }

    return (
        <form onSubmit={ handleSubmit }>
            <img src={ user.image.png } />
            <textarea ref={ inputEl }></textarea>
            <input type="submit" />
        </form>
    )
}