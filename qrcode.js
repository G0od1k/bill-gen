document.querySelector("#qr-form").addEventListener("submit", function (e) {
    const payment = {
        iban: document.querySelector("#payment-iban").value,
        am: document.querySelector("#payment-am").valueAsNumber.toFixed(2),
        cur: document.querySelector("#payment-cur").value.toUpperCase(),
        msg: document.querySelector("#payment-msg").value,
        name: document.querySelector("#payment-name").value,
        var: document.querySelector("#payment-var").value,
    }

    e.preventDefault()

    new QRious({
        element: document.querySelector("#qr"),
        value: `SPD*1.0*ACC:${payment.iban}*AM:${payment.am}*CC:${payment.cur}*MSG:${payment.msg}*RN:${payment.name}*X-VS:${payment.var}*`,
        size: 300,
    })

    addImage(document.querySelector("#qr").src, "qr")
})
