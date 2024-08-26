const presets = {
    TAG: "tt-model",
    CUSTOM_PROPS: [],
    TYPE: HTMLElement,
}

export default customElements.get(presets.TAG) ?? customElements.define(
    presets.TAG,
    class extends presets.TYPE {
        static get observedAttributes() {
            return []
        }

        constructor () {
            super()
        }

        connectedCallback() {
            console.info("connected", this)
        }

        disconnectedCallback() {
            console.warn("disconnected", this)
        }
    }
)
