<?php
    header('Content-Type: application/json');
    
    $data = json_decode(file_get_contents("php://input"), true);
    $otp = $data['otp'];

    session_start();

    // Verify OTP
    if ($otp == $_SESSION['otp']) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
?>
