# MMA Georgia Registration Page

This is a responsive registration page for MMA Georgia built with Next.js and custom CSS modules.


## Live Demo
<a href="https://mma.giokulo.com/" target="_blank" rel="noopener noreferrer">View Live Demo</a>

## Features

- Responsive design
- Light/Dark mode support
- Form validation with error messages
- Password strength indicator
- Country code selector for phone numbers
- Data saved to localStorage after registration

## Tech Stack

- **Framework**: Next.js
- **Styling**: CSS Modules
- **Icons**: Lucide React
- **Notifications**: react-hot-toast

## Getting Started


### Installation

1. Clone the repository:
```bash
git clone https://github.com/kuliashvili/registration-app.git
cd registration-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
/public
  ├── background.png
  ├── logo.svg
  └── logored.svg
/src
  ├── app
  │   ├── globals.css
  │   ├── layout.js
  │   ├── page.js
  │   └── page.module.css
  └── components
      ├── Footer.js
      ├── Footer.module.css
      ├── Header.js
      ├── Header.module.css
      ├── RegistrationForm.js
      └── RegistrationForm.module.css
```

## Form Validation

The registration form validates:

- Required fields (first name, last name, email, phone)
- Email format
- Password requirements (min 8 characters, 1 uppercase, 1 number, 1 special character)
- Phone number with country code
- Agreement to terms and conditions

## Responsive Design

The application is responsive and works on:
- Mobile devices
- Tablets
- Desktop computers

## Dark/Light Mode

The application supports both dark and light modes:
- Toggle in the header switches between modes


- **Success Notifications**
  - Toast notifications on successful form submission



### Testing Saved Data

To view stored registration data:
1. Open browser developer tools (F12)
2. Go to Console and enter:
```javascript
console.log(JSON.parse(localStorage.getItem('registeredUser')));
```

![mma geo](https://github.com/user-attachments/assets/af1f90de-bcd7-4dea-8611-c4a6b196fe03)
