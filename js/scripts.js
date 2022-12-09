const url = "https://jsonplaceholder.typicode.com/posts";

const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");

// get id from URL
const urlSearchParams = new URLSearchParams(window.location.search);
const postID = urlSearchParams.get("id");

// get all posts
async function getAllPosts() {
    const response = await fetch(url);

    const data = await response.json();
    loadingElement.classList.add("hide");

    await data.map((post) => {
        // criar os elementos no html
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");

        // preecher com o conteudo
        title.innerText = post.title;
        body.innerText = post.body;
        link.innerText = "Saiba Mais";
        link.setAttribute("href", `/post.html?id=${post.id}`);

        // colocar tudo na div
        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link);

        // colocar no container  
        postsContainer.appendChild(div);

    });
};

// page do post individual
const postPage = document.querySelector("#post");
const postContainer = document.querySelector("#post-container");
const commentsContainer = document.querySelector("#comments-container");

// get individual post function
async function getPost(id) {
    const [responsePost, responseCommets] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`),
    ]);

    //extraindo os dados 
    const dataPost = await responsePost.json();
    const dataComments = await responseCommets.json()

    // tirando o loading do HTML
    loadingElement.classList.add("hide");
    postPage.classList.remove("hide");


    // creando o elemento no html para receber o titulo e o corpo
    const title = document.createElement("h1");
    const body = document.createElement("p");

    // recebendo o texto
    title.innerText = dataPost.title;
    body.innerText = dataPost.body;

    // add no container
    postContainer.appendChild(title);
    postContainer.appendChild(body);

    // trazer os comentarios
    await dataComments.map((comment) => {
        createComment(comment);
    });
};

// funcao de criar os comentarios
function createComment(comment) {
    // criacao de elementos
    const div = document.createElement("div");
    const email = document.createElement("h3");
    const commentBody = document.createElement("p");

    // recebendo os textos
    email.innerText = comment.email;
    commentBody.innerText = comment.body;

    // add na div criada.
    div.appendChild(email);
    div.appendChild(commentBody);

    //add no container do HTML
    commentsContainer.appendChild(div);
};


// pagina dos comentarios
const commentForm = document.querySelector("#comment-form");
const emailInput = document.querySelector("#email");
const bodyInput = document.querySelector("#body");

!postID 

? getAllPosts() 

: getPost(postID), commentForm.addEventListener("submit", (e)=>{
    // travar o html
   e.preventDefault(); 

   // pegar os dados
   let comment = {
    email: emailInput.value,
    body: bodyInput.value,  
   };

   // passar par JSON
   comment = JSON.stringify(comment);

   // passar para a funcao 
   postComment(comment);
});

// funcao post a comment
async function postComment(comment) {
    // console.log("ola mundo");
    // POST, PUT, PATCH, DELETE - headers, bory (para configurar as requisições)
    const response = await fetch(`${url}/${postID}/comments`, {
        method: "POST",
        body: comment,
        headers: {
            "Content-type": "application/json",
        },
    });

    const data = await response.json();
    createComment(data)
}






