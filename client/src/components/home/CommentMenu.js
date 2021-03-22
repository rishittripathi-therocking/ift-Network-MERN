import React from 'react';

const CommentMenu = ({post, comment,auth, setOnEdit}) => {
    const MenuItem = () => {
        return(
            <React.Fragment>
                <div className="dropdown-item" onClick={()=>setOnEdit(true)}>
                    <span className="material-icons" >
                        create
                    </span> Edit
                </div>
                <div className="dropdown-item">
                    <span className="material-icons">
                        delete_outline
                    </span> Remove
                </div>
            </React.Fragment>
            
        ) 
    }
    return (
        <div className="menu">
            {
                (post.user._id === auth.user._id || comment.user._id ===auth.user._id) && 
                <div className="nav-item dropdown">
                    <span style={{cursor: 'pointer'}} className="material-icons align-items-center" id="moreLink" data-toggle="dropdown">
                        more_vert
                    </span>
                    <div className="dropdown-menu" aria-labelledby="morelink">
                        {
                            (post.user._id === auth.user._id )
                                ? (comment.user._id === auth.user._id )
                                    ? MenuItem()
                                        :<div className="dropdown-item">
                                            <span className="material-icons" >
                                                delete_outline
                                            </span> Remove
                                        </div>
                                            :comment.user._id === auth.user._id && MenuItem()
                        }
                    </div>
                </div> 
            }
        </div>
    )
}

export default CommentMenu;