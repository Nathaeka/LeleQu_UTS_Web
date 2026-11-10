import React, { useState, useEffect } from 'react';

const RouletteNumber = ({ value = 0, duration = 2000, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const numericString = String(value).replace(/[^0-9]/g, '');
    const target = parseInt(numericString, 10) || 0;

    const getRandomNumber = (num) => {
      const digits = Math.max(1, num.toString().length);
      const min = Math.pow(10, Math.max(0, digits - 1));
      const max = Math.pow(10, digits) - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;

      if (progress < duration) {
        setDisplayValue(getRandomNumber(target));
        requestAnimationFrame(step);
      } else {
        setDisplayValue(target);
      }
    };

    const animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [value, duration]);

  const formattedValue = displayValue.toLocaleString('id-ID');

  return (
    <span className="inline-flex items-baseline gap-1">
      {prefix && <span className="text-sm font-sans font-semibold">{prefix}</span>}
      <span className="font-mono font-bold">{formattedValue}</span>
      {suffix && <span className="text-xs sm:text-sm font-sans font-medium text-[#123F2E]/80">{suffix}</span>}
    </span>
  );
};

export default RouletteNumber;