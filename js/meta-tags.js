function setupMetaTags(comicId) {
  const metaTags = [
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location.href },
    { property: 'og:title', content: 'Alvenhiem - Comic Loading...' },
    { property: 'og:description', content: 'Loading comic details...' },
    { property: 'og:image', content: '/assets/default-embed.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Alvenhiem - Comic Loading...' },
    { name: 'twitter:description', content: 'Loading comic details...' },
    { name: 'twitter:image', content: '/assets/default-embed.jpg' }
  ];
  
  metaTags.forEach(tagInfo => {
    let meta = document.querySelector(`meta[${tagInfo.property ? 'property' : 'name'}="${tagInfo.property || tagInfo.name}"]`);
    
    if (!meta) {
      meta = document.createElement('meta');
      if (tagInfo.property) {
        meta.setAttribute('property', tagInfo.property);
      } else {
        meta.setAttribute('name', tagInfo.name);
      }
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', tagInfo.content);
  });
}

function updateMetaTag(selector, content) {
  const prop = selector.startsWith('og:') ? 'property' : 'name';
  const meta = document.querySelector(`meta[${prop}="${selector}"]`);
  if (meta) {
    meta.setAttribute('content', content);
  }
}

function updateMetaTags(comic) {
  const title = `${comic.title} - Alvenhiem`;
  const description = comic.description 
    ? comic.description.substring(0, 150) + (comic.description.length > 150 ? '...' : '') 
    : 'Read this comic on Alvenhiem';
  const image = comic.cover || '/assets/default-embed.jpg';
  
  document.title = title;
  
  updateMetaTag('og:title', title);
  updateMetaTag('og:description', description);
  updateMetaTag('og:image', image);
  
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', description);
  updateMetaTag('twitter:image', image);
  
  addStructuredData(comic);
}

function addStructuredData(comic) {
  const existingScript = document.getElementById('structuredData');
  if (existingScript) {
    existingScript.remove();
  }
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": comic.title,
    "author": {
      "@type": "Person",
      "name": comic.author || "Unknown Author"
    }
  };
  
  if (comic.artist) {
    structuredData.illustrator = {
      "@type": "Person",
      "name": comic.artist
    };
  }
  
  if (comic.releaseYear) {
    structuredData.datePublished = comic.releaseYear.toString();
  }
  
  if (comic.description) {
    structuredData.description = comic.description;
  }
  
  if (Array.isArray(comic.genres) && comic.genres.length > 0) {
    structuredData.genre = comic.genres;
  }
  
  if (comic.cover) {
    structuredData.image = comic.cover;
  }
  
  structuredData.publisher = {
    "@type": "Organization",
    "name": "Alvenhiem"
  };
  
  const script = document.createElement('script');
  script.id = 'structuredData';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}