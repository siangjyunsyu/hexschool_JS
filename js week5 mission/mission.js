console.clear();

let data = [
    {
        id: 0,
        name: '肥宅心碎賞櫻3日',
        imgUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
        area: '高雄',
        description: '賞櫻花最佳去處。肥宅不得不去的超讚景點！',
        group: 87,
        price: 1400,
        rate: 10,
    },
    {
        id: 1,
        name: '貓空纜車雙程票',
        imgUrl: 'https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        area: '台北',
        description: '乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感',
        group: 99,
        price: 240,
        rate: 2,
    },
    {
        id: 2,
        name: '台中谷關溫泉會1日',
        imgUrl: 'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        area: '台中',
        description: '全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。',
        group: 20,
        price: 1765,
        rate: 7,
    },
];

// console.log(data);

// HTML 套票卡片區 （LV1)
const ticketCardArea = document.querySelector('.ticketCard-area');
// console.log(ticketCardArea.innerHTML); // 確認是否有成功取得資料

const searchResultText = document.querySelector('#searchResult-text');
// console.log(searchResultText.textContent); // 確認是否有成功取得資料

// 畫面渲染
// renderData() 這個 JavaScript 函數，它的功能是根據data陣列中的資料，生成一個HTML列表，並將生成的內容更新到ticketCardArea元素中。
function renderData(data) {
    let newData = ''; // 建立一個空字串來裝資料

    // 遍歷陣列
    data.forEach(function (item) {
        // console.log(item); // 把陣列資料取出來確認是否成功取得
        newData += `<li class="ticketCard">
                        <div class="ticketCard-img">
                            <a href="#">
                                <img src="${item.imgUrl}" alt="" />
                            </a>
                            <div class="ticketCard-region">${item.area}</div>
                            <div class="ticketCard-rank">${item.rate}</div>
                        </div>
                        <div class="ticketCard-content">
                            <div>
                                <h3>
                                    <a href="#" class="ticketCard-name">${item.name}</a>
                                </h3>
                                <p class="ticketCard-description">${item.description}</p>
                            </div>
                            <div class="ticketCard-info">
                                <p class="ticketCard-num">
                                    <span><i class="fas fa-exclamation-circle"></i></span>
                                    剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                                </p>
                                <p class="ticketCard-price">TWD <span id="ticketCard-price">$${item.price}</span></p>
                            </div>
                        </div>
                    </li>`;
    });
    // console.log(newData); // 確認是否有成功取得資料
    ticketCardArea.innerHTML = newData;
    searchResultText.textContent = `本次搜尋共 ${data.length} 筆資料`;
}
renderData(data);

// 篩選功能（LV3）
const regionSearch = document.querySelector('.regionSearch');
// console.log(regionSearch.value); // 取得目前選擇的資料
// console.log(regionSearch.textContent); // 取得所有地區的資料

const cantFindArea = document.querySelector('.cantFind-area');
// console.log(cantFindArea.textContent);

function filterData() {
    let filterResult = [];
    data.forEach(function (item) {
        if (item.area === regionSearch.value) {
            filterResult.push(item);
        }
        if (!regionSearch.value) {
            filterResult.push(item);
        }
    });

    if (filterResult.length > 0) {
        cantFindArea.style.display = 'none';
    } else {
        cantFindArea.style.display = 'block';
    }

    renderData(filterResult);
    // console.log(filterResult); // 確認是否有成功取得資料
}
// 事件監聽
regionSearch.addEventListener('change', function () {
    filterData();
});

// 新增套票（LV3）
const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketRegion = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector('#ticketDescription');

const addTicketBtn = document.querySelector('.addTicket-btn');
const addTicketForm = document.querySelector('.addTicket-form');

function addTicket() {
    let obj = {
        id: data.length,
        name: ticketName.value.trim(),
        imgUrl: ticketImgUrl.value.trim(),
        area: ticketRegion.value.trim(),
        description: ticketDescription.value.trim(),
        group: Number(ticketNum.value.trim()),
        price: Number(ticketPrice.value.trim()),
        rate: Number(ticketRate.value.trim()),
    };

    let errorMsg = '';

    if (!obj.name) {
        errorMsg = '套票名稱為必填!';
    } else if (!obj.imgUrl) {
        errorMsg = '圖片網址為必填!';
    } else if (!obj.area) {
        errorMsg = '請選擇地區!';
    } else if (obj.price <= 0) {
        errorMsg = '套票金額必須大於 0!';
    } else if (obj.group < 1) {
        errorMsg = '套票組數必須至少為 1!';
    } else if (obj.rate < 1 || obj.rate > 10) {
        errorMsg = '套票星級必須在 1 至 10 之間!';
    } else if (obj.description.length > 100) {
        errorMsg = '套票描述必填，且不能超過 100 字!';
    }

    if (errorMsg) {
        alert(errorMsg);
        return;
    }

    data.push(obj);
    regionSearch.value = '';
    addTicketForm.reset();
    renderData(data);
    console.log(obj); // 確認是否有成功取得資料
}

addTicketBtn.addEventListener('click', function () {
    addTicket();
});
