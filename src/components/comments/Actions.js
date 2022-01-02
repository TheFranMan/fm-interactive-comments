import { useContext } from "react";
import userContext from '../userContext'
import dispatchContext from '../dispatchContext'
import { ACTIONS } from '../App'
import {ReactComponent as IconDelete} from "../../assets/images/icon-delete.svg"
import {ReactComponent as IconEdit} from "../../assets/images/icon-edit.svg"
import {ReactComponent as IconReply} from "../../assets/images/icon-reply.svg"

export default function Actions ({comment}) {
    const user = useContext(userContext);
    const dispatch = useContext(dispatchContext);

    let isAuthor = comment.user.username === user.username || false

    return (
        <div >
            <ul>
                { isAuthor &&
                    <>
                        <li key='delete'>
                            <button onClick={() => dispatch({type: ACTIONS.REMOVE, payload: {id: comment.id}})}>
                                <IconDelete />Delete
                            </button>
                        </li>
                        <li key='edit'>
                            <button>
                            <IconEdit />Edit</button>
                        </li>
                    </>
                }
                { !isAuthor &&
                    <li key='rely'>
                        <button onClick={() => dispatch({type: ACTIONS.ADD, payload: {pid: comment.id}})}>
                            <IconReply />Reply
                        </button>
                    </li>
                }
            </ul>
        </div>
    )
}