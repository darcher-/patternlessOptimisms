"use strict"

// TODO  revisit to properly chunk without interating over origin collection twice
export function groupByState(callahead, callback) {
    return collection => {
        const closed = collection.filter(
            callahead
        )
        const opened = collection.filter(
            callback
        )
        return { closed, opened }
    }
}

