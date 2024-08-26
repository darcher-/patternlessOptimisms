export function panelExpanded(callback) {
    return list => [...list].some(
        callback
    )
}