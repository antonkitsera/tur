import React from 'react'

export default function AddingComment({handleChangeComment, handleSubmit, comment}) {
    return (
        <form onSubmit={handleSubmit} className={'addingCommentForm'}>
            <span className={'title'}>Додати коментар</span>
            <textarea cols="30" rows="10"
                      value={comment}
                      onChange={handleChangeComment}/>
            <button>Опублікуват</button>
        </form>
    )
}
