document.addEventListener("DOMContentLoaded", function() {
  // Set current year in footer
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Toggle mobile navigation when hamburger icon is clicked
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  
  menuToggle.addEventListener("click", function() {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
  
  // Close mobile nav when a link is clicked
  document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });
  
  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute("href"));
      if (targetElement) {
        const headerOffset = 80; // Adjust for sticky header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
  
  // Load comics from JSON
  loadComics();
  
  // Load chapters from JSON
  loadChapters();
  
  // Handle contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would normally send the data to a server
      // For demo purposes, we'll just show an alert
      alert(`Thank you ${name}! Your message has been sent. We'll get back to you at ${email} soon.`);
      
      // Reset form
      contactForm.reset();
    });
  }
});

// Function to load comics from JSON file
async function loadComics() {
  try {
    const comicsCarousel = document.getElementById('comicsCarousel');
    if (!comicsCarousel) return;
    
    const response = await fetch('data/comics.json');
    if (!response.ok) {
      throw new Error('Failed to load comics data');
    }
    
    const comics = await response.json();
    
    // Clear loading message
    comicsCarousel.innerHTML = '';
    
    // Add comics to the carousel
    comics.forEach(comic => {
      const comicCard = document.createElement('div');
      comicCard.className = 'comic-card';
      
      comicCard.innerHTML = `
        <div class="status">${comic.status}</div>
        <img src="${comic.coverImage}" alt="${comic.title} Cover" />
        <h3>${comic.title}</h3>
        <p>${comic.author}</p>
      `;
      
      comicCard.addEventListener('click', () => {
        // This could open a comic details page in the future
        alert(`You selected ${comic.title}. This would open the comic details page.`);
      });
      
      comicsCarousel.appendChild(comicCard);
    });
    
    // If there are no comics, show a message
    if (comics.length === 0) {
      comicsCarousel.innerHTML = '<div class="no-data">No comics available at the moment.</div>';
    }
    
  } catch (error) {
    console.error('Error loading comics:', error);
    const comicsCarousel = document.getElementById('comicsCarousel');
    if (comicsCarousel) {
      comicsCarousel.innerHTML = '<div class="error">Failed to load comics. Please try again later.</div>';
    }
  }
}

// Function to load chapters from JSON file
async function loadChapters() {
  try {
    const chapterList = document.getElementById('chapterList');
    if (!chapterList) return;
    
    const response = await fetch('data/chapters.json');
    if (!response.ok) {
      throw new Error('Failed to load chapters data');
    }
    
    const chapters = await response.json();
    
    // Sort chapters by release date (newest first)
    chapters.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    
    // Clear loading message
    chapterList.innerHTML = '';
    
    // Add chapters to the list
    chapters.forEach(chapter => {
      const chapterCard = document.createElement('div');
      chapterCard.className = 'chapter-card';
      
      // Format date
      const releaseDate = new Date(chapter.releaseDate);
      const formattedDate = releaseDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      chapterCard.innerHTML = `
        <div class="chapter-info">
          <h3>${chapter.comicTitle}</h3>
          <p class="chapter-title">${chapter.title}</p>
          <p class="chapter-number">Chapter ${chapter.chapterNumber}</p>
          <p class="chapter-date">Released: ${formattedDate}</p>
          <button class="read-button">Read Now</button>
        </div>
        <div class="chapter-logo">
          <img src="${chapter.coverImage}" alt="${chapter.comicTitle} Logo" />
        </div>
      `;
      
      // Add event listener to read button
      chapterCard.querySelector('.read-button').addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click event
        alert(`You are about to read ${chapter.comicTitle} - Chapter ${chapter.chapterNumber}: ${chapter.title}`);
      });
      
      // Add event listener to the whole card
      chapterCard.addEventListener('click', () => {
        // This could also open the reader
        const readButton = chapterCard.querySelector('.read-button');
        readButton.click();
      });
      
      chapterList.appendChild(chapterCard);
    });
    
    // If there are no chapters, show a message
    if (chapters.length === 0) {
      chapterList.innerHTML = '<div class="no-data">No chapters available at the moment.</div>';
    }
    
  } catch (error) {
    console.error('Error loading chapters:', error);
    const chapterList = document.getElementById('chapterList');
    if (chapterList) {
      chapterList.innerHTML = '<div class="error">Failed to load chapters. Please try again later.</div>';
    }
  }
}

// Add event listeners to make carousel scrollable with buttons
document.addEventListener('DOMContentLoaded', function() {
  // Add scroll buttons for comics carousel if needed
  const comicsCarousel = document.getElementById('comicsCarousel');
  if (comicsCarousel && comicsCarousel.scrollWidth > comicsCarousel.clientWidth) {
    const scrollAmount = 300; // Adjust scroll amount as needed
    
    // Create scroll buttons container
    const scrollButtons = document.createElement('div');
    scrollButtons.className = 'carousel-buttons';
    
    // Create left scroll button
    const leftBtn = document.createElement('button');
    leftBtn.className = 'scroll-btn left';
    leftBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    leftBtn.addEventListener('click', () => {
      comicsCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    // Create right scroll button
    const rightBtn = document.createElement('button');
    rightBtn.className = 'scroll-btn right';
    rightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    rightBtn.addEventListener('click', () => {
      comicsCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    // Add buttons to container
    scrollButtons.appendChild(leftBtn);
    scrollButtons.appendChild(rightBtn);
    
    // Add buttons to the page
    comicsCarousel.parentElement.appendChild(scrollButtons);
  }
});

// Function to handle errors when fetching data
function handleFetchError(element, message) {
  if (element) {
    element.innerHTML = `<div class="error">${message}</div>`;
  }
}

// Function to load team members dynamically
async function loadTeamMembers() {
  const teamGrid = document.querySelector('.team-grid');
  
  try {
    // Fetch the list of JSON files from the team folder
    const response = await fetch('team/index.json');
    if (!response.ok) {
      throw new Error('Failed to load team data index');
    }
    
    const teamIndex = await response.json();
    const teamFiles = teamIndex.members || [];
    
    if (teamFiles.length === 0) {
      teamGrid.innerHTML = '<div class="no-data">No team members found</div>';
      return;
    }
    
    // Clear default placeholders
    teamGrid.innerHTML = '';
    
    let priorityMembers = [];
    let otherMembers = [];
    
    // Load each team member's JSON file
    for (const file of teamFiles) {
      const memberResponse = await fetch(`team/${file}`);
      if (memberResponse.ok) {
        const memberData = await memberResponse.json();
        
        // Separate priority and non-priority members
        if (memberData.priority === true) {
          priorityMembers.push(memberData);
        } else {
          otherMembers.push(memberData);
        }
      }
    }
    
    // First display priority members
    priorityMembers.forEach(member => {
      const memberElement = createTeamMemberElement(member);
      teamGrid.appendChild(memberElement);
    });
    
    // If there are non-priority members, add a "Show More" button
    if (otherMembers.length > 0) {
      const showMoreContainer = document.createElement('div');
      showMoreContainer.className = 'show-more-container';
      showMoreContainer.style.gridColumn = '1 / -1';
      showMoreContainer.style.textAlign = 'center';
      showMoreContainer.style.margin = '20px 0';
      
      const showMoreButton = document.createElement('button');
      showMoreButton.className = 'cta-button';
      showMoreButton.textContent = `Show More (${otherMembers.length})`;
      showMoreButton.addEventListener('click', () => {
        // Remove the button
        showMoreContainer.remove();
        
        // Add the rest of the team members
        otherMembers.forEach(member => {
          const memberElement = createTeamMemberElement(member);
          teamGrid.appendChild(memberElement);
        });
      });
      
      showMoreContainer.appendChild(showMoreButton);
      teamGrid.appendChild(showMoreContainer);
    }
    
  } catch (error) {
    console.error('Error loading team members:', error);
    teamGrid.innerHTML = '<div class="error">Failed to load team members</div>';
  }
}

// Function to create a team member element
function createTeamMemberElement(member) {
  const memberElement = document.createElement('div');
  memberElement.className = 'team-member';
  
  const avatarElement = document.createElement('div');
  avatarElement.className = 'member-avatar';
  
  // Use member's avatar if available, otherwise use default icon
  if (member.avatar) {
    const img = document.createElement('img');
    img.src = member.avatar;
    img.alt = `${member.name}'s avatar`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.borderRadius = '50%';
    img.style.objectFit = 'cover';
    avatarElement.appendChild(img);
  } else {
    const icon = document.createElement('i');
    icon.className = 'fas fa-user-circle';
    avatarElement.appendChild(icon);
  }
  
  const infoElement = document.createElement('div');
  infoElement.className = 'member-info';
  
  const nameElement = document.createElement('h4');
  nameElement.textContent = member.name;
  
  const roleElement = document.createElement('p');
  roleElement.textContent = member.role;
  
  infoElement.appendChild(nameElement);
  infoElement.appendChild(roleElement);
  
  memberElement.appendChild(avatarElement);
  memberElement.appendChild(infoElement);
  
  return memberElement;
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  loadTeamMembers();
});