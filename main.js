// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mock MLS API data (In production, replace with real API)
const mockProperties = [
    {
        id: 1,
        price: 450000,
        title: "Modern Family Home",
        location: "Downtown Area, CA",
        type: "house",
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Beautiful modern home with open floor plan, updated kitchen, and spacious backyard.",
        features: ["Pool", "Garage", "Garden", "Modern Kitchen"],
        yearBuilt: 2018,
        status: "For Sale"
    },
    {
        id: 2,
        price: 320000,
        title: "Luxury Apartment",
        location: "Midtown, CA",
        type: "apartment",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Stunning apartment with city views, modern amenities, and premium finishes.",
        features: ["City View", "Gym", "Concierge", "Balcony"],
        yearBuilt: 2020,
        status: "For Sale"
    },
    {
        id: 3,
        price: 275000,
        title: "Cozy Townhouse",
        location: "Suburban Area, CA",
        type: "townhouse",
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Charming townhouse in quiet neighborhood with attached garage and private patio.",
        features: ["Garage", "Patio", "Fireplace", "Storage"],
        yearBuilt: 2015,
        status: "For Sale"
    },
    {
        id: 4,
        price: 580000,
        title: "Waterfront Condo",
        location: "Marina District, CA",
        type: "condo",
        bedrooms: 3,
        bathrooms: 2,
        area: 1600,
        image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Elegant condo with waterfront views, premium appliances, and resort-style amenities.",
        features: ["Water View", "Pool", "Spa", "Parking"],
        yearBuilt: 2019,
        status: "For Sale"
    },
    {
        id: 5,
        price: 750000,
        title: "Executive Home",
        location: "Hillside Estates, CA",
        type: "house",
        bedrooms: 5,
        bathrooms: 4,
        area: 3200,
        image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Luxurious executive home with panoramic views, wine cellar, and 3-car garage.",
        features: ["Wine Cellar", "3-Car Garage", "Pool", "Home Office"],
        yearBuilt: 2017,
        status: "For Sale"
    },
    {
        id: 6,
        price: 425000,
        title: "Urban Loft",
        location: "Arts District, CA",
        type: "apartment",
        bedrooms: 2,
        bathrooms: 1,
        area: 1100,
        image: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Stylish urban loft with exposed brick, high ceilings, and industrial charm.",
        features: ["High Ceilings", "Exposed Brick", "Parking", "Rooftop Access"],
        yearBuilt: 2016,
        status: "For Sale"
    }
];

// API Configuration (Replace with real API endpoints)
const API_CONFIG = {
    // Example: RapidAPI Real Estate API
    baseUrl: 'https://realty-mole-property-api.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': 'YOUR_API_KEY_HERE', // Replace with actual API key
        'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
    }
};

// Search Properties Function
async function searchProperties() {
    const location = document.getElementById('location').value;
    const propertyType = document.getElementById('propertyType').value;
    const priceRange = document.getElementById('priceRange').value;
    
    if (!location.trim()) {
        alert('Please enter a location to search');
        return;
    }
    
    showLoading();
    
    try {
        // In production, replace this with real API call
        const properties = await mockAPICall(location, propertyType, priceRange);
        displayProperties(properties);
        
        // Scroll to properties section
        document.getElementById('properties').scrollIntoView({ 
            behavior: 'smooth' 
        });
    } catch (error) {
        console.error('Error searching properties:', error);
        alert('Error searching properties. Please try again.');
    } finally {
        hideLoading();
    }
}

// Real API Call Function (Example implementation)
async function realAPICall(location, propertyType, priceRange) {
    try {
        const url = `${API_CONFIG.baseUrl}/properties?address=${encodeURIComponent(location)}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: API_CONFIG.headers
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.properties || [];
    } catch (error) {
        console.error('API call failed:', error);
        // Fallback to mock data
        return mockAPICall(location, propertyType, priceRange);
    }
}

// Mock API Call (for demonstration)
async function mockAPICall(location, propertyType, priceRange) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let filteredProperties = [...mockProperties];
    
    // Filter by property type
    if (propertyType) {
        filteredProperties = filteredProperties.filter(property => 
            property.type === propertyType
        );
    }
    
    // Filter by price range
    if (priceRange) {
        const [min, max] = priceRange.includes('+') 
            ? [parseInt(priceRange.replace('+', '')), Infinity]
            : priceRange.split('-').map(Number);
        
        filteredProperties = filteredProperties.filter(property => 
            property.price >= min && property.price <= max
        );
    }
    
    // Filter by location (simple text matching)
    if (location) {
        const searchTerm = location.toLowerCase();
        filteredProperties = filteredProperties.filter(property =>
            property.location.toLowerCase().includes(searchTerm) ||
            property.title.toLowerCase().includes(searchTerm)
        );
    }
    
    return filteredProperties;
}

// Display Properties
function displayProperties(properties) {
    const grid = document.getElementById('properties-grid');
    
    if (properties.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 48px;">
                <h3>No properties found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = properties.map(property => `
        <div class="property-card" data-type="${property.type}" onclick="showPropertyDetails(${property.id})">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                <div class="property-badge">${property.status}</div>
            </div>
            <div class="property-info">
                <div class="property-price">$${property.price.toLocaleString()}</div>
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </p>
                <div class="property-features">
                    <span class="feature">
                        <i class="fas fa-bed"></i>
                        ${property.bedrooms} bed
                    </span>
                    <span class="feature">
                        <i class="fas fa-bath"></i>
                        ${property.bathrooms} bath
                    </span>
                    <span class="feature">
                        <i class="fas fa-home"></i>
                        ${property.area} sqft
                    </span>
                </div>
                <p class="property-description">${property.description}</p>
            </div>
        </div>
    `).join('');
}

// Show Property Details Modal
function showPropertyDetails(propertyId) {
    const property = mockProperties.find(p => p.id === propertyId);
    if (!property) return;
    
    const modal = document.getElementById('propertyModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div style="position: relative;">
            <img src="${property.image}" alt="${property.title}" style="width: 100%; height: 300px; object-fit: cover;">
            <div style="padding: 32px;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 24px;">
                    <div>
                        <h2 style="font-size: 2rem; font-weight: 700; color: var(--neutral-900); margin-bottom: 8px;">${property.title}</h2>
                        <p style="color: var(--neutral-600); display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-map-marker-alt"></i>
                            ${property.location}
                        </p>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">$${property.price.toLocaleString()}</div>
                        <div style="background: var(--secondary-color); color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.875rem; font-weight: 600;">${property.status}</div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 24px;">
                    <div style="text-align: center; padding: 16px; background: var(--neutral-50); border-radius: 8px;">
                        <i class="fas fa-bed" style="font-size: 1.5rem; color: var(--primary-color); margin-bottom: 8px;"></i>
                        <div style="font-weight: 600;">${property.bedrooms} Bedrooms</div>
                    </div>
                    <div style="text-align: center; padding: 16px; background: var(--neutral-50); border-radius: 8px;">
                        <i class="fas fa-bath" style="font-size: 1.5rem; color: var(--primary-color); margin-bottom: 8px;"></i>
                        <div style="font-weight: 600;">${property.bathrooms} Bathrooms</div>
                    </div>
                    <div style="text-align: center; padding: 16px; background: var(--neutral-50); border-radius: 8px;">
                        <i class="fas fa-home" style="font-size: 1.5rem; color: var(--primary-color); margin-bottom: 8px;"></i>
                        <div style="font-weight: 600;">${property.area} sqft</div>
                    </div>
                    <div style="text-align: center; padding: 16px; background: var(--neutral-50); border-radius: 8px;">
                        <i class="fas fa-calendar" style="font-size: 1.5rem; color: var(--primary-color); margin-bottom: 8px;"></i>
                        <div style="font-weight: 600;">Built ${property.yearBuilt}</div>
                    </div>
                </div>
                
                <div style="margin-bottom: 24px;">
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 12px;">Description</h3>
                    <p style="color: var(--neutral-600); line-height: 1.6;">${property.description}</p>
                </div>
                
                <div style="margin-bottom: 32px;">
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 12px;">Features</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${property.features.map(feature => `
                            <span style="background: var(--primary-color); color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.875rem;">${feature}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div style="display: flex; gap: 16px;">
                    <button onclick="contactAgent('${property.title}')" style="flex: 1; background: var(--primary-color); color: white; border: none; padding: 16px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-phone"></i> Contact Agent
                    </button>
                    <button onclick="scheduleViewing('${property.title}')" style="flex: 1; background: var(--secondary-color); color: white; border: none; padding: 16px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-calendar"></i> Schedule Viewing
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('propertyModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('propertyModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Property Filter Functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        filterProperties(filter);
    });
});

function filterProperties(filter) {
    const properties = document.querySelectorAll('.property-card');
    
    properties.forEach(property => {
        if (filter === 'all' || property.getAttribute('data-type') === filter) {
            property.style.display = 'block';
        } else {
            property.style.display = 'none';
        }
    });
}

// Contact Agent Function
function contactAgent(propertyTitle) {
    alert(`Thanks for your interest in "${propertyTitle}"! Our agent will contact you shortly.`);
    document.getElementById('propertyModal').style.display = 'none';
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Schedule Viewing Function
function scheduleViewing(propertyTitle) {
    alert(`Viewing scheduled for "${propertyTitle}"! You will receive a confirmation email shortly.`);
    document.getElementById('propertyModal').style.display = 'none';
}

// Loading Functions
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Contact Form Submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you within 24 hours.');
    e.target.reset();
});

// Initialize page with featured properties
document.addEventListener('DOMContentLoaded', () => {
    displayProperties(mockProperties);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe property cards for animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.property-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 100);
});