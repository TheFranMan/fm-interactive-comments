import data from "../../data.json"
import actions from '../../actions'

const loggedInUser = data.currentUser

const comment = {
    "id": 0,
    "content": "",
    "createdAt": 0,
    "score": 0,
    "user": loggedInUser,
    "replies": []
}

export const create_comment = (id, content) => {
    return {...comment, id: id, content: content, createdAt: Date.now()}
}

export const add_comment = (comments, pid, new_comment) => {
    let length = comments.length
    for (let i = 0; i < length; i++) {

        // Found the parent comment, add the new comment to it's replies
        if ( comments[i].id === pid ) {
            let nextState = JSON.parse(JSON.stringify(comments))

            // No replies array found for this comment. Create it and add new comment.
            if (!nextState[i].replies) {
                nextState[i].replies = [new_comment]
                return [true, nextState]
            }

            // Comment already has replies, add the new comment to them.
            nextState[i].replies = [...nextState[i].replies, new_comment]
            return [ true, nextState ]
        }

        // Not the parent comment, but it does have replies.
        // Check these comments for the parent.
        if ( comments[i].replies && 0 < comments[i].replies.length ) {
            let [updated, updatedComments] = add_comment(comments[i].replies, pid, new_comment)
            if ( updated ) {
                let nextState = JSON.parse(JSON.stringify(comments))
                nextState[i].replies = updatedComments

                return [true, nextState]
            }
        }
    }

    return [ false, comments ]
}

export const delete_comment = (comments, id) => {
    let length = comments.length
    for( let i = 0; i < length; i++){

        // Found comment, remove it.
        if ( id === comments[i].id ) {
            let new_comments = JSON.parse(JSON.stringify(comments))
            new_comments.splice(i, 1);

            return [true, new_comments]
        }

        // Comment has replies, check them for the comment to delete
        if ( comments[i].replies && 0 < comments[i].replies.length ) {
            let [updated, new_replies] = delete_comment(comments[i].replies, id)
            if ( updated ) {
                let new_comments = JSON.parse(JSON.stringify(comments))
                new_comments[i].replies = new_replies

                return [true, new_comments]
            }
        }
    }

    return [false, comments]
}

export const update_comment = (comments, id, content) => {
    let length = comments.length
    for( let i = 0; i < length; i++){

        // Found comment, update it's content.
        if ( id === comments[i].id ) {
            let new_comments = JSON.parse(JSON.stringify(comments))
            new_comments[i].content = content

            return [true, new_comments]
        }

        // Comment has replies, check them for the comment to update
        if ( comments[i].replies && 0 < comments[i].replies.length ) {
            let [updated, new_replies] = update_comment(comments[i].replies, id, content)
            if ( updated ) {
                let new_comments = JSON.parse(JSON.stringify(comments))
                new_comments[i].replies = new_replies

                return [true, new_comments]
            }
        }
    }

    return [false, comments]
}

export const update_score = (comments, id, type) => {
    let length = comments.length
    for( let i = 0; i < length; i++){

        // Found comment, update it's score.
        if ( id === comments[i].id ) {
            let new_score = comments[i].score
            if (actions.SCORE.INCREASE === type) {
                new_score += 1
            }

            if (actions.SCORE.DECREASE === type) {
                new_score -= 1
            }

            let new_comments = JSON.parse(JSON.stringify(comments))
            new_comments[i].score = new_score

            return [true, new_comments]
        }

        // Comment has replies, check them for the comment to update
        if ( comments[i].replies && 0 < comments[i].replies.length ) {
            let [updated, new_replies] = update_score(comments[i].replies, id, type)
            if ( updated ) {
                let new_comments = JSON.parse(JSON.stringify(comments))
                new_comments[i].replies = new_replies

                return [true, new_comments]
            }
        }
    }

    return [false, comments]
}

export const get_highest_id = (comments) => {
    let highest = 0

    for (let i = 0; i < comments.length; i++) {
        let comment = comments[i]

        if ( highest < comment.id ) {
            highest = comment.id
        }

        if ( comment.replies && 0 < comment.replies.length ) {
            let thisHighest = get_highest_id(comment.replies)

            if ( highest < thisHighest ) {
                highest = thisHighest
            }
        }
    }

    return highest
}