export default function Modal({deleteId, updateDeleteId, handleDelete}) {
    const handleCancel = () => {
        updateDeleteId(null)
    }

    return (
        <div className={ `modal-container${ deleteId !== null ? " open" : "" }` }>
            <div className="modal">
                <form className="modal__form" onSubmit={ handleDelete }>
                    <h2 className="modal__form__heading f-xlrg">Delete comment</h2>
                    <p className="modal__form__text f-reg">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                    <input className="modal__form__btn modal__form__btn--cancel f-med" type="button" onClick={ handleCancel } value="No, Cancel" />
                    <input className="modal__form__btn modal__form__btn--delete f-med" type="submit" value="Yes, Delete" />
                </form>
            </div>
        </div>
    )
}