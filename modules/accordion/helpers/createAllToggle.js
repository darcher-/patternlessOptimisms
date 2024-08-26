export function createAllToggle(callback) {
    const [text, state] = callback()
    const toggle = document.createElement('button')
    toggle.title = `${text} all ${state} panels`
    toggle.innerText = `${text} All`
    toggle.id = "toggle-accordion"
    toggle.setAttribute(
        'aria-controls',
        this.id
    )
    return toggle
}