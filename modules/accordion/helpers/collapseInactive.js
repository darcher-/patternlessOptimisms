export function collapseInactive(dataset = [], callback) {
    return ({ target }) => {
        const parent = target.parentElement
        const active = parent?.matches(
            '[open]'
        )
        active && dataset.forEach(
            callback
        )
    }
}