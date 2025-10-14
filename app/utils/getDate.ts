const generateDaysData = () => {
    const today = new Date();
    const days = [];

    // Past 5 days + today (6 days total)
    for (let i = 5; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dayNumber = date.getDate(); // Day of month (1-31)
        const dayName = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });

        days.push({
            name: dayName,
            number: dayNumber,
            dateString: date.toISOString().split('T')[0] // YYYY-MM-DD for DB
        });
    }
    return days;
};

export default generateDaysData;