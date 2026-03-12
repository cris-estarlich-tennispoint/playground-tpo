export type SortOption = "default" | "az" | "za" | "price-asc" | "price-desc"

interface SortSelectorProps {
    value: SortOption
    onChange: (value: SortOption) => void
}

export default function SortSelector(props: SortSelectorProps) {
    return (
        <select
            value={props.value}
            onChange={e => props.onChange(e.target.value as SortOption)}
            className="bg-shop-card border border-shop-border text-shop-text text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-shop-accent"
        >
            <option value="default">Default</option>
            <option value="az">Name: A → Z</option>
            <option value="za">Name: Z → A</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
        </select>
    )
}
