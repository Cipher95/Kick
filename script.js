document.addEventListener('DOMContentLoaded', () => {
	
    // --- DATA STORE ---
    const pageData = {
        home: {
            title: "Welcome to Kick!",
            image: "what-is-kick-1024x576.jpg",
            content: `
                <p>Kick is a fast-growing live streaming platform built for gamers, creators, and online communities. Watch live streams, interact with your favorite creators through real-time chat, and explore gaming, entertainment, music, and IRL content. Join the community and experience live streaming with a fresh and creator-friendly platform.</p>
                
            `
        },
       		streams: {
            title: "Live Streams",
            image: "what-is-kick-1024x576.jpg",
            intro: ``,
            items: [
                
                {
                    id: 'sxb',
                    title: 'SXB',
                    image: 'what-is-kick-1024x576.jpg',
                    description: `
                        <iframe 
     			src="https://player.kick.com/sxb?autoplay=true" 
     			height="378" 
     			width="100%"
     			frameborder="0" 
     			scrolling="no" 
     			allowfullscreen="true"> 
						</iframe>
						<br/>
						<iframe src="https://chat.kick.cx/embed/sxb" width="100%" height="500px"></iframe>
                    `
                },{
                    id: 'ogabdullah',
                    title: 'ogabdullah',
                    image: 'what-is-kick-1024x576.jpg',
                    description: `
                        <iframe 
     			src="https://player.kick.com/ogabdullah?autoplay=true" 
     			height="378" 
     			width="100%"
     			frameborder="0" 
     			scrolling="no" 
     			allowfullscreen="true"> 
						</iframe>
						<br/>
						<iframe src="https://chat.kick.cx/embed/ogabdullah" width="100%" height="500px"></iframe>
                    `
                }
            ]
        }
    };

    // --- ELEMENT SELECTORS ---
    const contentArea = document.getElementById('content-area');
    const navLinks = document.querySelectorAll('.nav-link');
    const clockElement = document.getElementById('clock');
    const dateDayElement = document.getElementById('date-day');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    const scrollToBottomBtn = document.getElementById('scroll-to-bottom-btn');

	 // --- FUNCTIONS ---

    

    /**
     * Builds and sets up the interactive content for the 'Streams' page.
     * @param {object} streamsData - The 'streams' data object from pageData.
     */
    function setupStreamsPage(streamsData) {
        const displayArea = document.getElementById('streams-display-area');
        if (!displayArea || !streamsData.items || streamsData.items.length === 0) return;

        const navButtonsHTML = streamsData.items.map((item, index) =>
            `<button class="streams-nav-btn ${index === 0 ? 'active' : ''}" data-item-id="${item.id}">${item.title}</button>`
        ).join('');

        const firstItem = streamsData.items[0];

        const contentHTML = `
            <div class="streams-nav-container">
                ${navButtonsHTML}
            </div>
            <div class="streams-content-display">
                
                <div id="streams-item-description" class="streams-content-text">
                    ${firstItem.description}
                </div>
            </div>
        `;

        displayArea.innerHTML = contentHTML;

		
        const navButtons = displayArea.querySelectorAll('.streams-nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.getAttribute('data-item-id');
                const itemData = streamsData.items.find(i => i.id === itemId);
                if (!itemData) return;
			
                document.getElementById('streams-item-description').innerHTML = itemData.description;

                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

			            });
        });
    }

    
	
	
		

    function switchContent(pageKey) {
    const data = pageData[pageKey];
    if (!data) return;

    contentArea.classList.add('fade-out');

    setTimeout(() => {

        let contentHTML = '';

        // HOME PAGE
        if (pageKey === 'home') {
            contentHTML = data.content;
        }

        // STREAMS PAGE
        else if (pageKey === 'streams') {
            contentHTML = `
                <div id="streams-display-area"></div>
            `;
        }

        const html = `
            <div class="content-wrapper">
				<div class="content-image">
                    <img src="${data.image}" alt="${data.title}">
                </div>
				
                <div class="content-text">
                    <h2>${data.title}</h2>
                    ${contentHTML}
                </div>
            </div>
        `;

        // THIS WAS MISSING
        contentArea.innerHTML = html;

        // setup interactive section
        if (pageKey === 'streams') {
            setupStreamsPage(data);
        }

        contentArea.classList.remove('fade-out');

    }, 300);
}

    /**
     * Updates the clock and date display.
     */
    function updateClock() {
        const now = new Date();
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const timeString = now.toLocaleTimeString('en-US', timeOptions);
        const dateDayString = now.toLocaleDateString('en-US', dateOptions);

        clockElement.textContent = timeString;
        dateDayElement.textContent = dateDayString;
    }

    /**
     * Shows or hides the scroll buttons based on the user's scroll position.
     */
    function handleScrollButtons() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop > 200) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        if (scrollTop + clientHeight < scrollHeight - 50) {
            scrollToBottomBtn.classList.add('show');
        } else {
            scrollToBottomBtn.classList.remove('show');
        }
    }

     /**
     * Smoothly scrolls the window to the top.
     */
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Smoothly scrolls the window to the bottom.
     */
    function scrollToBottom() {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }

       // --- EVENT LISTENERS & INITIALIZATION ---

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const page = link.getAttribute('data-page');
            switchContent(page);
        });
    });

    
    window.addEventListener('scroll', handleScrollButtons);
    backToTopBtn.addEventListener('click', scrollToTop);
    scrollToBottomBtn.addEventListener('click', scrollToBottom);
    
    // Initialize the page
    switchContent('home');
    updateClock();
    setInterval(updateClock, 1000);
});
