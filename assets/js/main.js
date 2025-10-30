/*=============== HOME SPLIT TEXT ===============*/
const { animate, text, stagger } = anime;

const { chars: chars1 } = text.split('.home__profession-1',{chars: true});
const { chars: chars2 } = text.split('.home__profession-2',{chars: true});

animate(chars1, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
});
animate(chars2, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
});
/*=============== SWIPER PROJECTS ===============*/
const swiperProjects = new Swiper('.projects__swiper ', {
  loop: true,
  spaceBetween: 24,
  slidesPerView: 'auto',
  grabCursor: true,
  speed: 600,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});


/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach((tab) =>{
    tab.addEventListener('click', () => {
        const targetSelector = tab.dataset.target,
        targetContent = document.querySelector(targetSelector)

        tabContents.forEach((content) => content.classList.remove('work-active'))
        tabs.forEach((t) => t.classList.remove('work-active'))

        tab.classList.add('work-active')
        targetContent.classList.add('work-active')
    })
})

/*=============== SERVICES ACCORDION ===============*/
const servicesButtons = document.querySelectorAll('.services__button');

servicesButtons.forEach((button) => {
  const heightInfo = document.querySelector('.services__info')
  heightInfo.style.height = heightInfo.scrollHeight + 'px';

  button.addEventListener('click', () => {
    const servicesCards = document.querySelectorAll('.services__card');
    currentCard = button.parentNode;
    currentInfo = currentCard.querySelector('.services__info');
    isCardOpen = currentCard.classList.contains('services-open');

    servicesCards.forEach(card => {

      card.classList.replace('services-open', 'services-close');

      const info = card.querySelector('.services__info');
      info.style.height = '0';
    })

    if(!isCardOpen) {
      currentCard.classList.replace('services-close', 'services-open');
      currentInfo.style.height = currentInfo.scrollHeight + 'px';
    }
  })
})

/*=============== COPY EMAIL IN CONTACT ===============*/
const contactForm = document.querySelector('.contact__form');
const contactMessage = document.querySelector('.contact__message');

const handleSubmit = async (event) => {
    event.preventDefault(); 
    
    const form = event.target;
    const data = new FormData(form);
    
    contactMessage.textContent = 'Enviando...';
    contactMessage.style.color = 'var(--text-color-light)';

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            contactMessage.textContent = 'Mensagem enviada! Obrigado pelo contato.';
            contactMessage.style.color = 'var(--first-color)'; 
            form.reset();
        } else {
            const responseData = await response.json();
            if (responseData.errors) {
                contactMessage.textContent = responseData.errors.map(err => err.message).join(', ');
            } else {
                contactMessage.textContent = 'Ocorreu um erro ao enviar. Tente novamente.';
            }
            contactMessage.style.color = 'red'; 
        }
    } catch (error) {
        contactMessage.textContent = 'Ocorreu um erro de rede. Verifique sua conexão.';
        contactMessage.style.color = 'red'; 
    }

    setTimeout(() => {
        contactMessage.textContent = '';
    }, 5000);
};

contactForm.addEventListener('submit', handleSubmit);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {

  const scrollY = window.scrollY
  sections.forEach(section => {
    const id = section.id,
    top = section.offsetTop - 50,
    height = section.offsetHeight,
    link = document.querySelector('.nav__menu a[href*=' + id + ']');

    if(!link) return
    link.classList.toggle('active-link', scrollY > top && scrollY <= top + height);
  })
}
window.addEventListener('scroll', scrollActive);

/*=============== CUSTOM CURSOR ===============*/


/* Hide custom cursor on links */


/*=============== SCROLL REVEAL ANIMATION ===============*/
