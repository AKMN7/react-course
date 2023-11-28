export default function Footer({ items }) {
    const totalItems = items.length;
    const totalPacked = items.filter((item) => item.packed).length;
    const percentage = Math.ceil((totalPacked * 100) / totalItems);
    return <footer className="stats">{percentage === 100 ? "You are ready to take off! ✈️" : `You have ${totalItems} items on your list, you already packed ${totalPacked} (${percentage}%).`}</footer>;
}
