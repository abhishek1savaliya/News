const moment = require('moment')

exports.keepServerAlive = () => {
    console.log('Keeping the server alive...');

    const serverStartDate = moment();

    const fetchActivationPatch = async () => {
        try {
            const response = await fetch('https://news-pm9f.onrender.com/api/server/alive');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            logServerUptime();

        } catch (error) {
            console.error('Error fetching activation patch:', error);
        }
    };

    const logServerUptime = () => {
        const now = moment();
        const duration = moment.duration(now.diff(serverStartDate));

        const years = duration.years();
        const months = duration.months();
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        console.log(`Server has been running for ${years} year(s), ${months} month(s), ${days} day(s), ${hours} hour(s), ${minutes} minute(s), and ${seconds} second(s)`);
    };

    setInterval(() => {
        fetchActivationPatch();
    }, 780000);
}