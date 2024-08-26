export function setupAllToggle(callback) {
    return (new Map([[true, [
        "Collapse",
        "opened"
    ]]]).get(callback()) ?? [
            "Expand",
            "closed"
        ]
    )
}