import { useState, useEffect } from "react";

export default function StatCounter({ target, label, duration }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 10);
    const counterInterval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(counterInterval);
      } else {
        setCount(Math.floor(start));
      }
    }, 10);

    return () => clearInterval(counterInterval);
  }, [target, duration]);

  return (
    <div>
      <div className="text-4xl font-bold text-white">{count}+</div>
      <div className="text-xl text-white">{label}</div>
    </div>
  );
}
