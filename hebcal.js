async function updateYesNo() {
    let holidaysToday = await getHolidaysToday();
    let yesnoElement = document.getElementById('yes-no');
    if (holidaysToday?.length > 0) {
        yesnoElement.innerHTML = "YES";
        let firstHoliday = holidaysToday[0];
        let holidayElement = document.getElementById('holiday');
        if (!!firstHoliday.title && !!firstHoliday.link) {
            holidayElement.innerHTML = `It's <a href=${firstHoliday.link}>${firstHoliday.title}</a>`;
        } else if (!!firstHoliday.title) {
            holidayElement.innerHTML = `It's ${firstHoliday.title}`;
        }
    } else {
        yesnoElement.innerHTML = "NO";
    }
}

async function getHolidaysToday() {
    let now = new Date();
    let today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    let monthNum = today.getUTCMonth() + 1;
    let data = await hebcalRequest(monthNum);
    let holidaysToday = data?.items?.filter(item => new Date(item.date + 'T00:00:00Z').getTime() == today.getTime());
    return holidaysToday;
}

async function hebcalRequest(monthNum) {
    let response = await fetch(`https://www.hebcal.com/hebcal?v=1&year=now&month=${monthNum}&cfg=json&maj=on&min=off&mod=off&nx=off&ss=off&mf=off`);
    return await response.json();
}