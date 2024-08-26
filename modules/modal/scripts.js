window.addEventListener('click', logEventAction, false)

function logEventAction(event) {
    const { target } = event
    const check = ["#dialog-open", "#dialog-close"]
        .map(x => target.matches(x))
        .includes(true)

    if (check) {
        // TODO aria-controls can have multiple id'; account for it.
        const modalIdRef = target.getAttribute("aria-controls")
        const modalDialog = document.querySelector(`#${modalIdRef}`)
        const modalOpenState = modalDialog?.hasAttribute('open')

        console.log({
            target,
            modalIdRef,
            modalDialog,
            modalOpenState
        })

        if (!modalOpenState) {
            modalDialog?.setAttribute('open', "")
        }

        else {
            modalDialog?.removeAttribute('open')
        }
    }
}