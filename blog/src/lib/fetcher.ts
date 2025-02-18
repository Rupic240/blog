const api = import.meta.env.VITE_API;


// get Token
export const getToken = () => {
    return localStorage.getItem('token');
}


// verify user

export async function fetchVerify() {
    const token = getToken();
    const res = await fetch(`${api}/verify`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (res.ok) {
        return res.json();
    }

    return false;
}


// getPosts

export async function fetchPosts() {
    const token = getToken();
    const res = await fetch(`${api}/content/posts`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    return res.json();
}

// postUser

export type postUserType = {
    name: string,
    username: string,
    bio?: string,
    password: string
}

export async function postUser(data: postUserType) {
    const res = await fetch(`${api}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        return res.json();
    }

    throw new Error('Error: Check Network Log')
}


// postLogin

export type postLoginType = {
    username: string,
    password: string
}

export async function postLogin({ username, password }: postLoginType) {
    const res = await fetch(`${api}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (res.ok) {
        return res.json();
    }

    throw new Error('Incorrect username and password.');
}


// fetch one user

export async function fetchUser(id: number) {
    const token = getToken();
    const res = await fetch(`${api}/users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return res.json();
}


// create post

export async function postPost(content: string) {
    const token = getToken();
    const res = await fetch(`${api}/content/posts`, {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (res.ok) {
        return res.json();
    }

    throw new Error('Error: Check Network Log');
}



// create comment

export type postCommentType = {
    content: string,
    postId: number
}

export async function postComment({ content, postId }: postCommentType) {
    const token = getToken();
    
    const res = await fetch(`${api}/content/comments`, {
        method: "POST",
        body: JSON.stringify({ content, postId }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (res.ok) {
        return res.json();
    }

    throw new Error('Error: Check Network Log')
}

//  postPostLike

export async function postPostLike(id: number) {
    const token = getToken();

    const res = await fetch(`${api}/content/like/posts/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return res.json();
}


export async function postCommentLike(id: number) {
    const token = getToken();

    const res = await fetch(`${api}/content/like/comments/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return res.json();
}

// deletePostLike

export async function deletePostLike(id: number) {
    const token = getToken();

    const res = await fetch(`${api}/content/unlike/posts/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return res.json();
}

// deleteCommentLike

export async function deleteCommentLike(id: number) {
    const token = getToken();

    const res = await fetch(`${api}/content/unlike/comments/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return res.json();
}

// fetchPostLike 

export async function fetchPostLike(id: number) {
    const res = await fetch(`${api}/content/likes/posts/${id}`)
    return res.json();
}

// fetchCommentLike

export async function fetchCommentLike(id: number) {

    const res = await fetch(`${api}/content/likes/comments/${id}`)
    return res.json();
}

// postFollow

export async function postFollow(id: number) {
    const token = getToken();
    const res = await fetch(`${api}/follow/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    return res.json();
}

// deleteFollow

export async function deleteFollow(id: number) {
    const token = getToken();
    const res = await fetch(`${api}/unfollow/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    return res.json();
}

// fetchSearch


export async function fetchSearch(q: string) {
    const res = await fetch(`${api}/search?q=${q}`);
    return res.json();
}


// fetchFollowingPosts

export async function fetchFollowingPosts() {
    const token = getToken();
    const res = await fetch(`${api}/content/following/posts`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    return res.json();
}