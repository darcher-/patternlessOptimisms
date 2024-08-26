export default customElements.define(
    "tt-accordion",
    class extends HTMLElement {
        /** @type {Element[]} */ dropdowns = []

        static get observedAttributes() {
            return [ /** enables features */
                "show-controls",
                "show-inactive"
            ]
        }

        get showControls() {
            return this.hasAttribute(
                "show-controls"
            )
        }
        set showControls(state) {
            this.attributeState(
                "show-controls",
                state
            )
        }

        get showInactive() {
            return this.hasAttribute(
                "show-inactive"
            )
        }
        set showInactive(state) {
            this.attributeState(
                "show-inactive",
                state
            )
        }

        constructor () {
            super()
            this.addEventListener("click",
                this.toggleHandler.bind(
                    this
                )
            )
            this.id = this.getUniqueHash(4)
        }

        /** 
         * accordion mounted
         * @returns {void}
         */
        connectedCallback() {
            const panels = this.querySelectorAll(
                "details"
            ) ?? this.children

            for (const panel of [...panels]) {
                const id = this.getUniqueHash(2)
                this.dropdowns.push({
                    ...panel,
                    id
                })

                const summary = panel.querySelector(
                    "summary"
                )

                summary?.insertAdjacentHTML("beforeend", `<svg
                        aria-label="Toggle caret icon"
                        fill="currentColor"
                        focusable="true"
                        role="img"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 128">
                        <path
                            d="M96 80.3a1 1 0 0 1-.5.2H31.9a1 1 0 0 1-.8-.6 1 1 0 0 1 .2-1L63 47.3a1 1 0 0 1 1.4 0L96 78.9a1 1 0 0 1-.1 1.4Z"
                        />
                    </svg>`
                )
            }
        }

        /**
         * accordion dismounted
         * @returns {void}
         */
        disconnectedCallback() {
            this.removeEventListener("click",
                this.toggleHandler.bind(
                    this
                )
            )
        }

        /**
         * unique hash generator
         * @param {number} [n=3] - segments
         * @param {string[]} [hash=[]] - accumulator
         * @returns {string} hash string
         */
        getUniqueHash(n = 3, hash = []) {
            let i = n + 1
            while (i--) {
                hash.concat(Math
                    .random()
                    .toString(36)
                    .substring(2, 15)
                )
            }
            return hash.join("-")
        }

        /**
         * event handler
         * @param {*} event - Event object
         * @returns {void}
         */
        toggleHandler({ target }) {
            if (target.matches('#toggle-accordion')) {
                this.togglePanels()
            }
            else if (target.matches('summary')) {
                if (!this.showInactive) {
                    this.collapseInactive(
                        target
                    )
                }
            }
        }

        /**
         * close inactive panels
         * @param {HTMLElement} target - summary
         * @returns {void}
         */
        collapseInactive(target) {
            const parent = target.parentElement
            const active = parent?.matches('[open]')
            if (!active) {
                return
            }

            for (const panel of this.dropdowns) {
                if (!panel.hasAttribute("open")) {
                    continue
                }
                panel.removeAttribute(
                    'open'
                )
            }
        }

        /**
         * open/close all panels
         * @return {void}
         */
        togglePanels() {
            const [closed, opened] = this.groupByState()
            this.setOpenState(new Map([
                [false, closed],
                [true, opened]
            ]).get(this.hasOpenState()) ?? [])
        }

        /**
         * toggle panel "open" attribute
         * @param {Element[]} panels - target
         * @returns {void}
         */
        setOpenState(panels) {
            for (const details of panels) {
                this.attributeState("open",
                    details.hasAttribute(
                        "open"
                    )
                )
            }
        }

        /**
         * check for open panel(s)
         * @param {Element[]} [panels=[]] - target
         * @returns {boolean} has open panel(s)
         */
        hasOpenState(panels = []) {
            const details = [
                (panels ?? this.dropdowns)
            ].flat()
            return details.some(
                panel => panel.hasAttribute(
                    'open'
                )
            )
        }

        /**
         * remove/set/toggle attribute
         * @param {string} key
         * @param {boolean} state 
         * @returns {void}
         */
        attributeState(key, state) {
            switch (state) {
                case false: this.removeAttribute(
                    key
                ); break
                case true: this.setAttribute(
                    key,
                    ''
                ); break
                default: this.toggleAttribute(
                    key
                ); break
            }
        }

        /**
         * group opened/closed panels separately
         * @returns {Element[][]} groups
         */
        groupByState() {
            const closed = this.dropdowns.filter(
                panel => !panel.hasAttribute(
                    "open"
                )
            )
            const opened = this.dropdowns.filter(
                panel => panel.hasAttribute(
                    "open"
                )
            )
            return [closed, opened]
        }

        /**
         * define "toggle all" button text
         * @returns {string[]} content
         */
        setupControls() {
            return (new Map([[true, [
                "Collapse",
                "opened"
            ]]]).get(this.hasOpenState()) ?? [
                    "Expand",
                    "closed"
                ]
            )
        }

        /**
         * replace "toggle all" button
         * @returns {void}
         */
        replaceToggle() {
            const button = this.querySelector(
                "#toggle-accordion"
            )
            button?.replaceWith(this.createToggle())
        }

        /**
         * create "toggle all" button
         * @returns {HTMLButtonElement} toggle all
         */
        createToggle() {
            const [text, state] = this.setupControls()
            const toggle = document.createElement('button')
            toggle.title = `${text} all ${state} panels`
            toggle.innerText = `${text} All`
            toggle.id = "toggle-accordion"
            toggle.setAttribute(
                'aria-controls',
                this.id
            )
            return toggle
        }

        /**
         * insert "toggle all" button
         * @param {HTMLButtonElement} button - toggle all
         * @returns {void}
         */
        insertToggle(button) {
            this.insertBefore(
                button,
                this
            )
        }
    }
)

customElements.get("tt-accordion") ?? customElements
    .whenDefined("tt-accordion")
    .then(console.info)
    .catch(console.warn) 