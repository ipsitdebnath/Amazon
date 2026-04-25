import { useState, useEffect } from 'react';

/**
 * Deterministically calculates a future expiration time for a deal based on the product ID.
 * Returns null if the product does not have a significant discount.
 */
export const getDealExpiration = (productId, discountPercentage) => {
  if (!discountPercentage || discountPercentage <= 0) return null;
  
  // Deterministic fake expiration: today's date + some hours based on ID
  // This will always evaluate to the same relative time during the same day.
  const now = new Date();
  
  // Use product ID to generate an expiration between 1 and 24 hours from midnight today
  const hoursToAdd = (productId % 23) + 1; 
  const minutesToAdd = (productId * 13) % 60;
  
  const expirationDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  expirationDate.setHours(hoursToAdd, minutesToAdd, 0, 0);
  
  // If the generated time has already passed today, set it to tomorrow
  if (expirationDate.getTime() <= now.getTime()) {
    expirationDate.setDate(expirationDate.getDate() + 1);
  }
  
  return expirationDate.getTime();
};

/**
 * Custom hook to manage the countdown timer.
 */
export const useCountdown = (expiresAt) => {
  const [timeLeft, setTimeLeft] = useState(expiresAt ? expiresAt - Date.now() : 0);

  useEffect(() => {
    if (!expiresAt) return;

    const intervalId = setInterval(() => {
      const remaining = expiresAt - Date.now();
      if (remaining <= 0) {
        clearInterval(intervalId);
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiresAt]);

  const isExpired = timeLeft <= 0;

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return { isExpired, formattedTime, timeLeft };
};
