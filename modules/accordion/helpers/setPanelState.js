
export function setPanelState(callahead, callback) {
    return collection => collection.foEach(
        callahead("open",
            callback
        )
    )
}