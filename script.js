document.addEventListener('DOMContentLoaded', () => {
    // Debug log to check if script is running
    console.log('Script initialized');

    // Initialize number counters with error checking
    const counters = document.querySelectorAll('.stat-number');
    console.log('Found counters:', counters.length);

    counters.forEach(counter => {
        const value = counter.getAttribute('data-value');
        console.log('Counter value:', value);
        
        if (value) {
            let currentValue = 0;
            const targetValue = parseInt(value);
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = targetValue / steps;
            const stepTime = duration / steps;

            const updateCounter = () => {
                currentValue += increment;
                if (currentValue <= targetValue) {
                    counter.textContent = Math.round(currentValue);
                    setTimeout(updateCounter, stepTime);
                } else {
                    counter.textContent = targetValue;
                }
            };

            updateCounter();
        }
    });

    // Initialize hexagon animations
    const hexagons = document.querySelectorAll('.hexagon-progress path');
    console.log('Found hexagons:', hexagons.length);

    hexagons.forEach(hexagon => {
        const metricItem = hexagon.closest('.metric-item');
        if (metricItem) {
            const valueElement = metricItem.querySelector('.value');
            if (valueElement) {
                const percentage = parseInt(valueElement.textContent);
                const dashOffset = 300 - (percentage / 100 * 300);
                hexagon.style.strokeDasharray = '300';
                hexagon.style.strokeDashoffset = dashOffset;
            }
        }
    });

    // Initialize radar functionality
    const radarBlips = document.querySelectorAll('.radar-blip');
    const detailItems = document.querySelectorAll('.detail-item');
    console.log('Found radar blips:', radarBlips.length);

    radarBlips.forEach((blip, index) => {
        blip.addEventListener('mouseenter', () => {
            detailItems.forEach(item => item.classList.remove('active'));
            if (detailItems[index]) {
                detailItems[index].classList.add('active');
            }
        });
    });

    // Initialize pulse graph if it exists
    const graphCanvas = document.getElementById('viewershipGraph');
    if (graphCanvas) {
        const ctx = graphCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', ''],
                datasets: [{
                    label: 'Viewership',
                    data: [10, 15, 8, 25, 12, 20],
                    borderColor: '#00FC87',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        });
    }

    // Add click event listeners to all expand buttons
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Prevent the click from bubbling up to parent elements
            e.stopPropagation();
            
            // Get the parent improvement item
            const improvementItem = button.closest('.improvement-item');
            
            // Toggle active class on the improvement item
            improvementItem.classList.toggle('active');
            
            // Toggle the button rotation
            if (improvementItem.classList.contains('active')) {
                button.style.transform = 'rotate(45deg)';
            } else {
                button.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Optional: Add click event to the entire item as well
    const improvementItems = document.querySelectorAll('.improvement-item');
    
    improvementItems.forEach(item => {
        item.addEventListener('click', () => {
            const button = item.querySelector('.expand-btn');
            const isActive = item.classList.contains('active');
            
            // Toggle active state
            item.classList.toggle('active');
            
            // Update button rotation
            button.style.transform = isActive ? 'rotate(0deg)' : 'rotate(45deg)';
        });
    });
}); 