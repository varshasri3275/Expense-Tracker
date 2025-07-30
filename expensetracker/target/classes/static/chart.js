const expenses = [];
let hourlyChart, categoryChart;

function formatHour(hour) {
    const suffix = hour >= 12 ? "PM" : "AM";
    const formatted = hour % 12 === 0 ? 12 : hour % 12;
    return `${formatted} ${suffix}`;
}

function initCharts() {
    const ctx1 = document.getElementById('hourlyChart').getContext('2d');
    hourlyChart = new Chart(ctx1, {
        type: 'bar',
        data: { labels: [], datasets: [{ label: 'Hourly Expenses (₹)', data: [], backgroundColor: '#4CAF50' }] },
        options: { plugins: { title: { display: true, text: 'Expenses by Hour' } } }
    });

    const ctx2 = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                label: 'Expenses by Category',
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#E91E63', '#FF9800', '#9C27B0']
            }]
        },
        options: { plugins: { title: { display: true, text: 'Expenses by Category' } } }
    });
}

function updateCharts() {
    const hourlyTotals = {}, categoryTotals = {};
    expenses.forEach(expense => {
        const hour = new Date(expense.timestamp).getHours();
        const hourLabel = formatHour(hour);
        hourlyTotals[hourLabel] = (hourlyTotals[hourLabel] || 0) + expense.amount;

        const category = expense.category;
        categoryTotals[category] = (categoryTotals[category] || 0) + expense.amount;
    });

    hourlyChart.data.labels = Object.keys(hourlyTotals);
    hourlyChart.data.datasets[0].data = Object.values(hourlyTotals);
    hourlyChart.update();

    categoryChart.data.labels = Object.keys(categoryTotals);
    categoryChart.data.datasets[0].data = Object.values(categoryTotals);
    categoryChart.update();
}
