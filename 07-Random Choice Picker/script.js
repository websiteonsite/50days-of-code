const tagsEl = document.getElementById("tags");
const textarea = document.getElementById("textarea");

textarea.focus();

textarea.addEventListener("keyup", (e) => {
  createTags(e.target.value);

  if (e.key === "Enter") {
    setTimeout(() => {
      e.target.value = "";
    }, 10);

    randomSelect();
  }
});

function createTags(input) {
  const tags = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());

  // Clear existing tags before creating new ones
  tagsEl.innerHTML = "";

  tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.classList.add("tag");
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
}

function randomSelect() {
  const times = 30;
  let count = 0;

  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    if (randomTag) {
      highlightTag(randomTag);

      setTimeout(() => {
        unHighlightTag(randomTag);
      }, 100);
    }

    count++;

    if (count === times) {
      clearInterval(interval);

      setTimeout(() => {
        const finalTag = pickRandomTag();
        highlightTag(finalTag);
      }, 100);
    }
  }, 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");

  if (tags.length > 0) {
    return tags[Math.floor(Math.random() * tags.length)];
  }

  return null;
}

function highlightTag(tag) {
  tag.classList.add("highlight");
}

function unHighlightTag(tag) {
  tag.classList.remove("highlight");
}
