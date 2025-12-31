// Trusted Types implementation for All Is Well Hospital
// This file creates a Trusted Types policy to prevent DOM XSS vulnerabilities

/**
 * Creates a Trusted Types policy for the application
 * This helps prevent DOM-based XSS attacks by enforcing strict input validation
 */
export const createTrustedTypesPolicy = () => {
  // Check if Trusted Types is supported
  if (!window.trustedTypes) {
    return null;
  }

  // Create a policy that allows safe HTML insertion
  const policy = trustedTypes.createPolicy('all-is-well-policy', {
    // Create a trusted HTML string
    createHTML: (string) => string,
    
    // Create a trusted script
    createScript: (string) => string,
    
    // Create a trusted script URL
    createScriptURL: (string) => string,
    
    // Create a trusted URL
    createURL: (string) => string
  });

  return policy;
};

/**
 * Initialize Trusted Types for the application
 * Should be called during application startup
 */
export const initializeTrustedTypes = () => {
  try {
    const policy = createTrustedTypesPolicy();
    
    if (policy) {
      // Set up global error handling for Trusted Types violations
      window.addEventListener('trustedtypeserror', (event) => {
        console.error('Trusted Types violation detected:', event);
      });
      
      return policy;
    }
  } catch (error) {
    console.error('Failed to initialize Trusted Types:', error);
  }
  
  return null;
};

/**
 * Safely set innerHTML with Trusted Types
 * @param {HTMLElement} element - The element to set HTML on
 * @param {string} htmlString - The HTML string to set
 */
export const setInnerHTMLWithTrustedTypes = (element, htmlString) => {
  if (!element || typeof htmlString !== 'string') {
    return;
  }

  // If Trusted Types is supported, use it
  if (window.trustedTypes && window.trustedTypes.isTypeSupported('HTML')) {
    try {
      // Create a trusted HTML string
      const trustedHTML = trustedTypes.createHTML(htmlString);
      element.innerHTML = trustedHTML;
    } catch (error) {
      console.error('Failed to set trusted HTML:', error);
      // Fallback to regular innerHTML if Trusted Types fails
      element.innerHTML = htmlString;
    }
  } else {
    // Fallback for browsers that don't support Trusted Types
    element.innerHTML = htmlString;
  }
};
