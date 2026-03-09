export async function loadProfile() {
    try {
        const response = await fetch('./data/portfolio-data.json');
        if (!response.ok) throw new Error('Failed to load profile data');
        const data = await response.json();
        
        const profile = data.profile || {};
        const links = data.links || {};
        const education = data.education || [];
        
        // Split name for styling
        const nameParts = (profile.name || 'Jana Mufti').split(' ');
        const firstName = nameParts[0] || 'Jana';
        const lastName = nameParts.slice(1).join(' ') || 'Mufti';

        // Update Document Head
        if (document.getElementById('page-title')) {
            document.getElementById('page-title').textContent = `${profile.name || 'JanaOS'} | Intelligent Systems`;
        }
        if (document.getElementById('meta-description')) {
            document.getElementById('meta-description').content = `Portfolio of ${profile.name} - ${profile.title}`;
        }

        // Update Navigation
        const navName = document.getElementById('nav-name');
        if (navName) {
            navName.innerHTML = `${firstName}<span class="text-accent">${lastName}</span>`;
        }
        
        const navResumeLink = document.getElementById('nav-resume-link');
        if (navResumeLink && links.resume) {
            navResumeLink.href = links.resume;
        }

        // Update Hero Section
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = `Hi, I’m ${profile.name}. <br />\n<span id="hero-subtitle" class="text-slate-500">${profile.bio || 'I build intelligent systems.'}</span>`;
        }
        
        const heroBio = document.getElementById('hero-bio');
        if (heroBio) {
            heroBio.textContent = profile.title + (profile.university ? ` at ${profile.university}` : '');
        }

        const heroTagline = document.getElementById('hero-tagline');
        if (heroTagline) {
            if (profile.tagline) {
                heroTagline.textContent = profile.tagline;
                heroTagline.style.display = 'block';
            } else {
                heroTagline.style.display = 'none';
            }
        }

        // Update About Section
        const aboutTitle = document.getElementById('about-title');
        if (aboutTitle) {
            aboutTitle.innerHTML = `<span class="w-8 h-[1px] bg-accent"></span>About ${firstName}`;
        }

        const aboutText = document.getElementById('about-text');
        if (aboutText && profile.about) {
            // Split by double newline to create paragraphs
            const paragraphs = profile.about.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`).join('');
            aboutText.innerHTML = paragraphs;
        }

        const aboutImage = document.getElementById('about-image');
        if (aboutImage && profile.about_image) {
            aboutImage.src = profile.about_image;
        }

        const aboutCode = document.getElementById('about-code');
        if (aboutCode) {
            const currentSchool = education.length > 0 ? education[0].school : (profile.university || 'University');
            aboutCode.innerHTML = `<span class="text-purple-400">const</span> <span class="text-yellow-200">${firstName.toLowerCase()}</span> = {
  focus: [<span class="text-green-300">'AI'</span>, <span class="text-green-300">'Security'</span>],
  creativity: <span class="text-orange-400">true</span>,
  location: <span class="text-green-300">'${currentSchool}'</span>
};`;
        }

        // Update Projects Section
        const projectsDesc = document.getElementById('projects-desc');
        if (projectsDesc && profile.projects_desc) {
            projectsDesc.textContent = profile.projects_desc;
        }

        // Update Contact Section
        const contactText = document.getElementById('contact-text');
        if (contactText && profile.contact_text) {
            contactText.textContent = profile.contact_text;
        }

        const contactEmail = document.getElementById('contact-email');
        if (contactEmail && links.email) {
            contactEmail.href = `mailto:${links.email}`;
            // Keep the SVG inside, just update the text node if possible, or recreate
            contactEmail.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Email
            `;
        }

        const contactGithub = document.getElementById('contact-github');
        if (contactGithub && links.github) {
            contactGithub.href = links.github;
        }

        const contactLinkedin = document.getElementById('contact-linkedin');
        if (contactLinkedin && links.linkedin) {
            contactLinkedin.href = links.linkedin;
        }

        // Update Footer
        const footerName = document.getElementById('footer-name');
        if (footerName) {
            footerName.textContent = `Designed & Built by ${profile.name}.`;
        }

        const footerYear = document.getElementById('footer-year');
        if (footerYear) {
            footerYear.textContent = new Date().getFullYear();
        }

    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}
