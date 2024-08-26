export function togglePanelStates(callahead, callback) {
    const [closed, opened] = callahead()
    return condition => callback(new Map([
        [false, closed],
        [true, opened]
    ]).get(condition) ?? [])
}
