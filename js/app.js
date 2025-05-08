
const challenges = [
    {
        id: 1,
        title: "Two Sum Problem",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        difficulty: "Easy",
        category: "DSA",
        points: 100,
        solves: 5234,
        completionRate: "87%",
        isSolved: false,
        isBookmarked: true
    },
    {
        id: 2,
        title: "Palindrome Linked List",
        description: "Given the head of a singly linked list, determine if the linked list is a palindrome or not.",
        difficulty: "Medium",
        category: "DSA",
        points: 250,
        solves: 3721,
        completionRate: "62%",
        isSolved: true,
        isBookmarked: false
    },
    {
        id: 3,
        title: "Binary Tree Maximum Path Sum",
        description: "Find the maximum path sum in a binary tree.",
        difficulty: "Hard",
        category: "DSA",
        points: 450,
        solves: 1874,
        completionRate: "41%",
        isSolved: false,
        isBookmarked: false
    },
    {
        id: 4,
        title: "Valid Parentheses",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        difficulty: "Easy",
        category: "DSA",
        points: 120,
        solves: 6543,
        completionRate: "91%",
        isSolved: true,
        isBookmarked: true
    },
    {
        id: 5,
        title: "LRU Cache Implementation",
        description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
        difficulty: "Medium",
        category: "DSA",
        points: 300,
        solves: 2945,
        completionRate: "54%",
        isSolved: false,
        isBookmarked: false
    },
    {
        id: 6,
        title: "Responsive Landing Page",
        description: "Create a fully responsive landing page with modern design principles.",
        difficulty: "Medium",
        category: "Webdevlopment",
        points: 280,
        solves: 3156,
        completionRate: "76%",
        isSolved: false,
        isBookmarked: true
    },
    {
        id: 7,
        title: "CSS Animation Challenge",
        description: "Create advanced CSS animations for an interactive user interface.",
        difficulty: "Medium",
        category: "Webdevlopment",
        points: 260,
        solves: 2874,
        completionRate: "68%",
        isSolved: false,
        isBookmarked: false
    },
    {
        id: 8,
        title: "SQL Query Optimization",
        description: "Optimize complex SQL queries for better database performance.",
        difficulty: "Hard",
        category: "DBMS",
        points: 420,
        solves: 1542,
        completionRate: "47%",
        isSolved: false,
        isBookmarked: false
    },
    {
        id: 9,
        title: "Cross-Site Scripting Prevention",
        description: "Identify and fix XSS vulnerabilities in a web application.",
        difficulty: "Medium",
        category: "BugHunting",
        points: 350,
        solves: 2134,
        completionRate: "59%",
        isSolved: false,
        isBookmarked: false,
        isAssigned: true
    }
];

const challengeGrid = document.querySelector('.challenge-grid');
const searchInput = document.querySelector('.search-input');
const hideSolvedCheckbox = document.getElementById('hide-solved');
const showBookmarkedCheckbox = document.getElementById('show-bookmarked');
const showAssignedCheckbox = document.getElementById('show-assigned');
const difficultyItems = document.querySelectorAll('.difficulty-item');
const categoryItems = document.querySelectorAll('.category-item');

let filters = {
    search: '',
    hideSolved: false,
    showBookmarked: false,
    showAssigned: false,
    difficulty: 'All Difficulties',
    category: 'All Categories'
};

// Initialize page
function init() {
    renderChallenges();
    setupEventListeners();
}

// Render challenges based on current filters
function renderChallenges() {
    // Clear existing challenges
    challengeGrid.innerHTML = '';
    
    // Apply filters
    const filteredChallenges = challenges.filter(challenge => {
        // Search filter
        if (filters.search && !challenge.title.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }
        
        // Hide solved filter
        if (filters.hideSolved && challenge.isSolved) {
            return false;
        }
        
        // Show only bookmarked filter
        if (filters.showBookmarked && !challenge.isBookmarked) {
            return false;
        }
        
        // Show only assigned filter
        if (filters.showAssigned && !challenge.isAssigned) {
            return false;
        }
        
        // Difficulty filter
        if (filters.difficulty !== 'All Difficulties' && challenge.difficulty !== filters.difficulty) {
            return false;
        }
        
        // Category filter
        if (filters.category !== 'All Categories' && challenge.category !== filters.category) {
            return false;
        }
        
        return true;
    });
    
    // Create challenge cards
    filteredChallenges.forEach(challenge => {
        const challengeCard = document.createElement('div');
        challengeCard.className = 'challenge-card';
        
        // Add additional classes if needed
        if (challenge.isSolved) challengeCard.classList.add('solved');
        if (challenge.isBookmarked) challengeCard.classList.add('bookmarked');
        if (challenge.isAssigned) challengeCard.classList.add('assigned');
        
        // Set difficulty class for styling
        const difficultyClass = challenge.difficulty.toLowerCase();
        
        // Create card content
        challengeCard.innerHTML = `
            <div class="challenge-header">
                <div class="challenge-category">${challenge.category}</div>
                <div class="difficulty-badge ${difficultyClass}">${challenge.difficulty}</div>
            </div>
            <div class="challenge-body">
                <h3 class="challenge-title">${challenge.title}</h3>
                <p class="challenge-description">${challenge.description}</p>
            </div>
            <div class="challenge-stats">
                <div class="solve-count">${challenge.solves.toLocaleString()} solves</div>
                <div class="solve-percentage">${challenge.completionRate} 👍</div>
            </div>
        `;
        
        challengeGrid.appendChild(challengeCard);
    });
    

    if (filteredChallenges.length === 0) {
        challengeGrid.innerHTML = '<div class="no-results">No challenges match your filters</div>';
    }
}

// Set up event listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        filters.search = e.target.value;
        renderChallenges();
    });
    
    // Checkbox filters
    hideSolvedCheckbox.addEventListener('change', (e) => {
        filters.hideSolved = e.target.checked;
        renderChallenges();
    });
    
    showBookmarkedCheckbox.addEventListener('change', (e) => {
        filters.showBookmarked = e.target.checked;
        renderChallenges();
    });
    
    showAssignedCheckbox.addEventListener('change', (e) => {
        filters.showAssigned = e.target.checked;
        renderChallenges();
    });
    
    // Difficulty filters
    difficultyItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            difficultyItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Update filter
            filters.difficulty = item.textContent;
            renderChallenges();
        });
    });
    
    // Category filters
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            categoryItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Update filter
            filters.category = item.textContent;
            renderChallenges();
        });
    });
}

// Apply different colors to difficulty badges
function applyDifficultyStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .difficulty-badge.easy {
            background-color: #4caf50;
        }
        .difficulty-badge.medium {
            background-color: #ff9800;
        }
        .difficulty-badge.hard {
            background-color: #f44336;
        }
        
        .challenge-card.solved {
            border-left: 4px solid #4caf50;
        }
        .challenge-card.bookmarked::after {
            content: "★";
            position: absolute;
            top: 10px;
            right: 10px;
            color: #ffca28;
            font-size: 20px;
        }
        .challenge-card.assigned::before {
            content: "📝";
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 16px;
        }
        .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 50px;
            color: #888;
            font-size: 18px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    applyDifficultyStyles();
    init();
});