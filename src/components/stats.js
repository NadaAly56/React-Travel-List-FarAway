
export function Stats({ items }) {
  if (!items.length) {
    return <footer className="stats">
      <em> Start adding some items to your packing list 🚀</em>
    </footer>;
  }

  const count = items.filter(item => item.packed).length;
  const countPercent = Math.round((count / items.length) * 100);
  return <footer className="stats">
    <em> {countPercent === 100 && 'You got everything! Ready to go ✈'}
      {countPercent < 100 && `🧳 you have ${items.length} items in your list, and you already packed ${count} (${countPercent}%) 💹`}</em>
  </footer>;
}
export default Stats