"use strict"

export function updateAllToggle(selector) {
    return callback => this
        .querySelector(selector)
        ?.replaceWith(callback())
}