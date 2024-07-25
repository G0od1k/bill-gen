let cnv = document.querySelector("canvas")
let ctx = cnv.getContext("2d")

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

function generateImage() {
    const lineHeight = document.querySelector("#line-height").valueAsNumber,
        lineSpace = document.querySelector("#line-space").valueAsNumber,
        padding = document.querySelector("#padding").valueAsNumber

    const imgRegex = /^\{img\}(.*):(.+)$/gm

    let text = document.getElementById("text-input").value

    function loadFont() {
        ctx.fillStyle = "black"
        ctx.font = lineHeight + "px monospace"
    }

    loadFont()

    cnv.width =
        ctx.measureText(findLongestLine(text.split("\n"))).width + padding * 2

    loadFont()

    function unitsToPixels(units) {
        return units.slice(-1) == "%"
            ? ((cnv.width - 2 * padding) * units.slice(0, -1)) / 100
            : units.slice(-2) == "ch"
            ? ctx.measureText("0".repeat(parseFloat(units.slice(0, -2)))).width
            : parseInt(units)
    }

    let images = {}

    document.querySelectorAll(".img").forEach((imgNode) => {
        images[imgNode.querySelector(".imgId").value] =
            imgNode.querySelector("img")
    })

    let totalImagesHeight = 0

    text.replace(imgRegex, (substring, id, size) => {
        totalImagesHeight +=
            (unitsToPixels(size) / images[id].naturalWidth) *
                images[id].naturalHeight -
            lineHeight
    })

    loadFont()

    cnv.height =
        (lineHeight + lineSpace) * text.split("\n").length +
        padding * 2 -
        lineSpace +
        totalImagesHeight

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    loadFont()

    let lines = text.split("\n")
    let y = lineHeight + padding
    lines.forEach(function (line) {
        if (line.match(imgRegex)) {
            let [id, size] = line.slice(5).split(":")
            let img = images[id],
                width = unitsToPixels(size),
                height = (width / img.naturalWidth) * img.naturalHeight

            ctx.drawImage(
                img,
                padding + (cnv.width - 2 * padding - width) / 2,
                y - lineHeight,
                width,
                height
            )
            y += height + lineSpace
            return false
        }
        ctx.fillText(line, padding, y)
        y += lineHeight + lineSpace
    })

    let dataURL = cnv.toDataURL()
    let outputImage = document.getElementById("output-image")
    outputImage.src = dataURL
    outputImage.style.display = "block"
}

function downloadImage() {
    downloadFromDataURL(document.getElementById("output-image").src, "bill.png")
}

function downloadFromDataURL(dataURL, filename) {
    var anchor = document.createElement("a")
    anchor.href = dataURL
    anchor.download = filename

    document.body.appendChild(anchor)
    anchor.click()

    document.body.removeChild(anchor)
}
