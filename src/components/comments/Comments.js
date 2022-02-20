import Comment from "./Comment"

export default function Comments({comments, updateDeleteId}) {
    return (
        <>
            <h1 className="sr-only">Frontend mentor comments</h1>
            <ol className='comments'>
                { comments.map((comment) => {
                    return (
                        <li key={comment.id}>
                            <Comment comment={ comment } updateDeleteId={ updateDeleteId } />
                            { comment.replies && 0 < comment.replies.length &&
                                <Comments comments={comment.replies} updateDeleteId={ updateDeleteId } />
                            }
                        </li>
                    )
                }) }
            </ol>
        </>
    )
}