import Comment from "./Comment"

export default function Comments({comments, updateDeleteId, isMain}) {
    return (
        <>
            <ol className={ `comments ${isMain ? 'main-thread' : 'reply-thread'}` }>
                { comments.map((comment) => {
                    return (
                        <li key={comment.id}>
                            <Comment comment={ comment } updateDeleteId={ updateDeleteId } />
                            { comment.replies && 0 < comment.replies.length &&
                                <Comments comments={comment.replies} updateDeleteId={ updateDeleteId } isMain={ false }/>
                            }
                        </li>
                    )
                }) }
            </ol>
        </>
    )
}