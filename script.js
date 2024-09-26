const loadPosts = async () => {
    try {
        const response = await fetch('./api/posts');
        if (!response.ok) {
            throw new Error(`Error loading posts: ${response.status} ${response.statusText}`);
        }
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error loading posts:', error);
    }
};

const createPostElement = (post) => {
    const postElement = document.createElement('div');
    postElement.className = 'post'; // You can add a class for styling

    const titleElement = document.createElement('h3');
    titleElement.textContent = post.title;

    const contentElement = document.createElement('p');
    contentElement.textContent = post.content;

    const dateElement = document.createElement('small');
    dateElement.textContent = new Date(post.createdAt).toLocaleString();

    postElement.appendChild(titleElement);
    postElement.appendChild(contentElement);
    postElement.appendChild(dateElement);

    return postElement;
};

const displayPosts = (posts) => {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = ''; // Clear existing posts

    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsDiv.appendChild(postElement);
    });
};

document.getElementById('postForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    try {
        const response = await fetch('./api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        if (!response.ok) {
            throw new Error(`Error adding post: ${response.status} ${response.statusText}`);
        }

        const newPost = await response.json();
        const postsDiv = document.getElementById('posts');
        const newPostElement = createPostElement(newPost);
        postsDiv.insertBefore(newPostElement, postsDiv.firstChild);
        document.getElementById('postForm').reset();
    } catch (error) {
        console.error('Error adding post:', error);
    }
});

// Call loadPosts to fetch and display posts on page load
loadPosts();
