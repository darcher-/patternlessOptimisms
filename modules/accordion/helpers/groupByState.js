"use strict"

// TODO  revisit to properly chunk without interating over origin collection twice
export function groupByState(collection) {
    const closed = collection.filter(
        hasClosedState
    )
    const opened = collection.filter(
        hasOpenState
    )
    return { closed, opened }
}

export function hasOpenState(panel) {
    return panel.hasAttribute(
        "open"
    )
}

export function hasClosedState(panel) {
    return !hasOpenState(
        panel
    )
}