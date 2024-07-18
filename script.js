document.querySelector("#addPos").onclick = () => {
    document
        .querySelector("#poss")
        .appendChild(document.querySelector("#tem-pos").content.cloneNode(true))

    const pageNode = document.querySelector("#poss").lastElementChild

    pageNode.querySelector(".del").onclick = () => {
        document.querySelector("#poss").removeChild(pageNode)
    }
    pageNode.querySelector(".title").select()
}
