import { useContext } from "react";
import userContext from '../userContext'
import {ReactComponent as IconDelete} from "../../assets/images/icon-delete.svg"
import {ReactComponent as IconEdit} from "../../assets/images/icon-edit.svg"
import {ReactComponent as IconReply} from "../../assets/images/icon-reply.svg"

export default function Actions ({comment, editing, handleReplyLink, handleEditLink, handleCancel, handleUpdate, handleDeleteLink}) {
    const user = useContext(userContext);

    let actions = <li key='reply' className="actions__item">
                    <button className='actions__item__btn actions__item__btn--reply f-med' aria-controls={ `to-${ comment.id }` } onClick={() => handleReplyLink()}>
                        <IconReply />Reply
                    </button>
                  </li>

    if ( comment.user.username === user.username ) {
        actions = <>
                      <li key='delete' className="actions__item">
                          <button className='actions__item__btn actions__item__btn--delete f-med' disabled={ editing } onClick={() => handleDeleteLink() }>
                              <IconDelete /><span>Delete</span>
                          </button>
                      </li>
                      <li key='edit' className="actions__item">
                          <button className='actions__item__btn actions__item__btn--edit f-med' disabled={ editing } onClick={ () => handleEditLink() }>
                          <IconEdit />Edit</button>
                      </li>
                  </>
    }

    let editingItems = ''
    if ( editing ) {
        editingItems = <ul className="editing">
                        <li key='cancel' className="actions__item">
                            <button className='actions__item__btn actions__item__btn--cancel f-med' onClick={ () => handleCancel() }>
                                Cancel
                            </button>
                        </li>
                        <li key='update' className="actions__item">
                            <button className='actions__item__btn actions__item__btn--update f-med' onClick={ () => handleUpdate() }>
                                Update
                            </button>
                        </li>
                    </ul>
    }

    let actionsClass = editing ? "actions is-editing" : "actions"
    return (
        <>
            <ul className={ actionsClass } aria-label="actions">
                { actions }
            </ul>
            { editingItems }
        </>
    )
}