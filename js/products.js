// products.js
document.addEventListener('DOMContentLoaded', function() {
    // Функция для добавления в корзину
    function addToCart(productName, price) {
        // Получаем текущую корзину из localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Проверяем, есть ли товар уже в корзине
        const existingProduct = cart.find(item => item.name === productName);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: price,
                quantity: 1
            });
        }
        
        // Сохраняем обновленную корзину
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Показываем уведомление
        showNotification('Товар добавлен в корзину!');
        
        // Обновляем счетчик корзины (если он есть)
        updateCartCounter();
    }
    
    // Функция показа уведомления
    function showNotification(message) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        // Добавляем стили для анимации
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Функция обновления счетчика корзины
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Обновляем счетчик в навигации (если есть)
        const cartCounter = document.querySelector('.nav__cart-counter');
        if (cartCounter) {
            cartCounter.textContent = `(${totalItems})`;
        }
    }
    
    // Добавляем обработчики для всех кнопок "В корзину"
    const addToCartButtons = document.querySelectorAll('.product-card__btn:not(:disabled)');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-card__name').textContent;
            
            // Получаем цену (учитываем старую и новую цену)
            const priceElement = productCard.querySelector('.product-card__price-new') || 
                               productCard.querySelector('.product-card__price');
            
            let priceText = priceElement.textContent;
            
            // Извлекаем число из строки цены
            const price = parseInt(priceText.replace(/\D/g, '')) || 0;
            
            // Добавляем в корзину
            addToCart(productName, price);
            
            // Визуальный фидбэк
            const originalText = this.textContent;
            this.textContent = 'Добавлено!';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // Инициализируем счетчик корзины при загрузке
    updateCartCounter();
});