<?php
    header('Content-Type: application/json');
    
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'];

    // Generate OTP
    $otp = rand(100000, 999999);

    // Store the OTP in session or database
    session_start();
    $_SESSION['otp'] = $otp;

    // Send OTP to the user's email (use mail() or a third-party email API)
    $subject = "Your OTP for Registration";
    $message = "Your OTP is $otp";
    $headers = "From: no-reply@sastoshares.com";

    if (mail($email, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
?>
