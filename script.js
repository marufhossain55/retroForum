const spinnerDiv = document.getElementById('spinner');
const mainDiv = document.getElementById('div-main');
const allPostDiv = document.getElementById('allPost-container');

let count = 1;

const fatchAllPost = async (type, value) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?${type + value}`
  );
  const data = await res.json();
  allPostDiv.textContent = '';
  posts = data.posts;
  const allPostContainer = document.getElementById('allPost-container');
  posts.forEach((post) => {
    const statusImage = post.isActive
      ? 'images/Status_green.png'
      : 'images/Status_red.png';
    // console.log(post);
    const allPostCard = document.createElement('div');
    // allPostCard.classList = `bg-[#F3F3F5] p-10 flex rounded-3xl gap-6`;
    allPostCard.innerHTML = `
      <div id="mainDiv" class="bg-[#F3F3F5] p-10 flex lg:flex-row flex-col rounded-3xl gap-6">
                <div style="position: relative">
                  <img
                  class="rounded-2xl"
                    height="90px"
                    width="90px"
                    src="${post.image}"
                    alt="images"
                    style="display: block"
                  />
                  <img
                    src="${statusImage}"
                    alt="Status_green"
                    style="position: absolute; top: -5px; right: -5px"
                  />
                </div>
                <div>
                  <div class="inline-flex gap-4 font-medium text-sm mb-3 w-[550px]">
                    <p># ${post.category}</p>
                    <p>Author : ${post.author.name}</p>
                  </div>
                  <div class="border-b-4 border-dashed">
                    <h3 class="font-bold text-xl mb-4">
                      ${post.title}
                    </h3>
                    <p class="text-[#12132D99] mb-5">
                     ${post.description}
                    </p>
                  </div>
                  <div class="flex justify-between mt-6 ">
                    <div class="flex space-x-6">
                      <div class="flex gap-2">
                        <img
                          src="images/tabler-icon-message-2.png"
                          alt="message"
                        />
                        <p>${post.comment_count}</p>
                      </div>
                      <div class="flex gap-2">
                        <img src="images/seen.png" alt="total watch" />
                        <p>${post.view_count}</p>
                      </div>
                      <div class="flex gap-2">
                        <img
                          src="images/tabler-icon-clock-hour-9.png"
                          alt="posted time"
                        />
                        <p>${post.posted_time} min</p>
                      </div>
                    </div>
                    <div >
                    <img onclick="bookMark('${post.title}','${post.view_count}')" src="images/email 1.png" alt="" /></div>
                  </div>
                </div>
              </div>
      `;
    allPostContainer.appendChild(allPostCard);
  });
};

const fatchLatestPost = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
  );
  const data = await res.json();
  posts = data;
  //   console.log(posts);
  const latestPost = document.getElementById('latest-post');
  for (const post of posts) {
    console.log(post);
    const latestPostCard = document.createElement('div');
    latestPostCard.innerHTML = `
      <div class="border w-96 flex flex-col p-6 space-y-3 rounded-3xl">
              <img class="rounded-3xl" src=${post.cover_image}" alt="" />
              <div class="flex gap-4">
                <img src="images/calander.png" alt="calander" />
                <p>${
                  post.author.posted_date
                    ? post.author.posted_date
                    : 'No publish date'
                }</p>
              </div>
              <h4 class="font-extrabold text-lg">
                ${post.title}
              </h4>
              <p>
                ${post.description}
              </p>
              <div class="flex gap-2">
                <div class="rounded-full">
                  <img class="h-[44px] w-[44px] rounded-full"  src="${
                    post.profile_image
                  }" alt="author_pic" />
                </div>
                <div>
                  <h5 class="font-bold">${post.author.name}</h5>
                  <p>${post.author.designation || 'unknown'}</p>
                </div>
              </div>
            </div>
      `;
    latestPost.appendChild(latestPostCard);
  }
};
fatchLatestPost();
fatchAllPost();

const bookMark = (title, view) => {
  const bookMark = document.getElementById('book-mark');
  const fevdiv = document.createElement('div');
  fevdiv.innerHTML = `<div class="flex gap-1 bg-white p-4 rounded-2xl mt-4">
  <p class="m-1 font-semibold">
    ${title}
  </p>
  <div class="flex gap-2 justify-center m-4">
    <img src="images/seen.png" alt="watched" />
    <p>${view}</p>
  </div>
</div>`;
  bookMark.appendChild(fevdiv);
  const counts = document.getElementById('counts');
  counts.innerText = count;
  count++;
};

const inputFields = () => {
  const inputField = document.getElementById('input-value');
  const inputValue = inputField.value;
  const type = 'category=';
  fatchAllPost(type, inputValue);
  spinnerDiv.classList.remove('hidden');
  allPostDiv.classList.add('hidden');
  setTimeout(() => {
    spinnerDiv.classList.add('hidden');
    allPostDiv.classList.remove('hidden');
  }, 2000);
};
setTimeout;
/////////////////////////////
