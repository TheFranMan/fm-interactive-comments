import { useContext, useState } from "react";
import userContext from '../userContext'
import dispatchContext from '../dispatchContext'
import {ReactComponent as IconPlus} from "./../../assets/images/icon-plus.svg"
import {ReactComponent as IconMinus} from "../../assets/images/icon-minus.svg"
import Actions from './Actions'
import AddComment from "./AddComment"
import { ACTIONS } from '../App'

export default Comment = ({comment}) => {
    const user = useContext(userContext);
    const dispatch = useContext(dispatchContext);

    let isAuthor = comment.user.username === user.username || false

    const [showReply, updateShowReply] = useState(false)

    const handleEdit = () => {
        updateShowReply(true)
    }

    return (
        <>
            <div className='comment'>
                <header className='comment__heading'>
                    <img src={comment.user.image.png} className='comment__heading__avatar' alt='' />
                    <span className='comment__heading__name f-lrg'>{ comment.user.username }</span>
                    <span className='comment__heading__created f-reg'>{ comment.createdAt }</span>
                </header>
                <div className='comment__body f-reg'>
                    { comment.content }
                </div>
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
                <Actions comment={comment} handleEdit={handleEdit} />
            </div>
            { !isAuthor && <AddComment className='reply' showReply={ showReply } btnText='Reply' pid={ comment.id } /> } 
        </>
    )
}