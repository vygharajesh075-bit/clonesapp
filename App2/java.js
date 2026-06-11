// 🧠 Simple tweet engine (localStorage powered)

const input = document.querySelector("input[type='text']");
const postBtn = document.querySelector(".postbtn button");
const postsContainer = document.querySelector(".posts");

// Load saved posts
let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Render posts
function renderPosts() {
    postsContainer.innerHTML = "";

    posts.forEach((post, index) => {
        const div = document.createElement("div");
        div.className = "post border-b border-gray-700 p-4";

        div.innerHTML = `
            <div class="flex gap-3">
                <img src="https://i.pravatar.cc/40?img=${index+1}" class="rounded-full w-10 h-10"/>
                <div class="w-full">
                    <div class="flex justify-between">
                        <span class="font-bold">You</span>
                        <button onclick="deletePost(${index})" class="text-red-500 text-sm">Delete</button>
                    </div>
                    <div class="text-gray-300 my-1">${post.text}</div>
                    <div class="flex gap-4 text-gray-500 text-sm">
                        <span>❤️ ${post.likes}</span>
                        <button onclick="likePost(${index})">Like</button>
                    </div>
                </div>
            </div>
        `;

        postsContainer.appendChild(div);
    });
}

// Add post
postBtn.addEventListener("click", () => {
    if (input.value.trim() === "") return;

    posts.unshift({
        text: input.value,
        likes: 0
    });

    input.value = "";
    savePosts();
    renderPosts();
});

// Like
function likePost(index) {
    posts[index].likes++;
    savePosts();
    renderPosts();
}

// Delete
function deletePost(index) {
    posts.splice(index, 1);
    savePosts();
    renderPosts();
}

// Initial render
renderPosts();