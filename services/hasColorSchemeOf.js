"use strict"

const configuration = {
    MODE: "dark",
}

export function hasColorModeOf({ MODE } = configuration) {
    const scheme = `(prefers-color-scheme: ${MODE})`
    return (globalThis ?? window)
        .matchMedia(scheme)
        .matches
}

/** 
 * TODO: finish implementing a simple test suite for hasColorModeOf
 *
    testEntireSuiteAgainstCases([
        "light dark",
        "dark light",
        "dark", null,
        "light", "",
    ], { successful: true, run: false })

    function testEntireSuiteAgainstCases(...args) {
        const [TEST_CASE_INPUTS, TEST_SUITE_RESULTS] = args
        if (!TEST_SUITE_RESULTS.run) {
            return "Enable \"run\""
        }

        function* expectedTestSuiteCasesGenerator() {
            for (const input of TEST_CASE_INPUTS) {
                const output = hasColorModeOf({
                    MODE: `${input}`
                })
                yield { output, input }
            }
        }

        const GENERATOR = expectedTestSuiteCasesGenerator()
        for (const { output, input } of GENERATOR) {
            TEST_SUITE_RESULTS[input] = {
                passed: output,
                mode: input
            }

            if (output) continue
            TEST_SUITE_RESULTS.passed = false
        }

        console.table(TEST_SUITE_RESULTS)
    }
 */