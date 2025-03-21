interface FiltersProps {
  onOrderChange: (order: string) => void;
}

const Filters = ({ onOrderChange }: FiltersProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="order-by" className="mr-2 font-semibold">
        Order by:
      </label>
      <select
        id="order-by"
        onChange={(e) => onOrderChange(e.target.value)}
        className="border p-1 rounded"
      >
        <option value="">Default</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="rating-asc">Rating (Low to High)</option>
        <option value="rating-desc">Rating (High to Low)</option>
      </select>
    </div>
  );
};

export default Filters;
