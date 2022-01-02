import { useContext } from "react";
import dispatchContext from '../dispatchContext'
import {ReactComponent as IconPlus} from "./../../assets/images/icon-plus.svg"
import {ReactComponent as IconMinus} from "../../assets/images/icon-minus.svg"
import Actions from './Actions'
import { ACTIONS } from '../App'

export default Comment = ({comment}) => {
    const dispatch = useContext(dispatchContext);

    return (
        <div className='comment'>
            <header className='comment__heading'>
                <img src={comment.user.image.png} className='comment__heading__avatar' />
                <span className='comment__header__name'>{ comment.user.username }</span>
                <span className='comment__header__created'>{ comment.createdAt }</span>
            </header>
            <div className='comment__body'>
                { comment.content }
            </div>
            <div className='comment__score' aria-label="score">
                <button
                    className='comment__score__btn comment__score__btn--increase'
                    onClick={() => dispatch({type: ACTIONS.SCORE.INCREASE, payload: {id: comment.id}})}>
                        <IconPlus />
                </button>
                <span className="comment__score__value">{ comment.score }</span>
                <button
                    className='comment__score__btn comment__score__btn--decrease' 
                    onClick={() => dispatch({type: ACTIONS.SCORE.DECREASE, payload: {id: comment.id}})}>
                        <IconMinus />
                </button>
            </div>
            <Actions comment={comment} />
        </div>
    )
}