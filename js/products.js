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
        
        // Обновляем счетчик в навигации Bootstrap (новый селектор)
        const cartCounter = document.querySelector('.navbar .badge');
        if (cartCounter) {
            cartCounter.textContent = totalItems;
        }
        
        // Также обновляем старый счетчик (если остался где-то)
        const oldCartCounter = document.querySelector('.nav__cart-counter');
        if (oldCartCounter) {
            oldCartCounter.textContent = `(${totalItems})`;
        }
    }
    
    // Добавляем обработчики для всех кнопок "В корзину" в Bootstrap-карточках
    const addToCartButtons = document.querySelectorAll('.card .btn-primary:not(:disabled)');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.card');
            const productName = productCard.querySelector('.card-title').textContent;
            
            // Получаем цену (учитываем старую и новую цену)
            let price = 0;
            
            // Ищем новую цену (есть скидка)
            const newPriceElement = productCard.querySelector('.text-primary.h5');
            if (newPriceElement) {
                const priceText = newPriceElement.textContent;
                price = parseInt(priceText.replace(/\D/g, '')) || 0;
            }
            
            // Если цена не найдена, ищем в другом месте
            if (price === 0) {
                const priceElement = productCard.querySelector('.card-text');
                if (priceElement) {
                    const priceText = priceElement.textContent;
                    price = parseInt(priceText.replace(/\D/g, '')) || 0;
                }
            }
            
            // Добавляем в корзину
            addToCart(productName, price);
            
            // Визуальный фидбэк
            const originalText = this.textContent;
            const originalClass = this.className;
            this.textContent = 'Добавлено!';
            this.className = 'btn btn-success btn-sm';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.className = originalClass;
            }, 2000);
        });
    });
    
    // Инициализируем счетчик корзины при загрузке
    updateCartCounter();
});