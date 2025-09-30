jQuery(document).ready(function() {
	
	"use strict";

	// Smooth scroll for internal anchor links with dynamic offset
	$(document).on('click', 'a[href^="#"]', function(e){
		var target = $(this.getAttribute('href'));
		if(target.length){
			e.preventDefault();
			// Dynamic offset based on header height
			var headerHeight = $('.probootstrap-header-top').outerHeight() + $('.navbar').outerHeight();
			var offset = Math.max(70, headerHeight + 10); // Minimum 70px, or header height + 10px
			$('html, body').stop().animate({scrollTop: target.offset().top - offset}, 700, 'easeInOutCubic');
		}
	});

	// Highlight active nav item on scroll
	var sections = ['#home','#about','#why','#events','#opportunities','#community','#journey','#apply'];
	var $window = $(window);
	function setActive(){
		// Dynamic offset for active nav highlighting
		var headerHeight = $('.probootstrap-header-top').outerHeight() + $('.navbar').outerHeight();
		var offset = Math.max(80, headerHeight + 20);
		var scrollPos = $window.scrollTop() + offset;
		for(var i=0;i<sections.length;i++){
			var id = sections[i];
			var $el = $(id);
			if($el.length){
				var top = $el.offset().top;
				var bottom = top + $el.outerHeight();
				if(scrollPos >= top && scrollPos < bottom){
					$('.navbar-nav li').removeClass('active');
					$('.navbar-nav li a[href="'+id+'"]').parent().addClass('active');
				}
			}
		}
	}
	$window.on('scroll', setActive);
	setActive();

	// Enhanced form handler with validation and Formspree integration
	$('#recruitment-form').on('submit', function(e){
		e.preventDefault();
		
		console.log('🚀 FORM SUBMISSION STARTED');
		
		var form = $(this);
		var submitBtn = form.find('button[type="submit"]');
		var originalText = submitBtn.text();
		
		console.log('📝 Form found:', form.length > 0);
		console.log('🔘 Submit button found:', submitBtn.length > 0);
		
		// Basic validation
		var isValid = true;
		var errors = [];
		
		// Clear previous errors
		form.find('.form-group').removeClass('has-error');
		form.find('.error-message').remove();
		
		// Validate required fields
		form.find('input[required], textarea[required]').each(function(){
			var field = $(this);
			var value = field.val().trim();
			
			if(!value){
				isValid = false;
				field.closest('.form-group').addClass('has-error');
				field.after('<div class="error-message text-danger">This field is required</div>');
			}
			
			// Email validation
			if(field.attr('type') === 'email' && value){
				var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if(!emailRegex.test(value)){
					isValid = false;
					field.closest('.form-group').addClass('has-error');
					field.after('<div class="error-message text-danger">Please enter a valid email address</div>');
				}
			}
			
			// Phone validation
			if(field.attr('type') === 'tel' && value){
				var phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
				if(!phoneRegex.test(value)){
					isValid = false;
					field.closest('.form-group').addClass('has-error');
					field.after('<div class="error-message text-danger">Please enter a valid phone number</div>');
				}
			}
			
			// Age validation
			if(field.attr('name') === 'age' && value){
				var age = parseInt(value);
				if(isNaN(age) || age < 16 || age > 30){
					isValid = false;
					field.closest('.form-group').addClass('has-error');
					field.after('<div class="error-message text-danger">Age must be between 16 and 30 years old</div>');
				}
			}
		});
		
		if(!isValid){
			// Scroll to first error
			var firstError = form.find('.has-error').first();
			if(firstError.length){
				$('html, body').animate({
					scrollTop: firstError.offset().top - 100
				}, 500);
			}
			return;
		}
		
		// Show loading state
		submitBtn.prop('disabled', true).html('<i class="icon-spinner2"></i> Submitting...');
		
		// Prepare form data for Formspree and local storage
		var formData = {
			name: form.find('#name').val().trim(),
			email: form.find('#email').val().trim(),
			phone: form.find('#phone').val().trim(),
			university: form.find('#university').val().trim(),
			age: form.find('#age').val().trim(),
			level: form.find('#level').val().trim(),
			motivation: form.find('#motivation').val().trim(),
			freeSpace: form.find('#free-space').val().trim()
		};
		
		console.log('📊 Form data prepared:', formData);
		
		// Submit application data to API
		console.log('🔄 Calling storeApplicationData...');
		const result = await storeApplicationData(formData);
		
		console.log('📡 API result:', result);
		
		if (result.success) {
			// Success state
			submitBtn.removeClass('btn-aiesec').addClass('btn-success').html('<i class="icon-checkmark"></i> Success!');
			
			// Show success message
			form.before('<div class="alert alert-success" role="alert"><i class="icon-checkmark"></i> Merci ! Votre candidature a été enregistrée avec succès.</div>');
		} else {
			// Error state
			submitBtn.removeClass('btn-aiesec').addClass('btn-danger').html('<i class="icon-cross"></i> Erreur');
			
			// Show error message
			form.before('<div class="alert alert-danger" role="alert"><i class="icon-cross"></i> ' + result.message + '</div>');
			
			// Reset button after 3 seconds
			setTimeout(() => {
				submitBtn.removeClass('btn-danger').addClass('btn-aiesec').html('<i class="icon-paper-plane"></i> Submit Application');
			}, 3000);
		}
		
		// Track successful submission
		if (typeof gtag !== 'undefined') {
			gtag('event', 'form_submit_success', {
				'form_name': 'recruitment_form',
				'page_path': window.location.pathname
			});
		}
		if (typeof fbq !== 'undefined') {
			fbq('track', 'CompleteRegistration', {
				'content_name': 'AIESEC Application'
			});
		}
		
		// Reset form after delay
		setTimeout(function(){
			form[0].reset();
			submitBtn.prop('disabled', false).removeClass('btn-success').addClass('btn-aiesec').text(originalText);
			form.prev('.alert').fadeOut();
			
			// Optional: Redirect to thank you page or show dashboard link
			// window.location.href = '/thank-you.html';
		}, 3000);
	});
	
	// Function to submit application data to Google Sheets API
	async function storeApplicationData(formData) {
		try {
			// Votre URL Apps Script
			const API_URL = 'https://script.google.com/macros/s/AKfycbxo3a4Monbjv0Pg_UnCSKNNH54aFQjOHSc2IEEreyMsXJBecTQEy4s83IRWdFblPD3g/exec';
			
			// Prepare data for API
			const applicationData = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				university: formData.university,
				age: parseInt(formData.age),
				level: formData.level,
				motivation: formData.motivation,
				freeSpace: formData.freeSpace,
				device: getDeviceInfo()
			};

			console.log('🚀 Sending data to Google Sheets:', applicationData);

			// Submit to Google Sheets API
			const response = await fetch(API_URL, {
				method: 'POST',
				mode: 'no-cors', // Important pour Google Apps Script
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(applicationData)
			});

			console.log('📡 Response received:', response);

			// Pour no-cors, on ne peut pas lire la réponse JSON
			// Mais on considère que c'est un succès si pas d'erreur
			console.log('✅ Application submitted successfully to Google Sheets');
			return { success: true, data: applicationData };

		} catch (error) {
			console.error('❌ Network Error:', error);
			return { success: false, message: 'Erreur de connexion. Veuillez réessayer.' };
		}
	}

	// Get device information
	function getDeviceInfo() {
		var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		return {
			type: isMobile ? 'mobile' : 'desktop',
			userAgent: navigator.userAgent,
			timestamp: new Date().toISOString()
		};
	}

	// No more share messages - data goes directly to admin dashboard

	// Load applications from URL or localStorage
	function loadApplicationsFromURL() {
		try {
			// Check if there's data in URL
			var urlParams = new URLSearchParams(window.location.search);
			var encodedData = urlParams.get('data');
			
			if (encodedData) {
				// Decode data from URL
				var sharedApps = JSON.parse(atob(encodedData));
				console.log('Loaded applications from URL:', sharedApps.length);
				
				// Store in localStorage for future use
				localStorage.setItem('aiesec_shared_applications', JSON.stringify(sharedApps));
				
				return sharedApps;
			} else {
				// Load from localStorage
				var localApps = JSON.parse(localStorage.getItem('aiesecApplications') || '[]');
				var sharedApps = JSON.parse(localStorage.getItem('aiesec_shared_applications') || '[]');
				
				// Merge and deduplicate
				var allApps = [...localApps, ...sharedApps];
				var uniqueApps = [];
				var seenIds = new Set();
				
				allApps.forEach(function(app) {
					if (!seenIds.has(app.id)) {
						seenIds.add(app.id);
						uniqueApps.push(app);
					}
				});
				
				// Sort by date
				uniqueApps.sort(function(a, b) {
					return new Date(b.date) - new Date(a.date);
				});
				
				console.log('Loaded applications from localStorage:', uniqueApps.length);
				return uniqueApps;
			}
		} catch (error) {
			console.error('Error loading applications:', error);
			return JSON.parse(localStorage.getItem('aiesecApplications') || '[]');
		}
	}

	// Analytics tracking for Apply button clicks
	$('.btn-aiesec, .floating-apply a').on('click', function() {
		var buttonText = $(this).text().trim();
		var buttonLocation = $(this).closest('.floating-apply').length ? 'floating' : 'inline';
		
		// Google Analytics 4 event tracking (if GA4 is implemented)
		if (typeof gtag !== 'undefined') {
			gtag('event', 'apply_button_click', {
				'button_text': buttonText,
				'button_location': buttonLocation,
				'page_path': window.location.pathname
			});
		}
		
		// Facebook Pixel tracking (if implemented)
		if (typeof fbq !== 'undefined') {
			fbq('track', 'Lead', {
				'content_name': 'Apply Button Click',
				'content_category': 'Recruitment'
			});
		}
		
		// Console log for development
		console.log('Apply button clicked:', {
			text: buttonText,
			location: buttonLocation,
			page: window.location.pathname
		});
	});

	// Performance optimizations
	// Lazy loading for images
	function initLazyLoading() {
		if ('IntersectionObserver' in window) {
			const imageObserver = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const img = entry.target;
						if (img.dataset.bg) {
							img.style.backgroundImage = `url(${img.dataset.bg})`;
							img.classList.remove('lazy-load');
							img.classList.add('lazy-loaded');
						}
						observer.unobserve(img);
		}
	});

});

			document.querySelectorAll('.lazy-load').forEach(img => {
				imageObserver.observe(img);
			});
		} else {
			// Fallback for older browsers
			document.querySelectorAll('.lazy-load').forEach(img => {
				if (img.dataset.bg) {
					img.style.backgroundImage = `url(${img.dataset.bg})`;
					img.classList.remove('lazy-load');
					img.classList.add('lazy-loaded');
				}
			});
		}
	}

	// Initialize lazy loading
	initLazyLoading();

	// Modern navbar scroll effect
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		if (scroll >= 50) {
			$('.navbar-default').addClass('scrolled');
		} else {
			$('.navbar-default').removeClass('scrolled');
		}
	});

	// Error handling and fallbacks
	window.addEventListener('error', function(e) {
		console.error('JavaScript error:', e.error);
		// Could send error to analytics here
		if (typeof gtag !== 'undefined') {
			gtag('event', 'exception', {
				'description': e.error.message,
				'fatal': false
			});
		}
	});

	// Service Worker registration for PWA features
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function() {
			navigator.serviceWorker.register('/sw.js')
				.then(function(registration) {
					console.log('ServiceWorker registration successful');
				})
				.catch(function(err) {
					console.log('ServiceWorker registration failed');
				});
		});
	}

	// Performance monitoring
	if ('performance' in window) {
		window.addEventListener('load', function() {
			setTimeout(function() {
				const perfData = performance.getEntriesByType('navigation')[0];
				if (perfData) {
					const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
					console.log('Page load time:', loadTime + 'ms');
					
					// Send to analytics
					if (typeof gtag !== 'undefined') {
						gtag('event', 'timing_complete', {
							'name': 'load',
							'value': Math.round(loadTime)
						});
					}
				}
			}, 0);
		});
	}

});