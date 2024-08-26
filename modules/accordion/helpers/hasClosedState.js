
export function hasClosedState(callback) {
    return panel => !callback(
        panel
    )
}