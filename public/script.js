import CONFIG from './dates.js';

const { LocalNotifications, SplashScreen, StatusBar, NavigationBar } = Capacitor.Plugins;

const endDate = new Date(CONFIG.CALVAR_END_DATE);
const startDate = new Date(CONFIG.CALVAR_START_DATE);

const calculateTime = (end, start) => {
    const difference = Math.floor((end.getTime() - start.getTime()) / 1000);
    return {
        seconds: difference % 60,
        minutes: Math.floor(difference / 60) % 60,
        hours: Math.floor(difference / 3600) % 24,
        days: Math.floor(difference / 86400) % 7,
        weeks: Math.floor(difference / 604800)
    };
}

const generatePercentage = (end, start) => {
    const now = new Date();
    const numerator = now.getTime() - start.getTime();
    const denominator = end.getTime() - start.getTime();
    return ((numerator / denominator) * 100).toFixed(2) + '%';
}

const timer = document.querySelector('.timer span');
const [elapsed, percent] = document.querySelectorAll('.elapsed, .percent');
const intFun = () => {
    const { seconds, minutes, hours, days, weeks } = calculateTime(endDate, new Date());
    timer.innerText = `${weeks ? weeks + ' saptamani' : ''} ${days || weeks ? days + ' zile' : ''} ${hours || days || weeks ? hours + ' ore' : ''} ${minutes || hours || days || weeks ? minutes + ' minute' : ''} ${seconds || minutes || hours || days || weeks ? seconds + ' secunde' : 'LIBERTATE 🎉'}`
    elapsed.style.width = percent.innerText = generatePercentage(endDate, startDate);
}
intFun();
setInterval(intFun, 1000);

NavigationBar.setColor({color: '#1B1B1B'});
StatusBar.setBackgroundColor({color: '#1B1B1B'});
SplashScreen.hide();