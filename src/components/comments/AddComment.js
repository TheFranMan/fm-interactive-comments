import { useContext } from 'react'
import { ACTIONS } from '../App'
import userContext from '../userContext'
import dispatchContext from '../dispatchContext'

export default function AddComment({btnText}) {
    const user = useContext(userContext);
    const dispatch = useContext(dispatchContext);

    return (
        <form>
            <img src={ user.image.png } />
            <textarea></textarea>
            <input type="submit" value={ btnText } onClick={ (e) => {
                e.preventDefault()
                dispatch({type: ACTIONS.ADD}) }
            }/>
        </form>
    )
}