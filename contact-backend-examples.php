<?php
/**
 * AIESEC Carthage - Contact Form Backend Examples
 * 
 * This file contains example backend implementations for the recruitment form.
 * Choose the method that best fits your hosting environment.
 */

// ============================================================================
// METHOD 1: PHP Mail (Simple - Works on most shared hosting)
// ============================================================================

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['form_type']) && $_POST['form_type'] === 'recruitment') {
    
    // Sanitize and validate input
    $name = filter_var($_POST['name'] ?? '', FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST['phone'] ?? '', FILTER_SANITIZE_STRING);
    $university = filter_var($_POST['university'] ?? '', FILTER_SANITIZE_STRING);
    $motivation = filter_var($_POST['motivation'] ?? '', FILTER_SANITIZE_STRING);
    
    // Validate required fields
    $errors = [];
    if (empty($name)) $errors[] = 'Name is required';
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required';
    if (empty($phone)) $errors[] = 'Phone is required';
    if (empty($university)) $errors[] = 'University is required';
    if (empty($motivation)) $errors[] = 'Motivation is required';
    
    if (empty($errors)) {
        // Email configuration
        $to = 'carthage@aiesec.org';
        $subject = 'New AIESEC Carthage Application - ' . $name;
        
        $message = "
        New Application Received:
        
        Name: $name
        Email: $email
        Phone: $phone
        University: $university
        
        Motivation:
        $motivation
        
        Submitted: " . date('Y-m-d H:i:s') . "
        IP: " . $_SERVER['REMOTE_ADDR'] . "
        ";
        
        $headers = [
            'From: noreply@aiesec-carthage.org',
            'Reply-To: ' . $email,
            'X-Mailer: PHP/' . phpversion(),
            'Content-Type: text/plain; charset=UTF-8'
        ];
        
        if (mail($to, $subject, $message, implode("\r\n", $headers))) {
            // Send confirmation email to applicant
            $confirmation_subject = 'Application Received - AIESEC Carthage';
            $confirmation_message = "
            Dear $name,
            
            Thank you for your interest in joining AIESEC Carthage!
            
            We have received your application and will review it carefully. 
            Our team will contact you within 3-5 business days.
            
            Best regards,
            AIESEC Carthage Team
            
            ---
            This is an automated message. Please do not reply to this email.
            ";
            
            mail($email, $confirmation_subject, $confirmation_message, implode("\r\n", $headers));
            
            echo json_encode(['success' => true, 'message' => 'Application submitted successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to send application. Please try again.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Validation errors: ' . implode(', ', $errors)]);
    }
    exit;
}

// ============================================================================
// METHOD 2: Database Storage (More robust)
// ============================================================================

/*
// Uncomment and configure for database storage

$host = 'localhost';
$dbname = 'aiesec_carthage';
$username = 'your_username';
$password = 'your_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['form_type']) && $_POST['form_type'] === 'recruitment') {
        
        $stmt = $pdo->prepare("
            INSERT INTO applications (name, email, phone, university, motivation, submitted_at, ip_address) 
            VALUES (?, ?, ?, ?, ?, NOW(), ?)
        ");
        
        $stmt->execute([
            $name,
            $email, 
            $phone,
            $university,
            $motivation,
            $_SERVER['REMOTE_ADDR']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Application stored successfully!']);
    }
    
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
*/

// ============================================================================
// METHOD 3: Third-party Service Integration
// ============================================================================

/*
// Example: Formspree integration
// 1. Sign up at https://formspree.io/
// 2. Get your form endpoint
// 3. Update the form action in HTML

// Example: Netlify Forms
// 1. Add netlify attribute to form: <form netlify>
// 2. Deploy to Netlify
// 3. Forms will be automatically handled

// Example: EmailJS (Client-side)
// 1. Sign up at https://www.emailjs.com/
// 2. Add EmailJS script to HTML
// 3. Use JavaScript to send emails directly from browser
*/

?>

<!-- 
SETUP INSTRUCTIONS:

1. PHP MAIL METHOD:
   - Upload this file to your web server
   - Update the email addresses in the script
   - Change the form action in index.html to point to this file
   - Test with a real form submission

2. DATABASE METHOD:
   - Create a MySQL database
   - Create the applications table:
     CREATE TABLE applications (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         phone VARCHAR(50) NOT NULL,
         university VARCHAR(255) NOT NULL,
         motivation TEXT NOT NULL,
         submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         ip_address VARCHAR(45)
     );
   - Update database credentials in the script
   - Uncomment the database code

3. THIRD-PARTY SERVICES:
   - Choose a service (Formspree, Netlify, EmailJS, etc.)
   - Follow their setup instructions
   - Update the form configuration accordingly

SECURITY NOTES:
- Always validate and sanitize input
- Use HTTPS in production
- Consider rate limiting to prevent spam
- Store sensitive data securely
- Regular backups of application data
-->


