(function() {
  if (!window.Shopify || !window.Shopify.designMode) return;
  
  document.addEventListener('DOMContentLoaded', function() {
    if (window.location.href.includes('/products/')) {
      addTourInfoFields();
    }
  });
  
  function addTourInfoFields() {
    if (document.querySelector('.tour-info-helper')) return;
    
    const tourInfoHelper = document.createElement('div');
    tourInfoHelper.className = 'tour-info-helper';
    tourInfoHelper.innerHTML = `
      <div style="margin: 20px 0; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #f9f9f9;">
        <h3 style="margin-top: 0; color: #333; font-size: 18px;">Tour Product Information</h3>
        <p style="margin-bottom: 15px; color: #666;">Add special information for this tour product.</p>
        
        <div style="margin-bottom: 15px;">
          <label for="tour-destination" style="display: block; margin-bottom: 5px; font-weight: 500;">Destination</label>
          <input type="text" id="tour-destination" placeholder="e.g., Paris, Tokyo" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
        
        <div style="display: flex; gap: 15px; margin-bottom: 15px;">
          <div style="flex: 1;">
            <label for="tour-max-days" style="display: block; margin-bottom: 5px; font-weight: 500;">Maximum Days</label>
            <input type="number" id="tour-max-days" min="1" value="14" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
          </div>
          
          <div style="flex: 1;">
            <label for="tour-max-persons" style="display: block; margin-bottom: 5px; font-weight: 500;">Maximum Persons</label>
            <input type="number" id="tour-max-persons" min="1" value="10" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
          </div>
        </div>
        
        <button type="button" id="apply-tour-info" style="background: #008060; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; font-weight: 500;">
          Save Tour Information
        </button>
        
        <p style="margin-top: 15px; font-size: 0.85em; color: #666;">
          This will add special tags to your product that store tour information:<br>
          - <code>destination:Paris</code><br>
          - <code>max-days:14</code><br>
          - <code>max-persons:10</code>
        </p>
      </div>
    `;
    
    const productDescription = document.querySelector('.product-description');
    if (productDescription) {
      productDescription.parentNode.insertBefore(tourInfoHelper, productDescription);
      
      document.getElementById('apply-tour-info').addEventListener('click', function() {
        const destination = document.getElementById('tour-destination').value.trim();
        const maxDays = document.getElementById('tour-max-days').value.trim();
        const maxPersons = document.getElementById('tour-max-persons').value.trim();
        
        const tagsInput = document.querySelector('input[name="product[tags]"]');
        if (tagsInput) {
          const existingTags = tagsInput.value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => 
              !tag.startsWith('destination:') && 
              !tag.startsWith('max-days:') && 
              !tag.startsWith('max-persons:')
            );
          
          if (destination) existingTags.push(`destination:${destination}`);
          if (maxDays) existingTags.push(`max-days:${maxDays}`);
          if (maxPersons) existingTags.push(`max-persons:${maxPersons}`);
          
          tagsInput.value = existingTags.join(', ');
          
          alert('Tour information saved! Don\'t forget to save your product.');
        } else {
          alert('Could not find tags input. Please add tags manually.');
        }
      });
    }
  }
})();