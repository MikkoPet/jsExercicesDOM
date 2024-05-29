function createArticle(post) {
    const article = document.createElement('article');

    article.append(createElementTextFilled('h2', post.title));
    article.append(createElementTextFilled('p', post.body));

    return article;
}

function createElementTextFilled (type, content) {
    const element = document.createElement(type);
    element.innerText = content;
    return element;
}

async function fetchArticles() {
    const wrapper = document.querySelector('#lastPosts');
    const loader = document.createElement('p');
    loader.innerText = 'Chargement...';
    wrapper.append(loader);

    try {
        const r = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
            headers: {
                "Accept": "application/json",
            },
        })
        if (!r.ok) {
            throw new Error('err no connection to server');
        }

        const posts = await r.json();
         loader.remove();

        for (let post of posts) {
            wrapper.append(createArticle(post));
        }
        

    } catch (e) {
        loader.innerText = "impossible de charger les articles";
        loader.style.color = 'red';
        return;
    }
}

fetchArticles();