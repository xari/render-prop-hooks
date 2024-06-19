# Components that render library components should be as minimalist as possible.

- Borrow prop typing from the library component.

# Priorities....?

- Accessibility!
- Stability
- Maintainability(?)

# Why these patterns are important

- Development becomes increasingly about framework/libary integration (glueing other developers bullshit together). In light of this, maintenance of the codebase will be easier if we learn how to integrate in a way that prioritizes simplicity....(?)

What is simplicity?

- Less CSS (but still actual CSS, instead of Tailwind, etc.)
- Smaller components that are targeted in their scope.
  - What's a targeted component?
- Smaller functions
  - Easier to test (if testing is a requirement)

## StyledTableWithRowSelectionAndInlineButtons

As we increase the complexity of the combinations, we'll need to use a few techniques to avoid the need for messy CSS and the risk of inaccessible markup.

### Render-props for inline rendering.

Rather than having `WithRowSelection` render the button itself, what if we modify WithRowSelection to return the button (so that the parent component can have full control over where it gets rendered).

Why does this matter?

Less complex CSS. No more need for absolute postitioning.

# Hooks vs. Render Props

- Visibility
  - Using a hook
