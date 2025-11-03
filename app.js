const searchicon1 = document.querySelector('#searchicon1');
const srchicon1 = document.querySelector('#srchicon1');
const search1 = document.querySelector('#searchinput1');

searchicon1.addEventListener('click',function(){
    search1.style.display = 'flex';
    searchicon1.style.display = 'none';
})

const searchicon2 = document.querySelector('#searchicon2');
const srchicon2 = document.querySelector('#srchicon2');
const search2 = document.querySelector('#searchinput2');

searchicon2.addEventListener('click',function(){
    search2.style.display = 'flex';
    searchicon2.style.display = 'none';
})

const bar = document.querySelector('.fa-bars');
const cross = document.querySelector('#hdcross');
const headerbar = document.querySelector('.headerbar');

bar.addEventListener('click', function(){
    setTimeout(()=>{
        cross.style.display = 'block';
    },200);
    headerbar.style.right = '0%';
})

cross.addEventListener('click',function(){
    cross.style.display = 'none';
    headerbar.style.right = '-100%';
})

const crosssignmb = document.querySelector('#x-sign-mb');
const sign = document.querySelector('.sign');
const signbox = document.querySelector('.sign-box');
const tosignin = document.querySelector('#to-signin');
const tosignup = document.querySelector('#to-signup');
const signup = document.querySelector('.signup');
const signin = document.querySelector('.signin');
const signlogo = document.querySelector('#user-lap');
const signlogomb = document.querySelector('#user-mb');

//when click on Id=x-sign it will hide the sign up form
function removeSignform() {
    signbox.style.transform = 'scale(0)';
    setTimeout(() => {
        sign.style.display = 'none';
    }, 400);
}
crosssignmb.addEventListener('click', removeSignform)

// when click on user icon in header it will show the sign up form
signlogo.addEventListener('click', () => {
    sign.style.display = 'flex';
    setTimeout(() => {
        signbox.style.transform = 'scale(1)';
    }, 100);
})
signlogomb.addEventListener('click', () => {
    sign.style.display = 'flex';
    setTimeout(() => {
        signbox.style.transform = 'scale(1)';
    }, 100);
})

//This is to toggle between sign in/sign up forms
tosignin.addEventListener('click', () => {
    signup.style.display = 'none';
    signin.style.display = 'block';
});
tosignup.addEventListener('click', () => {
    signup.style.display = 'block';
    signin.style.display = 'none';
});

// =============================
// FUNCTIONALITY: SIGNUP / SIGNIN / RESERVATION
// =============================

// --- SIGN UP ---
const signupForm = document.querySelector('.signup form');
const signinForm = document.querySelector('.signin form');

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = signupForm.querySelector('input[name="fullname"]').value;
    const email = signupForm.querySelector('input[name="email"]').value;
    const password = signupForm.querySelector('input[name="password"]').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ fullName, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created successfully!');
    signupForm.reset();
  });
}

// --- SIGN IN ---
if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signinForm.querySelector('input[name="email2"]').value;
    const password = signinForm.querySelector('input[name="password2"]').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      alert(`Welcome back, ${user.fullName}!`);
      localStorage.setItem('loggedUser', JSON.stringify(user));
      removeSignform(); // optional: close the sign form after login

      const logins = JSON.parse(localStorage.getItem('logins')) || [];
      logins.push({
        username: user.fullName,
        time: new Date().toLocaleString()
      });
      localStorage.setItem('logins', JSON.stringify(logins));

    } else {
      alert('Invalid credentials!');
    }
  });
}

// --- RESERVATION DEMO (clicking the Visit Now button) ---
document.addEventListener('DOMContentLoaded', () => {
  const reservationBtn = document.querySelector('.blue_btn');
  if (reservationBtn) {
    reservationBtn.addEventListener('click', () => {
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      if (!loggedUser) {
        alert('Please sign in before making a reservation.');
        return;
      }

      const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
      const newRes = {
        name: loggedUser.fullName,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        guests: Math.floor(Math.random() * 5) + 1
      };
      reservations.push(newRes);
      localStorage.setItem('reservations', JSON.stringify(reservations));
      alert('Reservation recorded!');
    });
  }
});
