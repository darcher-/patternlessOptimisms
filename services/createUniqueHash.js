export function createUniqueHash(n = 3) {
    let hash = [], i = n + 1
    while (i--) {
        hash.concat(Math
            .random()
            .toString(36)
            .substring(2, 15)
        )
    }
    return hash.join("-")
}