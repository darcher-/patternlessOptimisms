export function toggleHandler(callahead, callback, state) {
    return ({ target }) => {
        if (target.matches('#toggle-accordion')) {
            callahead()
        }
        else if (target.matches('summary')) {
            !state && callback(
                target
            )
        }
    }
}