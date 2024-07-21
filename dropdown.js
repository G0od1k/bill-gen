document.querySelectorAll("h2").forEach((h2, i, all) => {
    h2.addEventListener("click", () => {
        all.forEach((el, j) => {
            if (j == i) return 0
            el.parentElement.classList.remove("a")
            setTimeout(() => {
                el.nextElementSibling.style.display = "none"
            }, 300)
        })
        h2.nextElementSibling.style.display = null
        h2.parentElement.classList.add("a")
    })

    if (i == 0) {
        h2.click()
    }
})
