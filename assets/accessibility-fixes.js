// Accessibility Fixes for Travel Website
// This script addresses various accessibility issues including iframe title attributes

(function() {
  'use strict';

  // Fix Shopify preview bar iframe accessibility
  function fixShopifyPreviewBarIframe() {
    const previewBarIframe = document.getElementById('PBarNextFrame');
    if (previewBarIframe && !previewBarIframe.getAttribute('title')) {
      previewBarIframe.setAttribute('title', 'Shopify Admin Preview Bar');
      console.log('Added title to Shopify preview bar iframe for accessibility');
    }
  }

  // Fix any iframes that are missing title attributes
  function fixGenericIframes() {
    const iframes = document.querySelectorAll('iframe:not([title])');
    iframes.forEach(iframe => {
      let title = '';
      
      // Try to get title from various sources
      if (iframe.src.includes('youtube.com')) {
        title = 'YouTube Video Player';
      } else if (iframe.src.includes('vimeo.com')) {
        title = 'Vimeo Video Player';
      } else if (iframe.src.includes('maps.google.com') || iframe.src.includes('google.com/maps')) {
        title = 'Google Maps';
      } else if (iframe.classList.contains('js-youtube')) {
        title = 'YouTube Video Player';
      } else if (iframe.classList.contains('js-vimeo')) {
        title = 'Vimeo Video Player';
      } else if (iframe.closest('.deferred-media')) {
        title = 'Video Player';
      } else {
        // Generic fallback
        title = 'Embedded Content';
      }

      iframe.setAttribute('title', title);
      console.log(`Added title "${title}" to iframe for accessibility`);
    });
  }

  // Enhance focus visibility for better keyboard navigation
  function enhanceFocusVisibility() {
    const style = document.createElement('style');
    style.textContent = `
      /* Enhanced focus styles for better accessibility */
      iframe:focus {
        outline: 3px solid #0066cc !important;
        outline-offset: 2px !important;
      }
      
      /* Ensure consistent focus styles across all interactive elements */
      button:focus-visible,
      a:focus-visible,
      input:focus-visible,
      select:focus-visible,
      textarea:focus-visible {
        outline: 2px solid #0066cc !important;
        outline-offset: 2px !important;
      }    `;
    document.head.appendChild(style);
  }

  // Improve generic links for better accessibility
  function improveGenericLinks() {
    // Find links with generic text that need better context
    const genericLinkSelectors = [
      'a[href*="/collections"]:not([aria-label])',
      'a[href*="/products"]:not([aria-label])',
      'a[href*="/pages"]:not([aria-label])',
      'button:not([aria-label])'
    ];

    genericLinkSelectors.forEach(selector => {
      const links = document.querySelectorAll(selector);
      links.forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        
        // Add appropriate aria-labels for common generic text
        if (text === 'more' || text === 'read more' || text === 'learn more') {
          if (link.href && link.href.includes('/collections')) {
            link.setAttribute('aria-label', 'Browse available tours and experiences');
          } else if (link.href && link.href.includes('/products')) {
            link.setAttribute('aria-label', 'View product details');
          } else if (link.href && link.href.includes('/pages')) {
            link.setAttribute('aria-label', 'Learn more about our services');
          }
        }
        
        if (text === 'view all' || text === 'see all') {
          link.setAttribute('aria-label', 'View all available tours and experiences');
        }
        
        if (text === 'book now' || text === 'book') {
          link.setAttribute('aria-label', 'Book this travel experience');
        }
        
        if (text === 'contact' || text === 'contact us') {
          link.setAttribute('aria-label', 'Contact our travel experts');
        }
      });
    });
  }

  // Initialize accessibility fixes
  function initAccessibilityFixes() {
    // Run fixes immediately
    fixShopifyPreviewBarIframe();
    fixGenericIframes();
    enhanceFocusVisibility();
    improveGenericLinks();

    // Set up mutation observer to catch dynamically added iframes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if the added node is an iframe or contains iframes
              if (node.tagName === 'IFRAME') {
                setTimeout(() => {
                  fixShopifyPreviewBarIframe();
                  fixGenericIframes();
                }, 100);
              } else if (node.querySelector && node.querySelector('iframe')) {
                setTimeout(() => {
                  fixShopifyPreviewBarIframe();
                  fixGenericIframes();
                }, 100);
              }
              
              // Check for Shopify preview bar specifically
              if (node.id === 'PBarNextFrame') {
                fixShopifyPreviewBarIframe();
              }
            }
          });
        }
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Also run fixes after a delay to catch any delayed loading
    setTimeout(() => {
      fixShopifyPreviewBarIframe();
      fixGenericIframes();
    }, 2000);
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccessibilityFixes);
  } else {
    initAccessibilityFixes();
  }

  // Also run on window load to catch any late-loading content
  window.addEventListener('load', () => {
    setTimeout(() => {
      fixShopifyPreviewBarIframe();
      fixGenericIframes();
    }, 1000);
  });

})();
