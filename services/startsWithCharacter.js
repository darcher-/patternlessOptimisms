"use strict"

function startsWithCharacter(key) {
    return character => key.startsWith(
        character
    )
}

function startsWithCharacters(symbol) {
    return characters => characters.some(
        startsWithCharacter(
            symbol
        )
    )
}