function findLongestLine(array) {
    let maxLength = 0
    let longestLine = ""

    for (let i = 0; i < array.length; i++) {
        if (array[i].length > maxLength) {
            maxLength = array[i].length
            longestLine = array[i]
        }
    }

    return longestLine
}

document.querySelector("#render_h").onclick = () => {
    let text = document.querySelector("#bill_tem_inp").value,
        fixInPrice = document.querySelector("#fixed-point").valueAsNumber
    let poss = []
    let sum = 0

    document.querySelectorAll(".pos").forEach((posEl) => {
        poss.push({
            name: posEl.querySelector(".title").value,
            price: posEl.querySelector(".price").valueAsNumber,
            count: posEl.querySelector(".count").valueAsNumber,
        })
    })

    function replaceText(text) {
        return text
            .replace(/\{sum\}/g, formatNumber(sum))
            .replace(/\{date\}/g, new Intl.DateTimeFormat().format(new Date()))
            .replace(
                /\{time\}/g,
                new Intl.DateTimeFormat(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }).format(new Date())
            )
    }

    const width = Math.max(
        findLongestLine(replaceText(text).split("\n")).length,
        findLongestLine(
            poss.map((x) => x.name + "    " + formatNumber(x.price * x.count))
        ).length,
        findLongestLine(
            poss.map(
                (x) =>
                    "    " +
                    formatNumber(x.price) +
                    "×" +
                    x.count +
                    "    " +
                    formatNumber(x.price * x.count)
            )
        ).length,
        document.querySelector("#min-width").valueAsNumber
    )

    function formatNumber(number, count = false) {
        return number.toFixed(count ? fixInCount : fixInPrice)
    }

    function formatText(text) {
        return replaceText(text)
            .replace(/^\{hr\}(.*)$/gm, (substring, mask) =>
                "".padStart(width, mask || "—")
            )
            .replace(/^\{c\}(.*)$/gm, (substring, target) => {
                return target.padStart(~~((width + target.length) / 2))
            })
            .replace(/^(.*)\{t\}(.*)$/gm, (substring, left, right) => {
                return left + right.padStart(width - left.length)
            })
    }

    let bill = ""

    poss.forEach((pos) => {
        if (pos.count == 1) {
            bill +=
                pos.name +
                formatNumber(pos.price)
                    .toString()
                    .padStart(width - pos.name.length) +
                "\n"
        } else {
            bill +=
                pos.name +
                "\n    " +
                formatNumber(pos.price) +
                "×" +
                pos.count +
                "{t}" +
                formatNumber(pos.price * pos.count) +
                "\n"
        }
        sum += pos.count * pos.price
    })

    text = formatText(text.replace(/\{bill\}/g, bill.trim()))

    document.querySelector("#text-input").rows = text.split("\n").length
    document.querySelector("#text-input").cols = width
    document.querySelector("#text-input").style.width = null
    document.querySelector("#text-input").style.height = null
    document.querySelector("#text-input").value = text
}
