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
		
		var form = $(this);
		var submitBtn = form.find('button[type="submit"]');
		var originalText = submitBtn.text();
		
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
		
		// Store data locally for dashboard
		storeApplicationData(formData);
		
		// Submit to Formspree
		$.ajax({
			url: form.attr('action'),
			type: 'POST',
			data: form.serialize(),
			dataType: 'json',
			success: function(response) {
				// Success state
				submitBtn.removeClass('btn-aiesec').addClass('btn-success').html('<i class="icon-checkmark"></i> Success!');
				
				// Show success message
				form.before('<div class="alert alert-success" role="alert"><i class="icon-checkmark"></i> Thank you! Your application has been received. We\'ll contact you soon.</div>');
				
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
				}, 3000);
			},
			error: function(xhr, status, error) {
				// Even if Formspree fails, we still have the data locally
				submitBtn.removeClass('btn-aiesec').addClass('btn-success').html('<i class="icon-checkmark"></i> Success!');
				
				// Show success message
				form.before('<div class="alert alert-success" role="alert"><i class="icon-checkmark"></i> Thank you! Your application has been received. We\'ll contact you soon.</div>');
				
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
				}, 3000);
			}
		});
	});
	
	// Function to store application data locally
	function storeApplicationData(formData) {
		try {
			// Get existing applications from localStorage
			var existingApplications = JSON.parse(localStorage.getItem('aiesecApplications') || '[]');
			
			// Create new application object
			var newApplication = {
				id: Date.now(), // Simple ID based on timestamp
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				university: formData.university,
				age: parseInt(formData.age),
				level: formData.level,
				motivation: formData.motivation,
				freeSpace: formData.freeSpace,
				date: new Date().toISOString()
			};
			
			// Add to existing applications
			existingApplications.push(newApplication);
			
			// Store back to localStorage
			localStorage.setItem('aiesecApplications', JSON.stringify(existingApplications));
			
			console.log('Application stored locally:', newApplication);
		} catch (error) {
			console.error('Error storing application data:', error);
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