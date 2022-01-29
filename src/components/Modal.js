import AriaModalfrom from 'react-aria-modal'

export default function Modal({deleteId, updateDeleteId, handleDelete}) {
    const handleCancel = () => {
        updateDeleteId(null)
    }

    let modal = <AriaModalfrom
                    titleId="modal-heading"
                    includeDefaultStyles="false"
                    verticallyCenter="true"
                    underlayColor="rgba(0,0,0, .6)"
                >
                    <div className="modal">
                        <h2 id='modal-heading' className="modal__heading">Delete comment</h2>
                        <p className="modal__description f-reg">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                        <form className="modal__form" onSubmit={ handleDelete }>
                            <input className="modal__form__btn modal__form__btn--cancel f-med" type="button" onClick={ handleCancel } value="No, Cancel" />
                            <input className="modal__form__btn modal__form__btn--delete f-med" type="submit" value="Yes, Delete" />
                        </form>
                    </div>
                </AriaModalfrom>

    return deleteId !== null ? modal : false
}