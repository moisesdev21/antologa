import React, { useState } from 'react';

import { User, Briefcase, ArrowRight, ArrowLeft, Mail } from 'lucide-react';

/* ============================================
   GOOGLE FONTS IMPORT
   ============================================
   Loads Inter and Nunito fonts from Google Fonts
   - Inter: Used for headings, titles, and buttons
   - Nunito: Used for body text, labels, and inputs
   ============================================ */
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap';
fontLink.rel = 'stylesheet';
if (!document.querySelector(`link[href="${fontLink.href}"]`)) {
  document.head.appendChild(fontLink);
}

/* ============================================
   DECORATIVE DOTS CONFIGURATION
   ============================================
   Configure positions and styles for animated dots on each step
   
   Properties for each dot:
   - size: Tailwind class for width/height (e.g., 'w-2 h-2')
   - color: Tailwind background color (e.g., 'bg-teal-600')
   - rounded: Border radius style (e.g., 'rounded-full', 'rounded-sm')
   - x, y: Position coordinates in pixels
   - rotation: Rotation angle in degrees  
   - opacity: Transparency level (0-1)
   
   To add dots for a new step:
   1. Add a new key with your step name
   2. Add an array of dot objects with the properties above
   ============================================ */
const decorativeDotsConfig = {
  'account-type': [
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-lg', x: 811, y: 378, rotation: -20, opacity: 1 },
    { size: 'w-1.5 h-1.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 501, y: 127, rotation: -20, opacity: 1 },
    { size: 'w-3.5 h-3.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 303, y: 427, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-sm', x: 364, y: 272, rotation: -165, opacity: 0.5 },
    { size: 'w-2.5 h-2.5', color: 'bg-teal-600', rounded: 'rounded-lg', x: 177, y: 712, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-sm', x: 616, y: 1068, rotation: -20, opacity: 1 },
    { size: 'w-5 h-5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 896, y: 643, rotation: -20, opacity: 1 },
    { size: 'w-3 h-3', color: 'bg-teal-600', rounded: 'rounded-sm', x: 809, y: 862, rotation: -165, opacity: 0.5 }
  ],
  'individual-register': [
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-lg', x: 1411, y: 378, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-sm', x: 1222, y: 332, rotation: -20, opacity: 1 },
    { size: 'w-1.5 h-1.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 1101, y: 127, rotation: -20, opacity: 1 },
    { size: 'w-3.5 h-3.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 903, y: 427, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-sm', x: 964, y: 272, rotation: -165, opacity: 0.5 },
    { size: 'w-2.5 h-2.5', color: 'bg-teal-600', rounded: 'rounded-lg', x: 977, y: 712, rotation: -20, opacity: 1 },
    { size: 'w-5 h-5', color: 'bg-teal-600', rounded: 'rounded-lg', x: 1061, y: 942, rotation: -20, opacity: 1 },
    { size: 'w-3 h-3', color: 'bg-teal-600', rounded: 'rounded-sm', x: 1044, y: 777, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-sm', x: 1216, y: 1068, rotation: -20, opacity: 1 },
    { size: 'w-5 h-5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 1496, y: 643, rotation: -20, opacity: 1 },
    { size: 'w-3 h-3', color: 'bg-teal-600', rounded: 'rounded-sm', x: 1409, y: 862, rotation: -165, opacity: 0.5 }
  ],
  'password-creation': [
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 320, y: 100, rotation: 0, opacity: 1 },
    { size: 'w-2.5 h-2.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 180, y: 220, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 450, y: 180, rotation: 0, opacity: 1 },
    { size: 'w-3 h-3', color: 'bg-teal-600', rounded: 'rounded-sm', x: 550, y: 320, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 150, y: 400, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 380, y: 480, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 280, y: 580, rotation: 0, opacity: 1 },
    { size: 'w-2.5 h-2.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 500, y: 520, rotation: -20, opacity: 1 }
  ],
  'email-verification': [
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 320, y: 100, rotation: 0, opacity: 1 },
    { size: 'w-2.5 h-2.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 180, y: 220, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 450, y: 180, rotation: 0, opacity: 1 },
    { size: 'w-3 h-3', color: 'bg-teal-600', rounded: 'rounded-sm', x: 550, y: 320, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 150, y: 400, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 380, y: 480, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 280, y: 580, rotation: 0, opacity: 1 },
    { size: 'w-2.5 h-2.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 500, y: 520, rotation: -20, opacity: 1 }
  ],
  'residency-info': [
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 310, y: 76, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 220, y: 160, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 380, y: 132, rotation: 0, opacity: 1 },
    { size: 'w-2.5 h-2.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 190, y: 263, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 502, y: 232, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 100, y: 436, rotation: 0, opacity: 1 },
    { size: 'w-3 h-3', color: 'bg-teal-600', rounded: 'rounded-sm', x: 540, y: 390, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 500, y: 536, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 375, y: 656, rotation: 0, opacity: 1 }
  ],
  'membership-plan': [
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 310, y: 78, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 220, y: 160, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 380, y: 133, rotation: 0, opacity: 1 },
    { size: 'w-2.5 h-2.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 190, y: 263, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 502, y: 232, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 373, y: 657, rotation: 0, opacity: 1 }
  ],
  'payment-method': [
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 300, y: 90, rotation: 0, opacity: 1 },
    { size: 'w-2.5 h-2.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 180, y: 200, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 450, y: 160, rotation: 0, opacity: 1 },
    { size: 'w-3 h-3', color: 'bg-teal-600', rounded: 'rounded-sm', x: 550, y: 300, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 150, y: 420, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 380, y: 500, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 280, y: 600, rotation: 0, opacity: 1 }
  ],
  'profile-picture': [
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 300, y: 100, rotation: 0, opacity: 1 },
    { size: 'w-2.5 h-2.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 180, y: 220, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 450, y: 180, rotation: 0, opacity: 1 },
    { size: 'w-3 h-3', color: 'bg-teal-600', rounded: 'rounded-sm', x: 550, y: 320, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 150, y: 450, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 380, y: 520, rotation: 0, opacity: 1 }
  ],
  'language-prefs': [
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 310, y: 85, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 220, y: 165, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 380, y: 140, rotation: 0, opacity: 1 },
    { size: 'w-2.5 h-2.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 190, y: 270, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 502, y: 240, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 100, y: 445, rotation: 0, opacity: 1 },
    { size: 'w-3 h-3', color: 'bg-teal-600', rounded: 'rounded-sm', x: 540, y: 400, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 500, y: 545, rotation: 0, opacity: 1 }
  ],
  'interests': [
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 300, y: 75, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 220, y: 155, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 380, y: 125, rotation: 0, opacity: 1 },
    { size: 'w-2.5 h-2.5', color: 'bg-teal-600', rounded: 'rounded-sm', x: 190, y: 255, rotation: -20, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 502, y: 225, rotation: 0, opacity: 1 },
    { size: 'w-2 h-2', color: 'bg-teal-600', rounded: 'rounded-full', x: 100, y: 425, rotation: 0, opacity: 1 },
    { size: 'w-3 h-3', color: 'bg-teal-600', rounded: 'rounded-sm', x: 540, y: 380, rotation: -20, opacity: 1 }
  ]
};

/* ============================================
   DECORATIVE DOTS COMPONENT
   ============================================
   Reusable component that renders animated dots
   
   Props:
   - step: Current step name (must match key in decorativeDotsConfig)
   - mousePosition: Object with x and y coordinates of mouse
   
   Customization:
   - Change 'strength' value (0-1) to adjust how much dots follow mouse
     - 0 = no movement
     - 0.05 = subtle movement (current)
     - 1 = full movement (follows cursor exactly)
   - Modify transition duration in className for speed
   ============================================ */
const DecorativeDots = ({ step, mousePosition }) => {
  const dots = decorativeDotsConfig[step] || [];
  
  const calculateDotPosition = (originalX, originalY) => {
    const strength = 0.05; // Adjust mouse tracking strength here
    const deltaX = (mousePosition.x - originalX) * strength;
    const deltaY = (mousePosition.y - originalY) * strength;
    return {
      left: `${originalX + deltaX}px`,
      top: `${originalY + deltaY}px`
    };
  };

  return (
    <>
      {dots.map((dot, index) => (
        <div
          key={index}
          className={`absolute ${dot.size} ${dot.color} ${dot.rounded} transition-all duration-300 ease-out`}
          style={{
            ...calculateDotPosition(dot.x, dot.y),
            transform: `rotate(${dot.rotation}deg)`,
            opacity: dot.opacity
          }}
        />
      ))}
    </>
  );
};

/* ============================================
   MAIN ONBOARDING COMPONENT
   ============================================ */

const Onboarding = () => {
  /* ============================================
     STATE MANAGEMENT
     ============================================
     All state variables for the onboarding flow
     
     Customization Guide:
     - currentStep: Add new step names here when creating new steps
     - formData: Add new fields as needed for your forms
     - otp: Change array length for different OTP digit counts
     - resendTimer: Change initial value to adjust timer duration (in seconds)
     ============================================ */
  
  // Current step in the onboarding flow
  const [currentStep, setCurrentStep] = useState('account-type'); 
  // Flow: 'account-type' → 'individual-register' → 'password-creation' → 'email-verification' → 'residency-info' → 'language-prefs' → 'interests' → 'membership-plan' → 'payment-method' (if paid plan) → 'profile-picture'
  
  // Selected account type (individual, business, tour-guide, travel-agency)
  const [selectedAccountType, setSelectedAccountType] = useState('individual');
  
  // Form data for all registration fields
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    countryCode: '+507', // Default to Panama
    address: '',
    nationality: ''
    // Add more fields here as needed
  });
  
  // OTP verification code (6 digits)
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Change array length for different digit count
  
  // Form validation errors
  const [errors, setErrors] = useState({});
  
  // Mouse position for animated dots
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Resend code timer and state
  const [resendTimer, setResendTimer] = useState(60); // Initial timer in seconds
  const [canResend, setCanResend] = useState(false);
  
  // Membership plan selection
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'yearly'
  const [selectedPlan, setSelectedPlan] = useState('basic'); // 'free', 'basic', or 'pro'
  
  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'paypal'
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: ''
  });
  
  // Profile picture upload
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Language preferences
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  // Interests/Activities
  const [selectedInterests, setSelectedInterests] = useState([]);

  /* ============================================
     MOUSE TRACKING FOR ANIMATED DOTS
     ============================================
     Updates mouse position for dot animations
     ============================================ */
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  /* ============================================
     RESEND CODE TIMER EFFECT
     ============================================
     Countdown timer for email verification resend
     
     Customization:
     - Adjust resendTimer initial value in state for different durations
     - Timer format is MM:SS (minutes:seconds)
     ============================================ */
  React.useEffect(() => {
    let interval;
    if (currentStep === 'email-verification' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentStep, resendTimer]);

  const accountTypes = [
    {
      id: 'individual',
      icon: User,
      title: 'Traveler',
      description: 'Discover Panama\'s hidden gems and plan your perfect adventure',
      disabled: false
    },
    {
      id: 'business',
      icon: Briefcase,
      title: 'Business',
      description: 'Connect with travelers exploring Panama',
      disabled: false
    },
    {
      id: 'tour-guide',
      icon: Briefcase,
      title: 'Tour Guide',
      description: 'Share your expertise and grow your guiding business',
      disabled: false
    },
    {
      id: 'travel-agency',
      icon: Briefcase,
      title: 'Travel / Tour Agency',
      description: 'Showcase your services and reach more adventure seekers',
      disabled: false
    }
  ];

  const handleSelectType = (type) => {
    if (!type.disabled) {
      setSelectedAccountType(type.id);
      setErrors({}); // Clear any previous errors
      if (type.id === 'individual') {
        setCurrentStep('individual-register');
      } else {
        console.log('Selected:', type.id, '- Form not yet implemented');
      }
    }
  };

  /* ============================================
     FORM INPUT HANDLER
     ============================================
     Handles changes to all form inputs and clears errors
     
     Usage: Add this to any input with onChange={handleInputChange}
     ============================================ */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /* ============================================
     PROFILE PICTURE UPLOAD HANDLERS
     ============================================
     Handles file upload, drag & drop, and preview
     ============================================ */
  const handleFileSelect = (file) => {
    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setErrors({ profilePicture: 'Please upload a JPG or PNG image' });
      return;
    }

    // Validate file size (10MB = 10 * 1024 * 1024 bytes)
    if (file.size > 10 * 1024 * 1024) {
      setErrors({ profilePicture: 'File size must be less than 10MB' });
      return;
    }

    setProfilePicture(file);
    setErrors({});

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setProfilePicture(null);
    setImagePreview(null);
  };

  /* ============================================
     OTP INPUT HANDLERS
     ============================================
     Handles OTP input, navigation, and auto-submit
     
     Features:
     - Only accepts numeric input
     - Auto-focuses next field
     - Auto-submits when complete
     - Supports paste for entire code
     - Backspace navigation
     
     Customization:
     - Change otp array length in state for different digit counts
     - Modify auto-submit behavior in handleOtpChange
     ============================================ */
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Auto-submit when all digits are filled (change index === 5 if using different digit count)
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace navigation
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6); // Change 6 to your digit count
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6); // Change 6 to your digit count
    setOtp(newOtp);

    // Focus last filled input or submit if complete
    if (pastedData.length === 6) { // Change 6 to your digit count
      handleVerifyOtp(pastedData);
    } else {
      const nextInput = document.getElementById(`otp-${pastedData.length}`);
      if (nextInput) nextInput.focus();
    }
  };

  /* ============================================
     OTP VERIFICATION HANDLER
     ============================================
     Called when OTP is complete (auto-submit or manual)
     
     Customization:
     - Add your API call here to verify the OTP code
     - Navigate to next step on success
     - Show error message on failure
     ============================================ */
  const handleVerifyOtp = (otpCode) => {
    console.log('Verifying OTP:', otpCode);
    // TODO: Add your OTP verification API call here
    // On success, navigate to residency info
    setCurrentStep('residency-info');
    // Example:
    // try {
    //   await verifyOtpApi(formData.email, otpCode);
    //   setCurrentStep('residency-info');
    // } catch (error) {
    //   setErrors({ otp: 'Invalid code. Please try again.' });
    // }
  };

  /* ============================================
     RESEND CODE HANDLER
     ============================================
     Resends verification code to email
     
     Customization:
     - Add your API call to resend the code
     - Adjust timer reset value if needed
     ============================================ */
  const handleResendCode = () => {
    if (!canResend) return;
    console.log('Resending code to:', formData.email);
    setResendTimer(60); // Reset timer (change value for different duration)
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    // TODO: Add your resend code API call here
    // Example:
    // await resendVerificationCode(formData.email);
  };

  /* ============================================
     VALIDATION FUNCTIONS
     ============================================
     Validate form inputs before submission
     
     Customization:
     - Add/remove validation rules as needed
     - Modify error messages
     - Add custom validation logic for your use case
     ============================================ */
  
  // Personal Information Validation (Step 2)
  const validatePersonalInfo = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    return newErrors;
  };

  // Password Validation (Step 3)
  const validatePassword = () => {
    const newErrors = {};
    
    // Password validation with strength requirements
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      // Minimum length check
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      } 
      // Uppercase letter check
      else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } 
      // Lowercase letter check
      else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      } 
      // Number check
      else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one number';
      } 
      // Special character check
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one special character';
      }
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  // Residency Info Validation (Step 5)
  const validateResidencyInfo = () => {
    const newErrors = {};
    
    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{7,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    // Nationality validation
    if (!formData.nationality.trim()) {
      newErrors.nationality = 'Nationality is required';
    }
    
    return newErrors;
  };

  // Payment Info Validation (Step 7)
  const validatePaymentInfo = () => {
    if (paymentMethod === 'paypal') {
      return {}; // No validation needed for PayPal (handled by PayPal)
    }

    const newErrors = {};
    
    // Card number validation
    if (!paymentData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    // Card name validation
    if (!paymentData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    
    // Expiry date validation
    if (!paymentData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = 'Please enter date in MM/YY format';
    }
    
    // CVV validation
    if (!paymentData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    // Billing address validation
    if (!paymentData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }
    
    // City validation
    if (!paymentData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    // ZIP code validation
    if (!paymentData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    
    // Country validation
    if (!paymentData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    
    return newErrors;
  };

  /* ============================================
     FORM SUBMISSION HANDLER
     ============================================
     Handles Next button clicks and navigation between steps
     
     Customization:
     - Add validation for new steps
     - Add API calls before navigation
     - Modify navigation flow as needed
     ============================================ */
  const handleSubmit = () => {
    if (currentStep === 'individual-register') {
      // Validate personal info
      const validationErrors = validatePersonalInfo();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      console.log('Form submitted:', formData);
      // TODO: Add API call to save personal info if needed
      setCurrentStep('password-creation');
      
    } else if (currentStep === 'password-creation') {
      // Validate password
      const validationErrors = validatePassword();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      console.log('Password created:', formData);
      // TODO: Add API call to create account here
      // Send verification email and navigate to verification step
      setCurrentStep('email-verification');
      setResendTimer(60); // Reset timer
      setCanResend(false);
      
    } else if (currentStep === 'residency-info') {
      // Validate residency info
      const validationErrors = validateResidencyInfo();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      console.log('Residency info submitted:', formData);
      // TODO: Add API call to save residency info
      // Navigate to language preferences
      setCurrentStep('language-prefs');
    } else if (currentStep === 'language-prefs') {
      // Language preferences are optional
      if (selectedLanguages.length === 0) {
        setErrors({ languages: 'Please select at least one language' });
        return;
      }
      console.log('Language preferences:', selectedLanguages);
      // Navigate to interests
      setCurrentStep('interests');
    } else if (currentStep === 'interests') {
      // Interests are optional
      if (selectedInterests.length === 0) {
        setErrors({ interests: 'Please select at least one interest' });
        return;
      }
      console.log('Selected interests:', selectedInterests);
      // Navigate to membership plan selection
      setCurrentStep('membership-plan');
    } else if (currentStep === 'membership-plan') {
      console.log('Selected plan:', selectedPlan, 'Billing:', billingPeriod);
      // Navigate to payment method only for Basic/Pro plans
      if (selectedPlan === 'basic' || selectedPlan === 'pro') {
        setCurrentStep('payment-method');
      } else {
        // Free plan - skip payment, go to profile picture
        setCurrentStep('profile-picture');
      }
    } else if (currentStep === 'payment-method') {
      // Validate payment info
      const validationErrors = validatePaymentInfo();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      console.log('Payment method submitted:', paymentMethod, paymentData);
      // TODO: Process payment with your payment provider
      // After successful payment, go to profile picture
      setCurrentStep('profile-picture');
    } else if (currentStep === 'profile-picture') {
      // Profile picture is optional, so no validation needed
      console.log('Profile picture:', profilePicture);
      // TODO: Upload profile picture to your server
      // Complete onboarding
      alert('🌴 Your Panama adventure starts now! Welcome aboard! 🎉');
    }
  };

  /* ============================================
     GOOGLE/APPLE OAUTH HANDLER
     ============================================
     Handles social authentication
     
     Customization:
     - Implement OAuth flow with your provider
     - Add error handling
     - Navigate to appropriate step after success
     ============================================ */
  const handleGoogleRegister = () => {
    console.log('Register with Google');
    // TODO: Implement Google OAuth flow
    // Example:
    // window.location.href = 'your-oauth-url';
  };

  /* ============================================
     BACK BUTTON HANDLER
     ============================================
     Handles navigation to previous steps
     
     Customization:
     - Add cleanup logic for new steps
     - Modify navigation flow as needed
     ============================================ */
  const handleBack = () => {
    setErrors({}); // Clear errors when going back
    
    if (currentStep === 'individual-register') {
      setCurrentStep('account-type');
    } else if (currentStep === 'password-creation') {
      setCurrentStep('individual-register');
    } else if (currentStep === 'email-verification') {
      setCurrentStep('password-creation');
      setOtp(['', '', '', '', '', '']); // Clear OTP
    } else if (currentStep === 'residency-info') {
      setCurrentStep('email-verification');
    } else if (currentStep === 'language-prefs') {
      setCurrentStep('residency-info');
    } else if (currentStep === 'interests') {
      setCurrentStep('language-prefs');
    } else if (currentStep === 'membership-plan') {
      setCurrentStep('interests');
    } else if (currentStep === 'payment-method') {
      setCurrentStep('membership-plan');
    } else if (currentStep === 'profile-picture') {
      // If came from payment, go back to payment, otherwise go to membership
      if (selectedPlan === 'basic' || selectedPlan === 'pro') {
        setCurrentStep('payment-method');
      } else {
        setCurrentStep('membership-plan');
      }
    }
  };

  // Account Type Selection Step
  if (currentStep === 'account-type') {
    return (
      <div className="relative min-h-screen bg-stone-50 flex items-center justify-center p-8" onMouseMove={handleMouseMove}>
        {/* Decorative Elements */}
        <DecorativeDots step="account-type" mousePosition={mousePosition} />

        <div className="relative w-full max-w-md">
          {/* Header */}
          <div className="text-right mb-8">
            <span className="text-slate-400 text-sm font-normal" style={{ fontFamily: 'Nunito, sans-serif' }}>Already have an account?</span>
            <button className="text-teal-600 text-sm font-medium ml-1 hover:underline" style={{ fontFamily: 'Inter, sans-serif' }}>
              Sign In
            </button>
          </div>

          {/* Title Section */}
          <div className="text-center mb-16">
            <h1 className="text-teal-600 text-3xl font-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Join Us!</h1>
            <p className="text-slate-400 text-lg leading-7" style={{ fontFamily: 'Nunito, sans-serif' }}>
              To begin this journey, tell us what type of account you'd be opening.
            </p>
          </div>

          {/* Account Type Cards */}
          <div className="flex flex-col gap-4">
            {accountTypes.map((type) => {
              const IconComponent = type.icon;
              const isSelected = selectedAccountType === type.id;
              
              return (
                <button
                  key={type.id}
                  onClick={() => handleSelectType(type)}
                  className={`
                    relative w-full h-28 bg-white rounded-2xl p-6 flex items-center gap-6
                    transition-all duration-200
                    ${isSelected 
                      ? 'border border-teal-600 shadow-[0px_4px_14px_1px_rgba(0,0,0,0.04)]' 
                      : 'shadow-[0px_2px_14px_1px_rgba(0,0,0,0.06)] hover:shadow-lg'
                    }
                  `}
                >
                  {/* Icon */}
                  <div className="w-6 h-6 flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-teal-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3 className="text-black text-base font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {type.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-normal" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {type.description}
                    </p>
                  </div>

                  {/* Arrow indicator for selected */}
                  {isSelected && (
                    <div className="w-5 h-5 flex-shrink-0">
                      <ArrowRight className="w-5 h-5 text-teal-600" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'individual-register') {
    return (
      <div className="relative min-h-screen bg-stone-50 flex items-center justify-center p-8">
        <div className="w-full max-w-[75rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side - Image placeholder */}
            <div className="hidden lg:block">
              <div className="w-full h-[400px] bg-slate-200 rounded-2xl flex items-center justify-center">
                <span className="text-slate-400">Image Area</span>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 relative">
              {/* Back Button and Progress Indicator */}
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-1 text-slate-400 hover:text-teal-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-base font-semibold">Back</span>
                </button>
                
                <div className="text-right">
                  <div className="text-stone-300 text-sm font-medium">
                    STEP 01/05
                  </div>
                  <div className="text-slate-400 text-base font-semibold">
                    Personal Info.
                  </div>
                </div>
              </div>

              {/* Title Container */}
              <div className="flex flex-col gap-3 mb-8">
                <h1 className="text-center text-teal-600 text-3xl font-bold">
                  Start Your Panama Adventure!
                </h1>
                <p className="text-center text-slate-400 text-lg font-normal leading-7">
                  Let guides and agencies recognize you as you explore Panama's hidden gems.
                </p>
                <div className="h-0 border-t border-neutral-100"></div>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-8">
                {/* Name Field */}
                <div className="flex flex-col gap-3.5">
                  <label className="text-center text-gray-500 text-base font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                    className={`h-16 bg-white rounded-2xl text-center text-zinc-700 text-sm font-medium focus:outline-none transition-all ${
                      errors.name 
                        ? 'border-2 border-red-500' 
                        : 'border border-slate-400 focus:border-teal-600 focus:border-2 focus:shadow-[0px_4px_10px_3px_rgba(0,0,0,0.11)]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.name}</p>
                  )}
                </div>

                {/* Last Name Field */}
                <div className="flex flex-col gap-3.5">
                  <label className="text-center text-gray-500 text-base font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                    className={`h-16 bg-white rounded-2xl text-center text-slate-400 text-sm font-medium focus:outline-none transition-all ${
                      errors.lastName 
                        ? 'border-2 border-red-500' 
                        : 'border border-slate-400 focus:border-teal-600 focus:border-2 focus:shadow-[0px_4px_10px_3px_rgba(0,0,0,0.11)]'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.lastName}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-3.5">
                  <label className="text-center text-gray-500 text-base font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                    className={`h-16 bg-white rounded-2xl text-center text-slate-400 text-sm font-medium focus:outline-none transition-all ${
                      errors.email 
                        ? 'border-2 border-red-500' 
                        : 'border border-slate-400 focus:border-teal-600 focus:border-2 focus:shadow-[0px_4px_10px_3px_rgba(0,0,0,0.11)]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.email}</p>
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleSubmit}
                  className="h-16 bg-teal-600 hover:bg-teal-700 rounded-2xl transition-colors"
                >
                  <span className="text-center text-white text-base font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Next</span>
                </button>

                {/* Divider */}
                <div className="flex justify-between items-center h-4">
                  <div className="w-44 h-0 border-t border-neutral-800"></div>
                  <span className="text-center text-neutral-800 text-xs font-normal" style={{ fontFamily: 'Nunito, sans-serif' }}>Or</span>
                  <div className="w-44 h-0 border-t border-neutral-800"></div>
                </div>

                {/* Google Register Button */}
                <button
                  onClick={handleGoogleRegister}
                  className="h-16 px-11 py-5 bg-white rounded-md shadow-[0px_4px_10px_0px_rgba(0,0,0,0.08)] flex justify-start items-center gap-16 hover:shadow-lg transition-shadow"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#FBBC05" d="M22 12c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#EA4335" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#34A853" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-center text-black text-base font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Register with Google</span>
                </button>

                {/* Apple Register Button */}
                <button
                  onClick={() => console.log('Register with Apple')}
                  className="h-16 px-11 py-5 bg-white rounded-md shadow-[0px_4px_10px_0px_rgba(0,0,0,0.08)] flex justify-start items-center gap-16 hover:shadow-lg transition-shadow"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span className="text-center text-black text-base font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Register with Apple</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'password-creation') {
    return (
      <div className="relative min-h-screen bg-stone-50 flex items-center justify-center p-8" onMouseMove={handleMouseMove}>
        {/* Decorative Elements */}
        <DecorativeDots step="password-creation" mousePosition={mousePosition} />

        <div className="relative w-full max-w-lg">
          {/* Back Button and Progress Indicator */}
          <div className="flex items-center justify-between mb-12">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-400 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Back</span>
            </button>
            
            <div className="text-right">
              <div className="text-stone-300 text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                STEP 02/05
              </div>
              <div className="text-slate-400 text-base font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Password.
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-teal-600 text-3xl font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Keep your Account Secure!
            </h1>
            <p className="text-slate-400 text-base" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Please choose a strong password.
            </p>
          </div>

          {/* Password Fields */}
          <div className="space-y-6">
            {/* Create Password */}
            <div>
              <label className="block text-gray-500 text-sm font-medium mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Create password*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••••••"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  className={`w-full h-14 px-4 bg-white rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                    errors.password
                      ? 'border-2 border-red-500'
                      : 'border border-slate-300 focus:border-teal-600 focus:border-2 focus:ring-2 focus:ring-teal-600/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm font-medium hover:text-teal-600 transition-colors"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.password}</p>
              )}
            </div>

            {/* Repeat Password */}
            <div>
              <label className="block text-gray-500 text-sm font-medium mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Repeat password*
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••••••••"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  className={`w-full h-14 px-4 bg-white rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                    errors.confirmPassword
                      ? 'border-2 border-red-500'
                      : 'border border-slate-300 focus:border-teal-600 focus:border-2 focus:ring-2 focus:ring-teal-600/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm font-medium hover:text-teal-600 transition-colors"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.confirmPassword}</p>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleSubmit}
              className="w-full h-16 bg-teal-600 hover:bg-teal-700 rounded-2xl transition-colors mt-8"
            >
              <span className="text-center text-white text-base font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Next</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'email-verification') {
    return (
      <div className="relative min-h-screen bg-stone-50 flex items-center justify-center p-8" onMouseMove={handleMouseMove}>
        {/* Decorative Elements */}
        <DecorativeDots step="email-verification" mousePosition={mousePosition} />

        <div className="relative w-full max-w-lg">
          {/* Back Button and Progress Indicator */}
          <div className="flex items-center justify-between mb-12">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-400 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Back</span>
            </button>
            
            <div className="text-right">
              <div className="text-stone-300 text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                STEP 03/05
              </div>
              <div className="text-slate-400 text-base font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Verification.
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-teal-600 text-3xl font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Verify your Email
            </h1>
            <p className="text-slate-400 text-base mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
              We've sent a 6-digit code to
            </p>
            <p className="text-teal-600 text-base font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {formData.email}
            </p>
          </div>

          {/* OTP Input Fields */}
          <div className="mb-8">
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  onPaste={index === 0 ? handleOtpPaste : undefined}
                  className="w-14 h-14 text-center text-2xl font-semibold bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              ))}
            </div>

            {/* Resend Code */}
            <div className="text-center">
              {canResend ? (
                <button
                  onClick={handleResendCode}
                  className="text-teal-600 text-sm font-medium hover:underline"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  Resend Code
                </button>
              ) : (
                <p className="text-slate-400 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Resend code in {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}
                </p>
              )}
            </div>
          </div>

          {/* Info Text */}
          <p className="text-center text-slate-400 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Didn't receive the code? Check your spam folder or try resending.
          </p>
        </div>
      </div>
    );
  }

  if (currentStep === 'residency-info') {
    return (
      <div className="relative min-h-screen bg-stone-50 flex items-center justify-center p-8" onMouseMove={handleMouseMove}>
        {/* Decorative Elements */}
        <DecorativeDots step="residency-info" mousePosition={mousePosition} />

        <div className="relative w-full max-w-lg">
          {/* Back Button and Progress Indicator */}
          <div className="flex items-center justify-between mb-12">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-400 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Back</span>
            </button>
            
            <div className="text-right">
                  <div className="text-stone-300 text-sm font-medium">
                    STEP 04/08
                  </div>
                  <div className="text-slate-400 text-base font-semibold">
                    Residency Info.
                  </div>
                </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-teal-600 text-3xl font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Complete Your Profile!
            </h1>
            <p className="text-slate-400 text-base" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Please continue filling your information to complete your profile.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Phone Number */}
            <div>
              <label className="block text-gray-500 text-sm font-medium mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Phone number
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                  className="w-24 h-14 px-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  <option value="+507">🇵🇦 +507</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+52">🇲🇽 +52</option>
                  <option value="+57">🇨🇴 +57</option>
                  <option value="+51">🇵🇪 +51</option>
                  <option value="+56">🇨🇱 +56</option>
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="09097345587"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  className={`flex-1 h-14 px-4 bg-white rounded-xl placeholder-slate-400 focus:outline-none transition-all ${
                    errors.phoneNumber
                      ? 'border-2 border-red-500'
                      : 'border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20'
                  }`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.phoneNumber}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-500 text-sm font-medium mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Your address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Please enter address"
                style={{ fontFamily: 'Nunito, sans-serif' }}
                className={`w-full h-14 px-4 bg-white rounded-xl placeholder-slate-400 focus:outline-none transition-all ${
                  errors.address
                    ? 'border-2 border-red-500'
                    : 'border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20'
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.address}</p>
              )}
            </div>

            {/* Nationality */}
            <div>
              <label className="block text-gray-500 text-sm font-medium mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Nationality
              </label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                style={{ fontFamily: 'Nunito, sans-serif' }}
                className={`w-full h-14 px-4 bg-white rounded-xl focus:outline-none transition-all ${
                  errors.nationality
                    ? 'border-2 border-red-500'
                    : 'border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20'
                } ${!formData.nationality ? 'text-slate-400' : 'text-slate-900'}`}
              >
                <option value="">Please select</option>
                <option value="panama">Panama</option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="mexico">Mexico</option>
                <option value="colombia">Colombia</option>
                <option value="spain">Spain</option>
                <option value="uk">United Kingdom</option>
                <option value="other">Other</option>
              </select>
              {errors.nationality && (
                <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.nationality}</p>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleSubmit}
              className="w-full h-16 bg-teal-600 hover:bg-teal-700 rounded-2xl transition-colors mt-8"
            >
              <span className="text-center text-white text-base font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Next</span>
            </button>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs mt-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span style={{ fontFamily: 'Nunito, sans-serif' }}>Your info is safely secured</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'language-prefs') {
    const languages = [
      { id: 'english', name: 'English', flag: '🇺🇸' },
      { id: 'spanish', name: 'Spanish', flag: '🇪🇸' },
      { id: 'french', name: 'French', flag: '🇫🇷' },
      { id: 'german', name: 'German', flag: '🇩🇪' },
      { id: 'portuguese', name: 'Portuguese', flag: '🇵🇹' },
      { id: 'italian', name: 'Italian', flag: '🇮🇹' }
    ];

    const toggleLanguage = (languageId) => {
      setSelectedLanguages(prev => {
        if (prev.includes(languageId)) {
          return prev.filter(id => id !== languageId);
        } else {
          return [...prev, languageId];
        }
      });
      // Clear error when user selects a language
      if (errors.languages) {
        setErrors({});
      }
    };

    return (
      <div className="relative min-h-screen bg-stone-50 flex items-center justify-center p-8" onMouseMove={handleMouseMove}>
        {/* Decorative Elements */}
        <DecorativeDots step="language-prefs" mousePosition={mousePosition} />

        <div className="relative w-full max-w-2xl">
          {/* Back Button and Progress Indicator */}
          <div className="flex items-center justify-between mb-12">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-400 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Back</span>
            </button>
            
            <div className="text-right">
              <div className="text-stone-300 text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                STEP 05/08
              </div>
              <div className="text-slate-400 text-base font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Languages
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-teal-600 text-3xl font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Which Languages Do You Speak?
            </h1>
            <p className="text-slate-400 text-base" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Help us connect you with the right guides and experiences
            </p>
          </div>

          {/* Language Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {languages.map((language) => {
              const isSelected = selectedLanguages.includes(language.id);
              
              return (
                <button
                  key={language.id}
                  onClick={() => toggleLanguage(language.id)}
                  className={`h-24 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:border-teal-600 border-2 border-slate-200'
                  }`}
                >
                  <span className="text-3xl">{language.flag}</span>
                  <span className="text-base font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {language.name}
                  </span>
                </button>
              );
            })}
          </div>

          {errors.languages && (
            <p className="text-red-500 text-sm text-center mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {errors.languages}
            </p>
          )}

          {/* Next Button */}
          <button
            onClick={handleSubmit}
            className="w-full h-16 bg-teal-600 hover:bg-teal-700 rounded-2xl transition-colors"
          >
            <span className="text-center text-white text-base font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Next</span>
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'interests') {
    const interests = [
      { id: 'nature', name: 'Nature & Wildlife', icon: '🌿' },
      { id: 'beaches', name: 'Beaches & Islands', icon: '🏖️' },
      { id: 'culture', name: 'Indigenous Culture', icon: '🎭' },
      { id: 'food', name: 'Food & Gastronomy', icon: '🍽️' },
      { id: 'adventure', name: 'Adventure Sports', icon: '🏄' },
      { id: 'history', name: 'History & Heritage', icon: '🏛️' },
      { id: 'coffee', name: 'Coffee & Plantations', icon: '☕' },
      { id: 'nightlife', name: 'Nightlife & Entertainment', icon: '🎉' },
      { id: 'shopping', name: 'Shopping & Markets', icon: '🛍️' },
      { id: 'photography', name: 'Photography', icon: '📸' },
      { id: 'wellness', name: 'Wellness & Spa', icon: '🧘' },
      { id: 'wildlife', name: 'Wildlife Spotting', icon: '🦜' }
    ];

    const toggleInterest = (interestId) => {
      setSelectedInterests(prev => {
        if (prev.includes(interestId)) {
          return prev.filter(id => id !== interestId);
        } else {
          return [...prev, interestId];
        }
      });
      // Clear error when user selects an interest
      if (errors.interests) {
        setErrors({});
      }
    };

    return (
      <div className="relative min-h-screen bg-stone-50 flex items-center justify-center p-8" onMouseMove={handleMouseMove}>
        {/* Decorative Elements */}
        <DecorativeDots step="interests" mousePosition={mousePosition} />

        <div className="relative w-full max-w-4xl">
          {/* Back Button and Progress Indicator */}
          <div className="flex items-center justify-between mb-12">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-400 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Back</span>
            </button>
            
            <div className="text-right">
              <div className="text-stone-300 text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                STEP 06/08
              </div>
              <div className="text-slate-400 text-base font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Interests
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-teal-600 text-3xl font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              What Draws You to Panama?
            </h1>
            <p className="text-slate-400 text-base" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Select the experiences that excite you most
            </p>
          </div>

          {/* Interests Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {interests.map((interest) => {
              const isSelected = selectedInterests.includes(interest.id);
              
              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`h-28 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:border-teal-600 border-2 border-slate-200'
                  }`}
                >
                  <span className="text-3xl">{interest.icon}</span>
                  <span className="text-sm font-medium text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {interest.name}
                  </span>
                </button>
              );
            })}
          </div>

          {errors.interests && (
            <p className="text-red-500 text-sm text-center mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {errors.interests}
            </p>
          )}

          {/* Next Button */}
          <button
            onClick={handleSubmit}
            className="w-full h-16 bg-teal-600 hover:bg-teal-700 rounded-2xl transition-colors"
          >
            <span className="text-center text-white text-base font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Next</span>
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'membership-plan') {
    const plans = [
      {
        id: 'free',
        name: 'Explorer',
        description: 'Start discovering Panama\'s hidden treasures',
        price: 0,
        features: [
          'Access to destination guides',
          'Basic Panama recommendations',
          'Community travel tips',
          'Save favorite locations',
          'Standard customer support'
        ]
      },
      {
        id: 'basic',
        name: 'Adventurer',
        description: 'Unlock personalized Panama recommendations',
        price: 30,
        popular: true,
        features: [
          'Personalized Panama content',
          'Advanced search filters',
          'Exclusive insider tips',
          'Direct messaging with guides',
          'Priority customer support'
        ]
      },
      {
        id: 'pro',
        name: 'Insider',
        description: 'VIP access to Panama\'s most authentic experiences',
        price: 50,
        features: [
          'Private guide connections',
          'Exclusive hidden gem tours',
          'VIP event invitations',
          'Concierge travel planning',
          '24/7 premium support'
        ]
      }
    ];

    return (
      <div className="relative min-h-screen bg-stone-50 flex items-center justify-center p-8" onMouseMove={handleMouseMove}>
        {/* Decorative Elements */}
        <DecorativeDots step="membership-plan" mousePosition={mousePosition} />

        <div className="relative w-full max-w-6xl">
          {/* Back Button and Progress Indicator */}
          <div className="flex items-center justify-between mb-12">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-400 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Back</span>
            </button>
            
            <div className="text-right">
              <div className="text-stone-300 text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                STEP 07/08
              </div>
              <div className="text-slate-400 text-base font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Membership Plan
              </div>
            </div>
          </div>

          {/* Billing Period Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-4 bg-white rounded-full p-1 shadow-sm">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-full transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-600 hover:text-teal-600'
                }`}
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-full transition-all ${
                  billingPeriod === 'yearly'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-600 hover:text-teal-600'
                }`}
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-teal-600 text-4xl font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Choose Your Panama Experience
            </h1>
            <p className="text-slate-400 text-base" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Select the plan that matches your adventure style
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-8 transition-all ${
                  plan.popular
                    ? 'border-2 border-teal-600 shadow-xl'
                    : 'border border-slate-200 hover:border-teal-600 hover:shadow-lg'
                }`}
              >
                {/* Most Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-teal-600 text-white text-xs font-semibold px-4 py-1 rounded-full" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      Most popular
                    </span>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-teal-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    ${plan.price}
                  </span>
                  <span className="text-slate-500 ml-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>

                {/* Get Started Button */}
                <button
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    handleSubmit();
                  }}
                  className={`w-full h-12 rounded-xl font-medium transition-colors mb-6 ${
                    plan.popular
                      ? 'bg-teal-600 hover:bg-teal-700 text-white'
                      : 'bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-900'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Get started
                </button>

                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-slate-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'payment-method') {
    return (
      <div className="relative min-h-screen bg-stone-50 flex items-center justify-center p-8" onMouseMove={handleMouseMove}>
        {/* Decorative Elements */}
        <DecorativeDots step="payment-method" mousePosition={mousePosition} />

        <div className="relative w-full max-w-2xl">
          {/* Back Button and Progress Indicator */}
          <div className="flex items-center justify-between mb-12">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-400 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Back</span>
            </button>
            
            <div className="text-right">
              <div className="text-stone-300 text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                STEP 07/08
              </div>
              <div className="text-slate-400 text-base font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Payment Method
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-teal-600 text-3xl font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Payment Information
            </h1>
            <p className="text-slate-400 text-base" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Securely add your payment details to complete your subscription.
            </p>
          </div>

          {/* Payment Method Selection */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex-1 h-16 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${
                paymentMethod === 'card'
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-slate-300 hover:border-teal-600'
              }`}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2"/>
                <path d="M2 10h20" strokeWidth="2"/>
              </svg>
              <span className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                Credit/Debit Card
              </span>
            </button>

            <button
              onClick={() => setPaymentMethod('paypal')}
              className={`flex-1 h-16 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${
                paymentMethod === 'paypal'
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-slate-300 hover:border-teal-600'
              }`}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#003087">
                <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.15a.804.804 0 01-.794.68H7.72a.483.483 0 01-.477-.558L9.344 7.9a.965.965 0 01.952-.814h4.649c1.547 0 2.747.321 3.563 1.05.298.267.54.565.734.889l.165.230a5.052 5.052 0 01.66 1.223z"/>
              </svg>
              <span className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                PayPal
              </span>
            </button>
          </div>

          {/* Card Form or PayPal */}
          {paymentMethod === 'card' ? (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="space-y-6">
                {/* Card Number */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                    className={`w-full h-14 px-4 bg-white rounded-xl placeholder-slate-400 focus:outline-none transition-all ${
                      errors.cardNumber
                        ? 'border-2 border-red-500'
                        : 'border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20'
                    }`}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.cardNumber}</p>
                  )}
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handlePaymentInputChange}
                    placeholder="John Doe"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                    className={`w-full h-14 px-4 bg-white rounded-xl placeholder-slate-400 focus:outline-none transition-all ${
                      errors.cardName
                        ? 'border-2 border-red-500'
                        : 'border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20'
                    }`}
                  />
                  {errors.cardName && (
                    <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.cardName}</p>
                  )}
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handlePaymentInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      style={{ fontFamily: 'Nunito, sans-serif' }}
                      className={`w-full h-14 px-4 bg-white rounded-xl placeholder-slate-400 focus:outline-none transition-all ${
                        errors.expiryDate
                          ? 'border-2 border-red-500'
                          : 'border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20'
                      }`}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.expiryDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handlePaymentInputChange}
                      placeholder="123"
                      maxLength="4"
                      style={{ fontFamily: 'Nunito, sans-serif' }}
                      className={`w-full h-14 px-4 bg-white rounded-xl placeholder-slate-400 focus:outline-none transition-all ${
                        errors.cvv
                          ? 'border-2 border-red-500'
                          : 'border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20'
                      }`}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Billing Address Section */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Billing Address
                  </h3>

                  {/* Address */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={paymentData.billingAddress}
                      onChange={handlePaymentInputChange}
                      placeholder="123 Main Street"
                      style={{ fontFamily: 'Nunito, sans-serif' }}
                      className={`w-full h-14 px-4 bg-white rounded-xl placeholder-slate-400 focus:outline-none transition-all ${
                        errors.billingAddress
                          ? 'border-2 border-red-500'
                          : 'border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20'
                      }`}
                    />
                    {errors.billingAddress && (
                      <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.billingAddress}</p>
                    )}
                  </div>

                  {/* City and ZIP */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={paymentData.city}
                        onChange={handlePaymentInputChange}
                        placeholder="Panama City"
                        style={{ fontFamily: 'Nunito, sans-serif' }}
                        className={`w-full h-14 px-4 bg-white rounded-xl placeholder-slate-400 focus:outline-none transition-all ${
                          errors.city
                            ? 'border-2 border-red-500'
                            : 'border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20'
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={paymentData.zipCode}
                        onChange={handlePaymentInputChange}
                        placeholder="10001"
                        style={{ fontFamily: 'Nunito, sans-serif' }}
                        className={`w-full h-14 px-4 bg-white rounded-xl placeholder-slate-400 focus:outline-none transition-all ${
                          errors.zipCode
                            ? 'border-2 border-red-500'
                            : 'border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20'
                        }`}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.zipCode}</p>
                      )}
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      Country
                    </label>
                    <select
                      name="country"
                      value={paymentData.country}
                      onChange={handlePaymentInputChange}
                      style={{ fontFamily: 'Nunito, sans-serif' }}
                      className={`w-full h-14 px-4 bg-white rounded-xl focus:outline-none transition-all ${
                        errors.country
                          ? 'border-2 border-red-500'
                          : 'border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20'
                      } ${!paymentData.country ? 'text-slate-400' : 'text-slate-900'}`}
                    >
                      <option value="">Select country</option>
                      <option value="panama">Panama</option>
                      <option value="usa">United States</option>
                      <option value="canada">Canada</option>
                      <option value="mexico">Mexico</option>
                      <option value="uk">United Kingdom</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{errors.country}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* PayPal Section */
            <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
              <div className="mb-6">
                <svg className="w-24 h-24 mx-auto" viewBox="0 0 24 24" fill="#003087">
                  <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.15a.804.804 0 01-.794.68H7.72a.483.483 0 01-.477-.558L9.344 7.9a.965.965 0 01.952-.814h4.649c1.547 0 2.747.321 3.563 1.05.298.267.54.565.734.889l.165.230a5.052 5.052 0 01.66 1.223z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Continue with PayPal
              </h3>
              <p className="text-slate-500 mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                You'll be redirected to PayPal to complete your payment securely.
              </p>
              <button
                onClick={handleSubmit}
                className="w-full max-w-sm mx-auto h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              >
                <span className="text-base font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Continue to PayPal
                </span>
              </button>
            </div>
          )}

          {/* Complete Payment Button (for card) */}
          {paymentMethod === 'card' && (
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                className="w-full h-16 bg-teal-600 hover:bg-teal-700 rounded-2xl transition-colors"
              >
                <span className="text-center text-white text-base font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Complete Payment
                </span>
              </button>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs mt-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span style={{ fontFamily: 'Nunito, sans-serif' }}>Your payment information is encrypted and secure</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentStep === 'profile-picture') {
    return (
      <div className="relative min-h-screen bg-stone-50 flex items-center justify-center p-8" onMouseMove={handleMouseMove}>
        {/* Decorative Elements */}
        <DecorativeDots step="profile-picture" mousePosition={mousePosition} />

        <div className="relative w-full max-w-2xl">
          {/* Back Button and Progress Indicator */}
          <div className="flex items-center justify-between mb-12">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-400 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Back</span>
            </button>
            
            <div className="text-right">
              <div className="text-stone-300 text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                STEP 08/08
              </div>
              <div className="text-slate-400 text-base font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Profile Picture
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-teal-600 text-3xl font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Let Travelers See the Face Behind the Adventure
            </h1>
            <p className="text-slate-400 text-base" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Add a profile picture to personalize your account (optional)
            </p>
          </div>

          {/* Upload Area */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            {!imagePreview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  isDragging
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-slate-300 hover:border-teal-600'
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-slate-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Drop your photo here, or{' '}
                      <label className="text-teal-600 cursor-pointer hover:underline">
                        browse
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />
                      </label>
                    </p>
                    <p className="text-sm text-slate-400" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      Supports: JPG, PNG (Max 10MB)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-48 h-48 rounded-full object-cover border-4 border-teal-600"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Looking good! 🎉
                </p>
              </div>
            )}

            {errors.profilePicture && (
              <p className="text-red-500 text-sm text-center mt-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {errors.profilePicture}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex-1 h-16 bg-teal-600 hover:bg-teal-700 rounded-2xl transition-colors"
            >
              <span className="text-center text-white text-base font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                {profilePicture ? 'Complete Setup' : 'Skip for Now'}
              </span>
            </button>
          </div>

          {/* Info Text */}
          <p className="text-center text-slate-400 text-sm mt-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            You can always add or change your profile picture later in settings
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default Onboarding;