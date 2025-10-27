
// В modal.js замени
const contactModal = document.getElementById('contactModal');
const openModalBtn = document.getElementById('openModalBtn');
const submitFormBtn = document.getElementById('submitFormBtn');
const feedbackForm = document.getElementById('feedbackForm');

// Остальной код остается таким же

function openModal() {
    contactModal.showModal();
}


function closeModal() {
    contactModal.close();
    feedbackForm.reset();
}

function submitForm() {
    const form = document.getElementById('feedbackForm');
    const formData = new FormData(form);


    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        category: formData.get('category'),
        message: formData.get('message')
    };


    console.log('Данные формы:', data);

    alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');

    closeModal();


    form.reset();
}


document.addEventListener('DOMContentLoaded', function() {

    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }

   
    if (submitFormBtn) {
        submitFormBtn.addEventListener('click', submitForm);
    }

 
    if (contactModal) {
        contactModal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeModal();
            }
        });
    }

    if (feedbackForm) {
        feedbackForm.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' && event.target.type !== 'textarea') {
                event.preventDefault();
            }
        });
    }


});