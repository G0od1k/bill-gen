function addImage(data, id = "") {
    document
        .querySelector("#imgList")
        .appendChild(document.querySelector("#tem-img").content.cloneNode(true))

    const pageNode = document.querySelector("#imgList").lastElementChild

    pageNode.querySelector(".del").onclick = () => {
        document.querySelector("#imgList").removeChild(pageNode)
    }
    pageNode.querySelector("img").src = data
    pageNode.querySelector(".imgId").value = id
}

document.querySelector("#imgFileInput").addEventListener("change", (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
        addImage(e.target.result)
    }

    reader.readAsDataURL(file)
})
