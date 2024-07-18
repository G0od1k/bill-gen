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
        findLongestLine(poss.map((x) => x.name)).length,
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
                (formatNumber(pos.price) + "×" + pos.count).padEnd(
                    width - formatNumber(pos.price * pos.count).length - 4
                ) +
                formatNumber(pos.price * pos.count) +
                "\n"
        }
        sum += pos.count * pos.price
    })

    text = replaceText(text.replace(/\{bill\}/g, bill.trim()))

    document.querySelector("#text-input").value = text
}
