export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);

    return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (targetAmount, donatedAmount) => {
    const percentage = Math.round((donatedAmount * 100) / targetAmount);

    return percentage;
};

