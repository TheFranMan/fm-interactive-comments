import Comment from "./Comment"

export default function Comments({comments}) {
    return (
        <ol className='comments'>
            { comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <Comment comment={comment} />
                        { comment.replies && 0 < comment.replies.length &&
                            <Comments comments={comment.replies} />
                        }
                    </li>
                )
            }) }
      </ol>
    )
}