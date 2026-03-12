---
name: add-component
description: Scaffold a new React component in apps/web/src/components/
argument-hint: "<ComponentName>"
---

Scaffold a new React component named `$ARGUMENTS` in `apps/web/src/components/`.

## Steps
1. Create `apps/web/src/components/$ARGUMENTS.tsx` with:
   - A typed `Props` interface at the top
   - A default-exported functional component
   - Tailwind utility classes for layout (no inline styles)
2. If the component needs local state or side effects, create a matching hook at `apps/web/src/hooks/use$ARGUMENTS.ts`.
3. Avoid as much as possible the logic inside the component


## Template
```tsx
interface Props {
  // define props here
}

export default function $ARGUMENTS({ }: Props) {
  return (
    <div>
      {/* content */}
    </div>
  )
}
```
