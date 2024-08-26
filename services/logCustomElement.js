"use strict"

export function printCustomElement() {
    return customTagName => customElements
        .whenDefined(customTagName)
        .catch(console.error)
}