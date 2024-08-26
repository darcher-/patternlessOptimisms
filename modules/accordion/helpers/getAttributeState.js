export function getAttributeState(key, state) {
    switch (state) {
        case false: this.removeAttribute(
            key
        ); break
        case true: this.setAttribute(
            key,
            ''
        ); break
        default: this.toggleAttribute(
            key
        ); break
    }
}