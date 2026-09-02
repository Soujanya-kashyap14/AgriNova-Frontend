// Lightweight client-side validation shared by the Login and Register pages.
// Mirrors the backend's constraints (see backend/models/auth.py) so users get
// instant feedback before the request ever reaches the API.

export function validatePhone(phone: string): string | null {
  const digits = phone.replace(/[^0-9]/g, "");
  if (!phone.trim()) return "Phone number is required.";
  if (digits.length < 10 || digits.length > 13) {
    return "Enter a valid phone number (10 digits, optionally with country code).";
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
}

export function validateConfirmPassword(password: string, confirm: string): string | null {
  if (!confirm) return "Please confirm your password.";
  if (password !== confirm) return "Passwords do not match.";
  return null;
}

export function validateName(name: string): string | null {
  if (!name.trim()) return "Full name is required.";
  if (name.trim().length < 2) return "Name must be at least 2 characters.";
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email is required.";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) return "Enter a valid email address.";
  return null;
}
