// ТВОЯТ API ключ от NASA
const NASA_API_KEY = 'asgLhsgWMCSbADRH6YmlxfMrRO2OhZhCuKknGMjl';
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

// Функция за изчисляване на динамична цена
function calculateDynamicPrice(title, explanation, date) {
    // Базова цена
    let basePrice = 299;
    
    // Фактори, които влияят на цената:
    let complexityMultiplier = 1;
    let distanceMultiplier = 1;
    let rarityMultiplier = 1;
    let seasonalMultiplier = 1;
    
    // Анализираме заглавието и описанието за ключови думи
    const fullText = (title + ' ' + explanation).toLowerCase();
    
    // Проверка за тип обект и сложност
    if (fullText.includes('black hole') || fullText.includes('черна дупка')) {
        complexityMultiplier = 3.5;
        distanceMultiplier = 5;
        rarityMultiplier = 4;
    } else if (fullText.includes('supernova') || fullText.includes('свръхнова')) {
        complexityMultiplier = 3;
        distanceMultiplier = 4;
        rarityMultiplier = 3.5;
    } else if (fullText.includes('nebula') || fullText.includes('мъглявина')) {
        complexityMultiplier = 2;
        distanceMultiplier = 2.5;
        rarityMultiplier = 2;
    } else if (fullText.includes('galaxy') || fullText.includes('галактика')) {
        complexityMultiplier = 2.5;
        distanceMultiplier = 3;
        rarityMultiplier = 2.5;
    } else if (fullText.includes('planet') || fullText.includes('планета')) {
        complexityMultiplier = 1.5;
        distanceMultiplier = 2;
        rarityMultiplier = 1.5;
    } else if (fullText.includes('comet') || fullText.includes('комета')) {
        complexityMultiplier = 1.8;
        distanceMultiplier = 1.5;
        rarityMultiplier = 2;
    } else if (fullText.includes('aurora') || fullText.includes('полярно сияние')) {
        complexityMultiplier = 1.2;
        distanceMultiplier = 1.1;
        rarityMultiplier = 1.8;
    } else if (fullText.includes('eclipse') || fullText.includes('затъмнение')) {
        complexityMultiplier = 1.3;
        distanceMultiplier = 1.2;
        rarityMultiplier = 2.5;
    } else if (fullText.includes('milky way') || fullText.includes('млечен път')) {
        complexityMultiplier = 1.1;
        distanceMultiplier = 1.3;
        rarityMultiplier = 1.2;
    } else if (fullText.includes('mars') || fullText.includes('марс')) {
        complexityMultiplier = 1.4;
        distanceMultiplier = 1.8;
        rarityMultiplier = 1.3;
    } else if (fullText.includes('jupiter') || fullText.includes('юпитер')) {
        complexityMultiplier = 1.6;
        distanceMultiplier = 2.2;
        rarityMultiplier = 1.4;
    } else if (fullText.includes('saturn') || fullText.includes('сатурн')) {
        complexityMultiplier = 1.7;
        distanceMultiplier = 2.5;
        rarityMultiplier = 1.5;
    }
    
    // Проверка за разстояние (светлинни години)
    const lightYearMatch = fullText.match(/(\d+)[\s-]*(light|светлинни)[\s-]*(year|години)/i);
    if (lightYearMatch) {
        const lightYears = parseInt(lightYearMatch[1]);
        if (lightYears > 10000) {
            distanceMultiplier *= 3;
        } else if (lightYears > 1000) {
            distanceMultiplier *= 2;
        } else if (lightYears > 100) {
            distanceMultiplier *= 1.5;
        }
    }
    
    // Сезонен множител (базиран на месеца)
    const selectedDate = new Date(date);
    const month = selectedDate.getMonth();
    if (month === 7 || month === 8) {
        seasonalMultiplier = 1.5; // Лятна ваканция - по-скъпо
    } else if (month === 11 || month === 0) {
        seasonalMultiplier = 1.3; // Коледни празници
    } else if (month === 3 || month === 4) {
        seasonalMultiplier = 0.8; // Пролетни промоции
    }
    
    // Проверка дали е уикенд
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) {
        seasonalMultiplier *= 1.2; // Уикенд надценка
    }
    
    // Специални обекти
    if (fullText.includes('hubble') || fullText.includes('хъбъл')) {
        rarityMultiplier *= 2;
    } else if (fullText.includes('james webb') || fullText.includes('джеймс уеб')) {
        rarityMultiplier *= 2.5;
    } else if (fullText.includes('international space station') || fullText.includes('международна космическа станция')) {
        complexityMultiplier *= 0.9; // По-близо е
        distanceMultiplier *= 0.5;
    }
    
    // Изчисляване на крайната цена
    const totalMultiplier = complexityMultiplier * distanceMultiplier * rarityMultiplier * seasonalMultiplier;
    let finalPrice = Math.round(basePrice * totalMultiplier);
    
    // Закръгляме до хубаво число
    finalPrice = Math.round(finalPrice / 10) * 10;
    
    // Минимална и максимална цена
    finalPrice = Math.max(199, Math.min(9999, finalPrice));
    
    // Определяме типа на цената
    let priceType = 'standard';
    if (finalPrice >= 2000) {
        priceType = 'expensive';
    } else if (finalPrice <= 400) {
        priceType = 'economy';
    } else if (finalPrice >= 1000) {
        priceType = 'premium';
    }
    
    // Детайли за цената
    const fuelCost = Math.round(finalPrice * 0.15);
    const spaceTax = Math.round(finalPrice * 0.25);
    const golfDepreciation = Math.round(finalPrice * 0.35);
    const coffeeCost = Math.round(finalPrice * 0.05);
    const mixtapeCost = Math.round(finalPrice * 0.20);
    
    return {
        totalPrice: finalPrice,
        priceType: priceType,
        breakdown: {
            fuel: fuelCost,
            tax: spaceTax,
            depreciation: golfDepreciation,
            coffee: coffeeCost,
            mixtape: mixtapeCost
        },
        multipliers: {
            complexity: complexityMultiplier,
            distance: distanceMultiplier,
            rarity: rarityMultiplier,
            seasonal: seasonalMultiplier
        }
    };
}

// Функция за превод чрез Google Translate API
async function translateText(text, targetLang = 'bg') {
    if (!text || text.trim() === '') return 'Няма налично описание за тази дестинация.';
    
    try {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
        
        if (!response.ok) {
            throw new Error('Грешка при превода');
        }
        
        const data = await response.json();
        
        let translatedText = '';
        if (data && data[0]) {
            for (let i = 0; i < data[0].length; i++) {
                if (data[0][i][0]) {
                    translatedText += data[0][i][0];
                }
            }
        }
        
        return translatedText || text;
        
    } catch (error) {
        console.error('Грешка при превод:', error);
        return text;
    }
}

// Обновяване на визуализацията на цената
function updatePriceDisplay(priceData) {
    const priceTag = document.getElementById('priceTag');
    const priceDisplay = document.getElementById('priceDisplay');
    const priceDescription = document.getElementById('priceDescription');
    const priceDetails = document.getElementById('priceDetails');
    
    // Премахваме всички класове
    priceTag.className = 'price-tag';
    
    // Добавяме съответния клас
    if (priceData.priceType !== 'standard') {
        priceTag.classList.add(priceData.priceType);
    }
    
    // Обновяваме цената
    priceDisplay.textContent = `€${priceData.totalPrice}`;
    
    // Описание според типа
    const descriptions = {
        'economy': '💰 Икономична дестинация',
        'standard': '🚀 Стандартна цена',
        'premium': '⭐ Премиум дестинация',
        'expensive': '💎 Луксозна дестинация'
    };
    priceDescription.textContent = descriptions[priceData.priceType] || 'с газова уредба';
    
    // Детайли за множителите
    const multiDetails = [];
    if (priceData.multipliers.complexity > 1.5) multiDetails.push('сложен терен');
    if (priceData.multipliers.distance > 2) multiDetails.push('голямо разстояние');
    if (priceData.multipliers.rarity > 2) multiDetails.push('рядка дестинация');
    if (priceData.multipliers.seasonal > 1.2) multiDetails.push('висок сезон');
    
    priceDetails.textContent = multiDetails.length > 0 ? multiDetails.join(' • ') : '';
}

// Обновяване на ценовата разбивка в модала
function updatePriceBreakdown(priceData) {
    document.getElementById('fuelCost').textContent = `€${priceData.breakdown.fuel}`;
    document.getElementById('spaceTax').textContent = `€${priceData.breakdown.tax}`;
    document.getElementById('golfDepreciation').textContent = `€${priceData.breakdown.depreciation}`;
    document.getElementById('coffeeCost').textContent = `€${priceData.breakdown.coffee}`;
    document.getElementById('mixtapeCost').textContent = `€${priceData.breakdown.mixtape}`;
    document.getElementById('totalPrice').textContent = `€${priceData.totalPrice}`;
}

// Генериране на звезди
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        starsContainer.appendChild(star);
    }
}

// Зареждане при стартиране
window.onload = function() {
    createStars();
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('datePicker').max = today;
    
    setRandomPastDate();
};

// Функция за задаване на случайна дата от миналото
function setRandomPastDate() {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    const randomDate = new Date(
        thirtyDaysAgo.getTime() + Math.random() * (today.getTime() - thirtyDaysAgo.getTime())
    );
    
    const formattedDate = randomDate.toISOString().split('T')[0];
    document.getElementById('datePicker').value = formattedDate;
    fetchNASAData();
}

// Основна функция за извличане на данни от NASA
async function fetchNASAData() {
    const datePicker = document.getElementById('datePicker');
    const selectedDate = datePicker.value;
    const errorMessage = document.getElementById('errorMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    errorMessage.classList.remove('show');
    
    if (!selectedDate) {
        errorMessage.textContent = '💥 Моля, изберете дата за вашето космическо пътешествие!';
        errorMessage.classList.add('show');
        return;
    }
    
    const selectedDateTime = new Date(selectedDate);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    if (selectedDateTime > today) {
        errorMessage.textContent = '💥 Газовата уредба на машината на времето гръмна. Моля, изберете минала дата!';
        errorMessage.classList.add('show');
        return;
    }
    
    const apodStart = new Date('1995-06-16');
    if (selectedDateTime < apodStart) {
        errorMessage.textContent = '💥 Голфът не може да пътува толкова назад във времето! Изберете дата след 16 юни 1995.';
        errorMessage.classList.add('show');
        return;
    }
    
    try {
        loadingSpinner.classList.add('show');
        
        const imageElement = document.getElementById('nasaImage');
        const titleElement = document.getElementById('imageTitle');
        const dateElement = document.getElementById('imageDate');
        
        imageElement.style.opacity = '0.5';
        titleElement.textContent = '🚀 Калкулиране на космическата цена...';
        dateElement.textContent = 'Моля, изчакайте';
        
        const response = await fetch(`${NASA_APOD_URL}?api_key=${NASA_API_KEY}&date=${selectedDate}`);
        
        if (!response.ok) {
            throw new Error('API грешка: ' + response.status);
        }
        
        const data = await response.json();
        
        // Изчисляване на динамична цена
        const priceData = calculateDynamicPrice(data.title, data.explanation, data.date);
        
        // Превод на заглавието и описанието
        const translatedTitle = await translateText(data.title);
        const translatedExplanation = await translateText(data.explanation);
        
        if (data.media_type === 'image') {
            imageElement.src = data.url;
            imageElement.alt = translatedTitle;
            imageElement.style.opacity = '1';
            
            titleElement.textContent = translatedTitle;
            dateElement.textContent = `📅 Дата на дестинацията: ${data.date}`;
            
            document.getElementById('modalTitle').textContent = translatedTitle;
            document.getElementById('modalDescription').textContent = translatedExplanation;
            document.getElementById('translationNote').style.display = 'block';
            
            // Обновяване на цената
            updatePriceDisplay(priceData);
            updatePriceBreakdown(priceData);
            
        } else if (data.media_type === 'video') {
            const youtubeID = getYouTubeID(data.url);
            if (youtubeID) {
                imageElement.src = 'https://img.youtube.com/vi/' + youtubeID + '/maxresdefault.jpg';
            } else {
                imageElement.src = 'https://apod.nasa.gov/apod/image/2412/PIA25729.jpg';
            }
            imageElement.style.opacity = '1';
            
            titleElement.textContent = '🎥 ' + translatedTitle + ' (Видео дестинация)';
            dateElement.textContent = `📅 Дата на дестинацията: ${data.date}`;
            
            document.getElementById('modalTitle').textContent = translatedTitle;
            document.getElementById('modalDescription').textContent = 
                '🎥 Това е видео дестинация! Можете да го гледате на: ' + data.url + '\n\n' + 
                translatedExplanation;
            document.getElementById('translationNote').style.display = 'block';
            
            updatePriceDisplay(priceData);
            updatePriceBreakdown(priceData);
        }
        
        loadingSpinner.classList.remove('show');
        
    } catch (error) {
        console.error('Грешка при зареждане на NASA данни:', error);
        errorMessage.textContent = '💥 Грешка в комуникацията с NASA! Опитайте отново.';
        errorMessage.classList.add('show');
        
        document.getElementById('nasaImage').style.opacity = '1';
        document.getElementById('imageTitle').textContent = 'Грешка при зареждане';
        document.getElementById('imageDate').textContent = 'Моля, опитайте отново';
        
        loadingSpinner.classList.remove('show');
    }
}

function getYouTubeID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}