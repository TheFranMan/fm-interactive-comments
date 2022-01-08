import { useContext } from "react";
import userContext from '../userContext'
import dispatchContext from '../dispatchContext'
import { ACTIONS } from '../App'
import {ReactComponent as IconDelete} from "../../assets/images/icon-delete.svg"
import {ReactComponent as IconEdit} from "../../assets/images/icon-edit.svg"
import {ReactComponent as IconReply} from "../../assets/images/icon-reply.svg"

export default function Actions ({comment, handleReplyLink}) {
    const user = useContext(userContext);
    const dispatch = useContext(dispatchContext);

    let isAuthor = comment.user.username === user.username || false

    return (
        <ul className="actions">
            { isAuthor &&
                <>
                    <li key='delete' className="actions__item">
                        <button className='actions__item__btn actions__item__btn--delete f-med' onClick={() => dispatch({type: ACTIONS.REMOVE, payload: {id: comment.id}})}>
                            <IconDelete /><span>Delete</span>
                        </button>
                    </li>
                    <li key='edit' className="actions__item">
                        <button className='actions__item__btn --edit f-med'>
                        <IconEdit />Edit</button>
                    </li>
                </>
            }
            { !isAuthor &&
                <li key='rely' className="actions__item">
                    <button className='actions__item__btn actions__item__btn--reply' onClick={() => handleReplyLink()}>
                        <IconReply />Reply
                    </button>
                </li>
            }
        </ul>
    )
}