# Assessment Answers

### 1. What stack and setup did you choose and why?

I chose **React (bootstrapped with Vite)** and standard vanilla CSS. Coming from a background in mobile development and cross-platform UI, React's component-based architecture and state hooks (like `useState` and `useEffect`) allowed me to build this web UI using paradigms I am already highly efficient with. I avoided external component libraries to keep the bundle lightweight and demonstrate core understanding of state and CSS.

### 2. What were your major design and UX decisions?

The biggest challenge of a 7-day grid is making it usable on a 360px mobile screen without squashing the checkboxes.

- **Sticky Horizontal Scrolling:** I wrapped the table in a horizontally scrollable container but applied `position: sticky` to the first column. This ensures the habit names never scroll out of view, maintaining context.
- **Touch Targets:** I explicitly scaled the native HTML checkboxes (`width: 22px; height: 22px;`) to ensure they are easy to tap on mobile devices.
- **Visual Hierarchy:** I added a subtle background highlight to the current day's column (`is-today` class) so users immediately know where to click.

### 3. How did you consider accessibility?

- **Semantic HTML:** Instead of building a grid out of `div`s, I used standard `<table>`, `<thead>`, `<th>`, and `<td>` elements, which screen readers natively understand.
- **Native Inputs:** By relying on the native `<input type="checkbox">` rather than custom SVGs, I retained built-in keyboard navigation and accessibility states.
- **Contrast:** Ensured the red used for the streak fire text and delete buttons passes standard contrast ratios against the white background.

### 4. Did you use AI to build this? If so, how?

Yes, I used an LLM as an interactive pair programmer. I led the component architecture and core logic, and used the AI to help troubleshoot a cascading render issue caused by a `useEffect` dependency trap. I also utilized it to rapidly generate boilerplate CSS for the responsive table layout, which I then manually refined for the sticky-column behavior.

### 5. If you had more time, what would you improve or add?

- **Data Syncing:** Replace `localStorage` with a real backend API (perhaps using something like n8n or a direct database) to allow the user to sync their habits across multiple devices.
- **Reordering:** Implement a drag-and-drop feature so users can sort their habits by priority.
