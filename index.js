window.addEventListener("DOMContentLoaded", () => { // опционально, но в общем случае бывает нужным прописать
    (async function () {
        try {
            const requestPosts = await fetch('http://jsonplaceholder.typicode.com/posts');
            const requestUsers = await fetch('http://jsonplaceholder.typicode.com/users');
            const jsonPosts = await requestPosts.json();
            const jsonUsers = await requestUsers.json();

            const formattedUsers = jsonUsers.map(user => {
                user.website = 'https://' + user.website;
                user.address = user.address.city.concat(", ", user.address.street).concat(", ", user.address.suite);
                user.company = user.company.name;
                user.posts = jsonPosts.filter(post => {
                    post.title_crop = post.title.slice(0, 20).concat('...');

                    return post.userId === user.id;
                });

                if (user.name === 'Ervin Howell') {
                    user.posts.forEach(post => {
                        const getComments = async () => {
                            const comments = await fetch(`http://jsonplaceholder.typicode.com/posts/${post.id}/comments`)

                            post.comments = await comments.json();
                        }

                        getComments();
                    })
                }

                return user;
            })

            console.log(formattedUsers)
        } catch (e) {
            console.error(e.message)
        }
    })()
})