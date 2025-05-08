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
        isBookmarked: true,
        isJoined: false
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
        isBookmarked: false,
        isJoined: false
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
        isBookmarked: false,
        isJoined: false
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
        isBookmarked: true,
        isJoined: false
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
        isBookmarked: false,
        isJoined: false
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
        isBookmarked: true,
        isJoined: false
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
        isBookmarked: false,
        isJoined: false
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
        isBookmarked: false,
        isJoined: false
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
        isAssigned: true,
        isJoined: false
    }
];

const challengeGrid = document.querySelector('.challenge-grid');
const searchInput = document.querySelector('.search-input');
const hideSolvedCheckbox = document.getElementById('hide-solved');
const showBookmarkedCheckbox = document.getElementById('show-bookmarked');
const showAssignedCheckbox = document.getElementById('show-assigned');
const difficultyItems = document.querySelectorAll('.difficulty-item');
const categoryItems = document.querySelectorAll('.category-item');
const joinChallengeBtn = document.getElementById('joinChallengeBtn');

let filters = {
    search: '',
    hideSolved: false,
    showBookmarked: false,
    showAssigned: false,
    showJoined: false,
    difficulty: 'All Difficulties',
    category: 'All Categories'
};

// Initialize page
function init() {
    loadJoinedChallenges();
    renderChallenges();
    setupEventListeners();
}

// Load joined challenges from localStorage
function loadJoinedChallenges() {
    const savedJoinedChallenges = localStorage.getItem('joinedChallenges');
    if (savedJoinedChallenges) {
        const joinedIds = JSON.parse(savedJoinedChallenges);
        
        // Update the challenges array with the joined status
        challenges.forEach(challenge => {
            if (joinedIds.includes(challenge.id)) {
                challenge.isJoined = true;
            }
        });
    }
}

// Save joined challenges to localStorage
function saveJoinedChallenges() {
    const joinedIds = challenges
        .filter(challenge => challenge.isJoined)
        .map(challenge => challenge.id);
    
    localStorage.setItem('joinedChallenges', JSON.stringify(joinedIds));
}

// Toggle join status for a challenge
function toggleJoinChallenge(challengeId) {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
        challenge.isJoined = !challenge.isJoined;
        saveJoinedChallenges();
        renderChallenges();
    }
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
        challengeCard.dataset.id = challenge.id;
        
        // Add additional classes if needed
        if (challenge.isSolved) challengeCard.classList.add('solved');
        if (challenge.isBookmarked) challengeCard.classList.add('bookmarked');
        if (challenge.isAssigned) challengeCard.classList.add('assigned');
        if (challenge.isJoined) challengeCard.classList.add('joined');
        
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
            <div class="challenge-actions">
                <button class="join-button ${challenge.isJoined ? 'joined' : ''}" data-id="${challenge.id}">
                    ${challenge.isJoined ? 'Leave Challenge' : 'Join Challenge'}
                </button>
            </div>
        `;
        
        challengeGrid.appendChild(challengeCard);
    });
    
    // Add event listeners to join buttons
    document.querySelectorAll('.join-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const challengeId = parseInt(button.dataset.id);
            toggleJoinChallenge(challengeId);
        });
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

    // Global Join Challenge button (optional - can be used to navigate to joined challenges view)
    if (joinChallengeBtn) {
        joinChallengeBtn.addEventListener('click', () => {
            // Example: Toggle showing only joined challenges
            filters.showJoined = !filters.showJoined;
            
            if (filters.showJoined) {
                joinChallengeBtn.textContent = "Show All Challenges";
                // Only show joined challenges
                renderJoinedChallengesOnly();
            } else {
                joinChallengeBtn.textContent = "Show Joined Challenges";
                renderChallenges();
            }
        });
    }
}

// Function to render only joined challenges
function renderJoinedChallengesOnly() {
    challengeGrid.innerHTML = '';
    
    const joinedChallenges = challenges.filter(challenge => challenge.isJoined);
    
    if (joinedChallenges.length === 0) {
        challengeGrid.innerHTML = '<div class="no-results">You haven\'t joined any challenges yet!</div>';
        return;
    }
    
    joinedChallenges.forEach(challenge => {
        const challengeCard = document.createElement('div');
        challengeCard.className = 'challenge-card joined';
        challengeCard.dataset.id = challenge.id;
        
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
            <div class="challenge-actions">
                <button class="join-button joined" data-id="${challenge.id}">
                    Leave Challenge
                </button>
            </div>
        `;
        
        challengeGrid.appendChild(challengeCard);
    });
    
    // Add event listeners to join buttons
    document.querySelectorAll('.join-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const challengeId = parseInt(button.dataset.id);
            toggleJoinChallenge(challengeId);
            
            // If we're in joined challenges view, remove the card
            if (filters.showJoined) {
                renderJoinedChallengesOnly();
            }
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
        .challenge-card.joined {
            border: 2px solid #4285f4;
            box-shadow: 0 0 8px rgba(66, 133, 244, 0.4);
        }
        .join-button {
            padding: 8px 12px;
            background-color: #4285f4;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .join-button:hover {
            background-color: #3367d6;
        }
        .join-button.joined {
            background-color: #f44336;
        }
        .join-button.joined:hover {
            background-color: #d32f2f;
        }
        .challenge-actions {
            margin-top: 12px;
            text-align: right;
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