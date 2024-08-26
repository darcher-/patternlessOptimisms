// if the accordion instance :is(:defined) use/reuse it, otherwise define it!
// TODO: test whether opting to not use "window" or "globalThis" casues any fragility
//* e.g. (window.customElements || globalThis.customElements || customElements)
export default customElements.get("tt-accordion") ?? customElements.define(
    // this is the element extender component wrapper tagname/namespace
    "tt-accordion",
    // which uses a custom web component element class to extend the native HTMLElement
    class extends HTMLElement {
        /** @type {Element[]} */
        dropdowns = []
        // TODO: setup get/set for any new custom attributes that have functionality attached to them
        static get observedAttributes() {
            // custom attr (that have functionality bound to them)
            return ["show-controls", "show-inactive"] //* observes changes to key and value
        }
        get showControls() {
            // I am using "has" instead of "get" so I can use true/false instead of ""/null
            return this.hasAttribute("show-controls")
        }
        set showControls(state) {
            // they're just boolean attributes at them moment: so just using toggles!
            this.toggleAttribute("show-controls")
        }
        get showInactive() {
            return this.hasAttribute("show-inactive")
        }
        set showInactive(state) {
            //! That said: these may not always be boolean attributes, we may want to encapsulate more edge-cases
            this.toggleAttribute("show-inactive")
        }
        // create instance/contructs of custom accordion element
        constructor () {
            // consume parent contructs from HTMLElement: so we can extend it
            super()
            // bind handler to Enter/Space/Click/Touch events
            this.addEventListener("click",
                // handles any methods defined in handler
                this.toggleHandler.bind(
                    // if the interacted target matches the defined conditions
                    this
                )
            )
        }
        /** 
         * Runs when the accordion is mounted to the DOM
         * @returns {void}
         */
        connectedCallback() {
            // assigns a unique id to accordion element wrapper
            this.id = this.getUniqueHash(4)
            // iterate and extend ONLY direct descendant "details" elements
            // TODO: It would be safer to target "details" explicitly here
            for (const panel of [...this.children]) {
                // set random id reference to each dropdown panel
                panel.id = this.getUniqueHash(2)
                // store dropdown panels for reuse later
                this.dropdowns.push(panel)
            }
            // if "toggle all" attribute (e.g. "show-controls") is provided on accordion
            if (this.showControls) {
                // insert "toggle all" action button above the accordion panels
                this.insertControls() //* this occurs after finding the panels since I used `this.children`
                // TODO: explicitly query "details" instead of this.children at some point
            }
        }
        /**
         * Runs when the accordion is destroyed
         * TODO: we will want to removeEventListeners here to avoid memory leaks
         * @returns {void}
         */
        disconnectedCallback() {
            // remove listeners when disconnected
            this.removeEventListener("click",
                this.toggleHandler.bind(
                    this
                )
            )
            // notify console when the accordion dismounts
            console.warn("disconnected", this)
        }
        /**
         * Creates a random hash for unique identifiers
         * @param {number} [n=3] - number of segments to generate
         * @returns {string} A randomized hyphenated hash string
         */
        getUniqueHash(n = 3) {
            // store hash parts
            let hash = []
            // rerun the hash generator n-times
            for (let i = 0; i <= n; i++) {
                // pass part to hash
                hash.push(Math
                    .random()
                    .toString(36)
                    .substring(2, 15))
            }
            // join each part with a hyphen delimiter
            return hash.join("-")
        }
        /**
         * Handles the accordion "toggle all" event for all panels
         * TODO: refactor to improve type safety coverage
         * @param {*} event - The Mouse/Keyboard/Touch/etc Event object
         * @returns {void}
         */
        toggleHandler({ target }) {
            // if the target is a dropdown toggle summary
            if (!target.matches('summary')) {
                // attempt to collapse inactive dropdowns
                this.collapseInactive(target)
            }
            // if the target is an accordion "toggle all" button
            if (target.matches('#toggle-accordion')) {
                // toggle all open panels to closed (OR vice versa)
                this.toggleAllPanels()
            }
        }
        /**
         * Collapses the inactive accordion panels.
         * @param {HTMLElement} target - The target element.
         * @returns {void}
         */
        collapseInactive(target) {
            // if target parent is NOT open
            const active = target.parentElement?.matches('[open]')
            // or if show-inactive attribute is NOT set
            if (this.showInactive || !active) {
                // avoid even trying to collapse the inactive panels
                // TODO: handle errors more gracefully
                return
            }
            // otherwise find the open panels
            for (const panel of this.dropdowns) {
                if (!panel.hasAttribute("open")) continue
                // and remove the open attribute to collapse them
                panel.removeAttribute('open')
            }
            // get updated text and state for accordion "toggle all" button
            const [text, state] = this.setupControls()
            // attempt to update "toggle all" button text and state
            this.updateControls(text, state)
        }
        /**
         * Toggles all panels in the accordion.
         * @return {void}
         */
        toggleAllPanels() {
            // if the accordion has any open panels
            const hasOpen = this.dropdowns.some(
                panel => panel.hasAttribute(
                    'open'
                )
            )
            // get updated text and state for accordion "toggle all" button
            const [text, state] = this.setupControls()
            // attempt to update "toggle all" button text and state
            this.updateControls(text, state)
            // segment panel elements into collection stores based on open state
            const [closed, opened] = this.groupByState()
            // retrieve panel elements by state
            this.toggleByState(new Map([
                // we prefer the open panel collection
                [false, opened],
                // but fallsback to closed panels so we can open them if everything is closed
                [true, closed]
            ]).get(hasOpen) ?? [])
        }
        /**
         * Toggles the "open" property of the given panels.
         * TODO: improve type safety coverage over panels
         * @param {*[]} panels - The panels to toggle.
         * @returns {void}
         */
        toggleByState(panels) {
            // verify there are panels in the DOM
            if (!panels.length) {
                // if not, do not proceed
                // TODO: encapsulate errors
                return
            }
            // loop over all the panel descendants
            for (const panel of panels) {
                // when the panel is open
                if (panel.hasAttribute('open')) {
                    // toggle the open state (e.g. close it)
                    panel.toggleAttribute(
                        'open'
                    )
                }
            }
        }
        /**
         * Groups the dropdowns based on their state.
         * @returns {(Element|void)[][]} A dataset with two groups: 
         *   - the first array contains all closed dropdowns
         *   - the second has all the opened dropdown panels
         */
        groupByState() {
            // ensure the dropdown store is not empty
            if (!this.dropdowns?.length) {
                // if not, return the expected type signature
                return [[], []]
            }
            // segment panels by opened/closed states
            return [this.dropdowns.filter(
                // store opened panels together
                panel => panel.hasAttribute("open")
            ), this.dropdowns.filter(
                // and store closed panels together
                panel => !panel.hasAttribute("open")
            )]
        }
        /**
         * Sets up the "toggle all" controls/button/action for the accordion.
         * @returns {string[]} An array with CTA text and state of panels
         */
        setupControls() {
            // defines the static open/close button text and panel state values
            const closed = ["Expand", "closed"]
            const opened = ["Collapse", "opened"]
            // check for any panels that are NOT open in the accordion instance
            const hasOpen = this.dropdowns?.some(
                panel => panel.hasAttribute(
                    'open'
                )
            )
            // send the necessary content to our "toggle all" button; based on accordion state
            this.controlText = new Map([
                // if even one panel is open, we need to close it (any all open panels)
                [true, opened],
                // if no panels are open, we need to open them... all of them
                [false, closed]
                //* despite knowing this will 100% work, it needs the fallback to avoid IDE warnings
            ]).get(hasOpen) ?? closed
            // return the text and state for use in other methods
            return this.controlText
        }
        /**
         * Updates the "toggle all" button controls for the accordion.
         * @param {string} text - the text content of the accordion controls
         * @param {string} state - the opened/closed state of the accordion panels
         * @returns {void}
         */
        updateControls(text, state) {
            // update values on the "toggle all" button
            // TODO: may create two buttons and .replaceWith based on state
            const control = this.querySelector("#toggle-accordion")
            control?.setAttribute("title", `${text} all ${state} panels`)
            control?.setAttribute("innerText", `${text} All`)
            // update accordion when "toggle all" button is pressed
            this.setAttribute(
                // TODO: revisit; there is a better way to provide inclusivity for this use-case
                'aria-expanded',
                // if open, it IS expanded, otherwise it is NOT expanded
                `${state === 'opened'}`
            )
        }
        /**
         * Inserts the accordion "toggle all" button controls into the DOM.
         * @returns {void}
         */
        insertControls() {
            // get text and opened/closed panel state text
            const [text, state] = this.setupControls()
            // update state and text of the "toggle all" button
            this.updateControls(text, state)
            // creates an html-like string of our "toggle all" button with expected initial values
            // TODO: ariaControls may need to include each panel id too
            const control = `<button
                aria-controls="${this.id}"
                id="toggle-accordion"
                title="${text} all ${state} panels">
                ${text} All
            </button>`
            // send that element to the DOM; you know, so we can use it!
            this.insertAdjacentHTML('afterbegin', control)
        }
    }
)

// when we cannot find the accordion, log the defining process to the console
if (!customElements.get("tt-accordion")) customElements
    .whenDefined("tt-accordion") // only when defined
    .then(console.info) // log success
    .catch(console.warn) // log failure